"use client";

import { useId, useState } from "react";

type ContactFormProps = {
  defaultInterest?: string;
};

type SubmitState = "idle" | "sending" | "sent" | "error";

const INTEREST_OPTIONS = [
  "AI Business Audit",
  "AI integration",
  "Custom AI agents",
  "AI agent hosting",
  "AI training",
  "Not sure yet",
] as const;

export function ContactForm({ defaultInterest = "AI Business Audit" }: ContactFormProps) {
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
        body: JSON.stringify(data),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error || "Enquiry could not be sent.");
      }
      form.reset();
      setState("sent");
      setMessage("Thanks. Your enquiry has been sent.");
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Enquiry could not be sent.");
    }
  }

  const inputClass =
    "mt-2 w-full rounded-[7px] border border-[var(--color-w10)] bg-white/[0.04] px-4 py-3 text-[15px] text-[var(--color-fg)] outline-none transition-colors placeholder:text-[var(--color-w30)] focus:border-[var(--color-accent)]";
  const labelClass = "block text-[13px] font-semibold text-[var(--color-w70)]";

  return (
    <form onSubmit={onSubmit} className="reveal grid gap-5 text-left">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass} htmlFor={`${formId}-name`}>
          Name
          <input id={`${formId}-name`} name="name" required autoComplete="name" className={inputClass} />
        </label>
        <label className={labelClass} htmlFor={`${formId}-email`}>
          Email
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className={labelClass} htmlFor={`${formId}-company`}>
          Company
          <input id={`${formId}-company`} name="company" autoComplete="organization" className={inputClass} />
        </label>
        <label className={labelClass} htmlFor={`${formId}-phone`}>
          Phone
          <input id={`${formId}-phone`} name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </label>
      </div>

      <label className={labelClass} htmlFor={`${formId}-interest`}>
        What do you need help with?
        <select id={`${formId}-interest`} name="interest" defaultValue={defaultInterest} className={inputClass}>
          {INTEREST_OPTIONS.map((option) => (
            <option key={option} value={option} className="bg-black text-white">
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className={labelClass} htmlFor={`${formId}-message`}>
        Message
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={6}
          placeholder="Tell us what is slow, manual, confusing or worth exploring."
          className={inputClass}
        />
      </label>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={state === "sending"}
          className="inline-flex items-center gap-2 rounded-[7px] bg-[var(--color-fg)] px-6 py-3.5 text-[15px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {state === "sending" ? "Sending..." : "Send enquiry →"}
        </button>
        <p
          role={state === "error" ? "alert" : "status"}
          className={state === "error" ? "text-[13px] leading-[1.5] text-red-300" : "text-[13px] leading-[1.5] text-[var(--color-w50)]"}
        >
          {message || "We will reply by email."}
        </p>
      </div>
    </form>
  );
}
