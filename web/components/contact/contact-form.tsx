"use client";

import { useId, useState } from "react";

type SubmitState = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const formId = useId();
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setState("sending");
    setMessage("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "contact" }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "That could not be sent.");
      form.reset();
      setState("sent");
      setMessage("Thanks. I'll get back to you.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "That could not be sent.");
    }
  }

  const inputClass =
    "mt-2 w-full rounded border border-[var(--color-border)] bg-[var(--color-surface-lowest)] px-4 py-3 text-[16px] text-[var(--color-fg)] outline-none transition-colors placeholder:text-[var(--color-fg-variant)]/60 focus:border-[var(--color-signal)]";
  const labelClass = "block font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-[var(--color-fg-variant)]";

  return (
    <form onSubmit={onSubmit} className="grid gap-5 text-left">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass} htmlFor={`${formId}-name`}>
          Name
          <input id={`${formId}-name`} name="name" required autoComplete="name" className={inputClass} />
        </label>
        <label className={labelClass} htmlFor={`${formId}-phone`}>
          Mobile
          <input id={`${formId}-phone`} name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </label>
      </div>
      <label className={labelClass} htmlFor={`${formId}-email`}>
        Email
        <input id={`${formId}-email`} name="email" type="email" autoComplete="email" className={inputClass} />
      </label>
      <label className={labelClass} htmlFor={`${formId}-message`}>
        What do you need?
        <textarea id={`${formId}-message`} name="message" rows={5} className={inputClass} />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center gap-2 rounded bg-[var(--color-signal)] px-6 py-3.5 text-[15px] font-bold text-[var(--color-on-signal)] transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
        >
          {state === "sending" ? "Sending…" : "Send →"}
        </button>
        <p
          role={state === "error" ? "alert" : "status"}
          className={state === "error" ? "text-[13px] text-[var(--color-error)]" : "text-[13px] text-[var(--color-fg-variant)]"}
        >
          {message || "I'll reply by email or text."}
        </p>
      </div>
    </form>
  );
}
