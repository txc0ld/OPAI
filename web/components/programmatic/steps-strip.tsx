// Compact 3-step strip for the dark CTA band on the /ai-visibility/ pages.
const STEPS = [
  { n: "01", title: "Free AI check", body: "See what AI says about you today." },
  { n: "02", title: "We fix the gaps", body: "Profile, reviews, plain-text services and area." },
  { n: "03", title: "Get recommended", body: "Become the name AI puts forward." },
];

export function StepsStrip() {
  return (
    <div className="mx-auto mt-14 grid max-w-[var(--container-max)] gap-6 border-t border-[var(--color-border)] pt-10 sm:grid-cols-3">
      {STEPS.map((s) => (
        <div key={s.n}>
          <div className="font-mono text-[12px] tracking-[0.22em] text-[var(--color-signal)]">{s.n}</div>
          <div className="mt-2 text-[16px] font-bold text-[var(--color-fg)]">{s.title}</div>
          <p className="mt-1.5 text-[14px] leading-[1.5] text-[var(--color-fg-variant)]">{s.body}</p>
        </div>
      ))}
    </div>
  );
}
