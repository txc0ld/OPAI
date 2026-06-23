import Link from "next/link";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";

const ITEMS = [
  "Checked every week, not once",
  "Profile + site kept current for you",
  "You approve anything that goes public",
  "Monthly proof, with screenshots",
];

export function DoneForYouCta() {
  return (
    <Section tone="paper-warm">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
        <div>
          <MonoLabel tone="light">Done-for-you · Always on</MonoLabel>
          <h2 className="mt-5 max-w-[20ch] text-[length:var(--text-section)] font-extrabold leading-[1.05] tracking-[-0.025em] text-[var(--color-ink)]">
            Flat out? We&rsquo;ll keep you on the shortlist.
          </h2>
          <p className="mt-5 max-w-[46ch] text-[16px] leading-[1.6] text-[var(--color-ink-soft)]">
            The free check shows where you stand. The done-for-you service keeps you there — always on, with you
            approving anything before it goes live.
          </p>
          <div className="mt-8">
            <Link
              href="/done-for-you/"
              className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-line-ink)] px-7 py-3.5 text-[15px] font-bold tracking-tight text-[var(--color-ink)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--color-ink)] hover:text-white"
            >
              See the done-for-you service
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-[var(--color-line-ink)] bg-[var(--color-paper)] p-6 font-mono text-[13px] leading-[1.9]">
          <div className="mb-4 text-[10px] uppercase tracking-[0.18em] text-[var(--color-ink-soft)]">
            What &ldquo;handled&rdquo; means
          </div>
          <ul className="grid gap-2.5">
            {ITEMS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[var(--color-ink)]">
                <span aria-hidden className="mt-0.5 select-none text-[var(--color-ink)]">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
