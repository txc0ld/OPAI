import { NextResponse } from "next/server";
import { sendEnquiryEmail, type EnquiryPayload } from "@/lib/email";

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

    if (clean(body.website)) {
      return NextResponse.json({ ok: true });
    }

    const payload: EnquiryPayload = {
      name: clean(body.name),
      company: clean(body.company),
      email: clean(body.email),
      phone: clean(body.phone),
      interest: clean(body.interest),
      message: clean(body.message),
    };

    if (!payload.name || !payload.email || !payload.message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    if (!isEmail(payload.email)) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    if (payload.message.length > 4000) {
      return NextResponse.json({ error: "Message must be 4000 characters or fewer." }, { status: 400 });
    }

    const result = await sendEnquiryEmail(payload);
    return NextResponse.json({ ok: true, delivered: result.delivered });
  } catch (error) {
    console.error("[enquiry]", error);
    return NextResponse.json({ error: "Enquiry could not be sent right now." }, { status: 500 });
  }
}
