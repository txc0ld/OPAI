/**
 * web/app/api/check/route.ts
 *
 * Optional server-side auto-draft of the AI check report.
 * Gated by AUTO_CHECK=1 — off by default, no API cost when unset.
 * Never throws to the client; a failure here is safe (the lead email
 * from /api/enquiry already went out).
 */

import { NextResponse } from "next/server";
import { validateCheckInput } from "@/lib/check/types";
import { runCheck } from "@/lib/check/run";
import { sendCheckDraftEmail } from "@/lib/email";

export const runtime = "nodejs";
export const maxDuration = 60;

// ---------------------------------------------------------------------------
// Simple best-effort in-memory per-IP rate limit (max 3 requests / 60s).
// Resets on cold start — good enough for abuse deterrence on a low-volume form.
// ---------------------------------------------------------------------------

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function getIp(request: Request): string {
  // Vercel forwards the real IP in x-forwarded-for.
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    // Honeypot: bots fill the hidden "website" field.
    if (clean(body.website)) {
      return NextResponse.json({ ok: true });
    }

    // Rate limit by IP.
    const ip = getIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: true });
    }

    // Validate required fields.
    const validation = validateCheckInput({
      business: body.company ?? body.business,
      suburb: body.suburb,
      trade: body.trade,
      url: body.url,
      phone: body.phone,
    });

    if (validation.error !== null) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const input = validation.input;

    // Gate: only run the pipeline if AUTO_CHECK=1.
    if (process.env.AUTO_CHECK !== "1") {
      return NextResponse.json({ ok: true, autodraft: false });
    }

    // Run pipeline fire-and-forget style — wrap so any failure returns ok.
    try {
      const { markdown, triage } = await runCheck(input);
      console.log("[check] triage headline:", triage.headline);
      await sendCheckDraftEmail({
        business: input.business,
        suburb: input.suburb,
        markdown,
      });
      console.log("[check] draft emailed for:", input.business);
    } catch (e) {
      console.error("[check] pipeline error:", e);
    }

    return NextResponse.json({ ok: true, autodraft: true });
  } catch (e) {
    console.error("[check] unexpected error:", e);
    return NextResponse.json({ ok: true });
  }
}
