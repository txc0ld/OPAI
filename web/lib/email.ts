export type EnquiryPayload = {
  source: "ai-visibility-check" | "contact";
  name: string;
  company?: string;
  email?: string;
  phone?: string;
  suburb?: string;
  trade?: string;
  interest?: string;
  message?: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function sendEnquiryEmail(payload: EnquiryPayload): Promise<{ delivered: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "OperateAI <team@operateai.com.au>";
  const to = process.env.RESEND_TO_EMAIL || "team@operateai.com.au";

  if (!apiKey) {
    console.log("[enquiry-stub]", JSON.stringify(payload));
    return { delivered: false };
  }

  const rows = [
    ["Source", payload.source === "ai-visibility-check" ? "AI Visibility Check" : "Contact form"],
    ["Business", payload.company || payload.name],
    ["Contact name", payload.name],
    ["Suburb / area", payload.suburb || "Not supplied"],
    ["Business type", payload.trade || "Not supplied"],
    ["Email", payload.email || "Not supplied"],
    ["Phone", payload.phone || "Not supplied"],
  ];

  const text = [
    payload.source === "ai-visibility-check" ? "New AI Visibility Check request" : "New OperateAI enquiry",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Notes:",
    payload.message || "(none)",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
      <h1 style="font-size:20px">${payload.source === "ai-visibility-check" ? "New AI Visibility Check request" : "New OperateAI enquiry"}</h1>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><th align="left" style="border-bottom:1px solid #ddd">${escapeHtml(label)}</th><td style="border-bottom:1px solid #ddd">${escapeHtml(value ?? "")}</td></tr>`,
          )
          .join("")}
      </table>
      <h2 style="font-size:16px;margin-top:24px">Notes</h2>
      <p style="white-space:pre-wrap">${escapeHtml(payload.message || "(none)")}</p>
    </div>
  `;

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      ...(payload.email ? { reply_to: payload.email } : {}),
      subject:
        payload.source === "ai-visibility-check"
          ? `AI Visibility Check: ${payload.company || payload.name} (${payload.suburb || "?"})`
          : `OperateAI contact: ${payload.name}`,
      text,
      html,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend failed with ${response.status}: ${errorText}`);
  }

  return { delivered: true };
}

// ---------------------------------------------------------------------------
// Draft report email (operator-only — never sent to the client)
// The html param IS the fully rendered report. Operator sees exactly what the
// client will get, with a short preamble note at top.
// ---------------------------------------------------------------------------

export async function sendCheckDraftEmail({
  business,
  suburb,
  html,
  text,
}: {
  business: string;
  suburb: string;
  html: string;
  text: string;
}): Promise<{ delivered: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL || "OperateAI <team@operateai.com.au>";
  const to = process.env.RESEND_TO_EMAIL || "team@operateai.com.au";

  if (!apiKey) {
    console.log("[check-draft-stub]", { business, suburb });
    return { delivered: false };
  }

  const subject = `AI Check draft: ${business} (${suburb})`;

  // Prepend an operator note above the report HTML.
  const operatorNote = `<div style="font-family:Arial,sans-serif;background:#fffbe6;border:1px solid #f0c040;border-radius:6px;padding:12px 16px;margin-bottom:20px;font-size:13px;color:#7a5c00;max-width:620px;margin-left:auto;margin-right:auto;">
    <strong>Draft AI Check</strong> — review, then forward to the client. Do not send until you have reviewed all findings for accuracy.
  </div>`;

  const fullHtml = operatorNote + html;

  // Plain-text operator preamble.
  const fullText = [
    "DRAFT AI CHECK — review before forwarding to the client.",
    "---",
    "",
    text,
  ].join("\n");

  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, text: fullText, html: fullHtml }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend (draft) failed with ${response.status}: ${errorText}`);
  }

  return { delivered: true };
}
