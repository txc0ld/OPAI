export type EnquiryPayload = {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  interest?: string;
  message: string;
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
  const from = process.env.RESEND_FROM_EMAIL || "OperateAI <hello@operateai.com.au>";
  const to = process.env.RESEND_TO_EMAIL || "hello@operateai.com.au";

  if (!apiKey) {
    console.log("[enquiry-stub]", JSON.stringify(payload));
    return { delivered: false };
  }

  const rows = [
    ["Name", payload.name],
    ["Company", payload.company || "Not supplied"],
    ["Email", payload.email],
    ["Phone", payload.phone || "Not supplied"],
    ["Interest", payload.interest || "Not supplied"],
  ];
  const text = [
    "New OperateAI enquiry",
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#111">
      <h1 style="font-size:20px">New OperateAI enquiry</h1>
      <table cellpadding="6" cellspacing="0" style="border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><th align="left" style="border-bottom:1px solid #ddd">${escapeHtml(label)}</th><td style="border-bottom:1px solid #ddd">${escapeHtml(value)}</td></tr>`,
          )
          .join("")}
      </table>
      <h2 style="font-size:16px;margin-top:24px">Message</h2>
      <p style="white-space:pre-wrap">${escapeHtml(payload.message)}</p>
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
      reply_to: payload.email,
      subject: `OperateAI enquiry: ${payload.interest || "AI Business Audit"}`,
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
