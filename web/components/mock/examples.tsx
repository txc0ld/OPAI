import { Star, Phone, MapPin, Globe, Bookmark, Check, MessageSquare } from "lucide-react";

/*
 * Illustrative "this is your business" mockups for articles + marketing pages.
 * Built ONLY from div/span/svg so they can live inside the Prose wrapper without
 * inheriting prose paragraph/list/link styling.
 */

function Stars({ n = 5, className = "" }: { n?: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`} aria-hidden>
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} className="h-[14px] w-[14px] fill-[#f5b301] text-[#f5b301]" />
      ))}
    </span>
  );
}

/* ---- Google Business Profile card ---------------------------------------- */
export function GbpCard() {
  const actions = [
    { icon: Phone, label: "Call" },
    { icon: MapPin, label: "Directions" },
    { icon: Globe, label: "Website" },
    { icon: Bookmark, label: "Save" },
  ];
  return (
    <figure className="my-10 overflow-hidden rounded-2xl border border-[var(--color-line-ink)] bg-white shadow-[0_24px_50px_-30px_rgba(18,18,18,0.5)]">
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[19px] font-bold text-[var(--color-ink)]">Coastal Plumbing &amp; Gas</span>
              <span className="grid h-4 w-4 place-items-center rounded-full bg-[#1a73e8]" aria-hidden>
                <Check className="h-3 w-3 text-white" />
              </span>
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-2 text-[13px] text-[var(--color-ink-soft)]">
              <span className="font-semibold text-[var(--color-ink)]">4.9</span>
              <Stars />
              <span>(127)</span>
              <span aria-hidden>·</span>
              <span>Plumber</span>
            </div>
            <div className="mt-1.5 text-[13px]">
              <span className="font-semibold text-[#1c8439]">Open 24 hours</span>
              <span className="text-[var(--color-ink-soft)]"> · Subiaco, WA</span>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {actions.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#1a73e8]/30 px-3.5 py-1.5 text-[12px] font-semibold text-[#1a73e8]"
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </span>
          ))}
        </div>

        <div className="mt-5 border-t border-[var(--color-line-ink)] pt-4">
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-ink-soft)]">
            Services
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {["Burst pipe repair", "Blocked drains", "Hot water", "Gas fitting", "Leak detection"].map((s) => (
              <span
                key={s}
                className="rounded-md bg-[color-mix(in_oklab,var(--color-ink)_5%,white)] px-2.5 py-1 text-[12px] text-[var(--color-ink)]"
              >
                {s}
              </span>
            ))}
          </div>
          <div className="mt-3 text-[12px] text-[var(--color-ink-soft)]">
            Service area: Subiaco, Mt Lawley, Leederville, Nedlands &amp; 12 more
          </div>
        </div>
      </div>
      <figcaption className="border-t border-[var(--color-line-ink)] bg-[color-mix(in_oklab,var(--color-signal)_14%,white)] px-6 py-3 text-[13px] font-medium text-[var(--color-ink)]">
        Every line here is something AI can read and trust. Most profiles are half-empty.
      </figcaption>
    </figure>
  );
}

/* ---- Phone showing the AI answer ----------------------------------------- */
export function PhoneAnswer() {
  const results = [
    { name: "Coastal Plumbing & Gas", note: "4.9★ · open now · ~20 min", you: true },
    { name: "RapidFlow Plumbers", note: "4.7★ · open now", you: false },
  ];
  return (
    <figure className="my-12 flex flex-col items-center">
      <div className="w-full max-w-[330px] rounded-[2.4rem] border border-[var(--color-line-ink)] bg-[#0c0c0c] p-2.5 shadow-[0_40px_80px_-32px_rgba(18,18,18,0.6)]">
        <div className="overflow-hidden rounded-[1.9rem] bg-[#111111] p-5">
          <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-white/15" aria-hidden />
          <div className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-[var(--color-signal)] px-3.5 py-2 text-[13px] font-medium text-[var(--color-on-signal)]">
            Who&rsquo;s a good emergency plumber in Perth right now?
          </div>
          <div className="mt-4 text-[13px] leading-[1.55] text-[var(--color-fg-variant)]">
            A couple are open and nearby:
          </div>
          <div className="mt-3 grid gap-2">
            {results.map((r) => (
              <div
                key={r.name}
                className="rounded-xl border px-3.5 py-3"
                style={{
                  borderColor: r.you ? "var(--color-signal)" : "var(--color-border)",
                  background: r.you ? "color-mix(in oklab, var(--color-signal) 10%, transparent)" : "transparent",
                }}
              >
                <div className="flex items-center gap-2 text-[14px] font-bold text-[var(--color-fg)]">
                  {r.name}
                  {r.you ? (
                    <span className="rounded bg-[var(--color-signal)] px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-[var(--color-on-signal)]">
                      You
                    </span>
                  ) : null}
                </div>
                <div className="mt-0.5 text-[12px] text-[var(--color-fg-variant)]">{r.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption className="mt-4 max-w-[42ch] text-center text-[14px] text-[var(--color-ink-soft)]">
        This is the whole shortlist a customer sees. You&rsquo;re on it, or you&rsquo;re invisible.
      </figcaption>
    </figure>
  );
}

/* ---- Reviews strip ------------------------------------------------------- */
export function ReviewStrip() {
  const reviews = [
    { initial: "S", name: "Sarah M.", when: "2 days ago", text: "Burst pipe at 10pm, sorted within the hour. Absolute legend.", reply: true },
    { initial: "D", name: "Dave K.", when: "1 week ago", text: "Quoted on the spot, no surprises on the bill. Will use again." },
  ];
  return (
    <figure className="my-10 grid gap-4 sm:grid-cols-2">
      {reviews.map((r) => (
        <div key={r.name} className="rounded-2xl border border-[var(--color-line-ink)] bg-white p-5 shadow-[0_20px_40px_-30px_rgba(18,18,18,0.45)]">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[color-mix(in_oklab,var(--color-ink)_8%,white)] text-[14px] font-bold text-[var(--color-ink)]">
              {r.initial}
            </span>
            <div>
              <div className="text-[14px] font-bold text-[var(--color-ink)]">{r.name}</div>
              <div className="flex items-center gap-2">
                <Stars className="scale-90" />
                <span className="text-[12px] text-[var(--color-ink-soft)]">{r.when}</span>
              </div>
            </div>
          </div>
          <div className="mt-3 text-[14px] leading-[1.55] text-[var(--color-ink)]">{r.text}</div>
          {r.reply ? (
            <div className="mt-3 rounded-xl bg-[color-mix(in_oklab,var(--color-ink)_5%,white)] px-3.5 py-2.5 text-[13px] leading-[1.5] text-[var(--color-ink-soft)]">
              <span className="font-semibold text-[var(--color-ink)]">Owner reply:</span> Thanks Sarah! Glad we could
              get there fast. Cheers, Dave
            </div>
          ) : null}
        </div>
      ))}
    </figure>
  );
}

/* ---- Missed-call → instant text ------------------------------------------ */
export function MissedCall() {
  return (
    <figure className="my-12 flex flex-col items-center">
      <div className="w-full max-w-[330px] rounded-[2.4rem] border border-[var(--color-line-ink)] bg-[#0c0c0c] p-2.5 shadow-[0_40px_80px_-32px_rgba(18,18,18,0.6)]">
        <div className="overflow-hidden rounded-[1.9rem] bg-[#111111] p-5">
          <div className="mb-4 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.14em] text-[var(--color-fg-variant)]">
            <Phone className="h-3.5 w-3.5" /> Missed call · 9:42 pm
          </div>
          <div className="mr-auto w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-[#262626] px-3.5 py-2.5 text-[13px] leading-[1.5] text-[var(--color-fg)]">
            Hi, it&rsquo;s Dave from Coastal Plumbing. Sorry I missed you. What&rsquo;s the job? I can usually get
            someone out same-day.
          </div>
          <div className="ml-auto mt-2.5 w-fit max-w-[85%] rounded-2xl rounded-br-md bg-[var(--color-signal)] px-3.5 py-2.5 text-[13px] font-medium text-[var(--color-on-signal)]">
            Burst pipe in Subiaco, water everywhere!
          </div>
          <div className="mr-auto mt-2.5 w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-[#262626] px-3.5 py-2.5 text-[13px] leading-[1.5] text-[var(--color-fg)]">
            On our way. 20 minutes. Turn your mains off at the meter in the meantime.
          </div>
        </div>
      </div>
      <figcaption className="mt-4 max-w-[42ch] text-center text-[14px] text-[var(--color-ink-soft)]">
        Reply in seconds, even when you can&rsquo;t pick up. Speed is what keeps you on the shortlist.
      </figcaption>
    </figure>
  );
}

/* ---- Inline callout ------------------------------------------------------ */
export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-10 flex gap-4 rounded-2xl border border-[var(--color-line-ink)] bg-[color-mix(in_oklab,var(--color-signal)_12%,white)] p-6">
      <MessageSquare className="mt-0.5 h-5 w-5 flex-none text-[var(--color-ink)]" aria-hidden />
      <div className="text-[1.05rem] font-semibold leading-[1.5] text-[var(--color-ink)]">{children}</div>
    </div>
  );
}

/* ---- "60-second version" takeaways (used in the article template) -------- */
export function KeyTakeaways({ points }: { points: string[] }) {
  return (
    <div className="my-10 rounded-2xl border border-[var(--color-line-ink)] bg-white p-6 shadow-[0_24px_50px_-32px_rgba(18,18,18,0.45)] lg:p-7">
      <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
        <span className="h-2 w-2 rounded-[2px] bg-[var(--color-signal-dim)]" aria-hidden />
        The 60-second version
      </div>
      <ul className="mt-4 grid gap-2.5">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-3 text-[15.5px] leading-[1.5] text-[var(--color-ink)]">
            <Check className="mt-0.5 h-4 w-4 flex-none text-[#1c8439]" aria-hidden />
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
