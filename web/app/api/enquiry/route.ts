import { NextResponse } from "next/server";
import { sendEnquiryEmail, addContactToAudience, type EnquiryPayload } from "@/lib/email";
import { captureLead } from "@/lib/leads";

export const runtime = "nodejs";

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot: bots fill the hidden "website" field.
    if (clean(body.website)) {
      return NextResponse.json({ ok: true });
    }

    const source = clean(body.source) === "contact" ? "contact" : "ai-visibility-check";

    const payload: EnquiryPayload = {
      source,
      name: clean(body.name),
      company: clean(body.company),
      email: clean(body.email),
      phone: clean(body.phone),
      suburb: clean(body.suburb),
      trade: clean(body.trade),
      url: clean(body.url),
      message: clean(body.message),
    };

    if (source === "ai-visibility-check") {
      if (!payload.company || !payload.suburb || !payload.trade) {
        return NextResponse.json({ error: "Business name, suburb and business type are required." }, { status: 400 });
      }
      if (!payload.email && !payload.phone) {
        return NextResponse.json({ error: "Add an email or a mobile so we can send your rundown." }, { status: 400 });
      }
    } else {
      if (!payload.name || (!payload.email && !payload.phone)) {
        return NextResponse.json({ error: "Add your name and an email or mobile." }, { status: 400 });
      }
    }

    if (payload.email && !isEmail(payload.email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }
    if ((payload.message || "").length > 4000) {
      return NextResponse.json({ error: "Message must be 4000 characters or fewer." }, { status: 400 });
    }

    // Store the lead durably (never throws) before emailing the operator.
    await captureLead({
      source: payload.source,
      name: payload.name,
      company: payload.company,
      email: payload.email,
      phone: payload.phone,
      suburb: payload.suburb,
      businessType: payload.trade,
      website: payload.url,
      message: payload.message,
    });

    // Add to the marketing audience (never throws; no-ops until configured).
    await addContactToAudience({ email: payload.email, name: payload.name || payload.company });

    const result = await sendEnquiryEmail(payload);
    return NextResponse.json({ ok: true, delivered: result.delivered });
  } catch (error) {
    console.error("[enquiry]", error);
    return NextResponse.json({ error: "That could not be sent right now." }, { status: 500 });
  }
}
