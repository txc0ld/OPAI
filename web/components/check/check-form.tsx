"use client";

import { useId, useState } from "react";

type SubmitState = "idle" | "sending" | "sent" | "error";

const TRADES = [
  "Plumber",
  "Electrician / sparky",
  "Builder",
  "Carpenter / chippy",
  "Landscaper",
  "Painter",
  "Tiler",
  "Roofer",
  "Concreter",
  "HVAC / air-con",
  "Other",
] as const;

export function CheckForm() {
  const formId = useId();
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const [business, setBusiness] = useState("");
  const [suburb, setSuburb] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    setState("sending");
    setError("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "ai-visibility-check" }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "That could not be sent.");
      setBusiness(String(data.company || ""));
      setSuburb(String(data.suburb || ""));
      form.reset();
      setState("sent");
      // Fire-and-forget: trigger the optional server-side auto-draft pipeline.
      // Never awaited — must not block the confirmation shown above.
      fetch("/api/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "ai-visibility-check" }),
      }).catch(() => {});
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "That could not be sent.");
    }
  }

  const inputClass =
    "mt-2 w-full rounded border border-[var(--color-border)] bg-[var(--color-surface-lowest)] px-4 py-3 text-[15px] text-[var(--color-fg)] outline-none transition-colors placeholder:text-[var(--color-fg-variant)]/60 focus:border-[var(--color-signal)]";
  const labelClass = "block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--color-fg-variant)]";

  if (state === "sent") {
    return (
      <div
        role="status"
        className="rounded-lg border border-[var(--color-signal)] bg-[var(--color-surface-lowest)] p-6 font-mono text-[14px] leading-[1.7] text-[var(--color-fg)]"
      >
        <div className="mb-2 flex items-center gap-2 text-[var(--color-signal)]">
          <span className="inline-block h-3 w-[7px] animate-pulse bg-[var(--color-signal)]" aria-hidden />
          REQUEST RECEIVED
        </div>
        Got it. I&rsquo;ll personally check what AI says about{" "}
        <span className="text-[var(--color-signal)]">{business || "your business"}</span>
        {suburb ? <> in <span className="text-[var(--color-signal)]">{suburb}</span></> : null} and send your rundown
        within one business day. Cheers, Taylor
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 text-left">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <label className={labelClass} htmlFor={`${formId}-company`}>
        Business name
        <input id={`${formId}-company`} name="company" required autoComplete="organization" className={inputClass} />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass} htmlFor={`${formId}-suburb`}>
          Suburb / service area
          <input id={`${formId}-suburb`} name="suburb" required className={inputClass} placeholder="e.g. Midland" />
        </label>
        <label className={labelClass} htmlFor={`${formId}-trade`}>
          Trade
          <select id={`${formId}-trade`} name="trade" required defaultValue="" className={inputClass}>
            <option value="" disabled className="bg-[var(--color-surface)]">
              Pick one
            </option>
            {TRADES.map((t) => (
              <option key={t} value={t} className="bg-[var(--color-surface)] text-[var(--color-fg)]">
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass} htmlFor={`${formId}-email`}>
          Email
          <input id={`${formId}-email`} name="email" type="email" autoComplete="email" className={inputClass} />
        </label>
        <label className={labelClass} htmlFor={`${formId}-phone`}>
          Mobile
          <input id={`${formId}-phone`} name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </label>
      </div>

      <label className={labelClass} htmlFor={`${formId}-message`}>
        Anything you want me to look at? (optional)
        <textarea id={`${formId}-message`} name="message" rows={3} className={inputClass} />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center gap-2 rounded bg-[var(--color-signal)] px-6 py-3.5 text-[15px] font-bold text-[var(--color-on-signal)] transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
        >
          {state === "sending" ? "Sending…" : "Send my free check →"}
        </button>
        <p
          role={state === "error" ? "alert" : "status"}
          className={state === "error" ? "text-[13px] text-[var(--color-error)]" : "text-[13px] text-[var(--color-fg-variant)]"}
        >
          {state === "error" ? error : "Your details are only used to send your rundown. No spam."}
        </p>
      </div>
    </form>
  );
}
