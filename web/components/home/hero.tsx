import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { AIReadout } from "@/components/ai-readout";
import Link from "next/link";

export function Hero() {
  return (
    <Section className="pt-32 lg:pt-40" containerClassName="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <MonoLabel>
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[var(--color-signal)]" aria-hidden />
          Perth, WA
        </MonoLabel>
        <h1 className="mt-5 text-[length:var(--text-display)] font-extrabold leading-[1.02] tracking-[-0.03em]">
          Your next customer won&rsquo;t scroll Google. They&rsquo;ll ask AI who to call.
        </h1>
        <p className="mt-6 max-w-[48ch] text-[length:var(--text-lede)] leading-[1.55] text-[var(--color-fg-variant)]">
          More Perth homeowners are asking ChatGPT and Google&rsquo;s AI &ldquo;who&rsquo;s a good tradie?&rdquo; — and
          it only names two or three. If you&rsquo;re not one of them, you don&rsquo;t exist for that job.
        </p>
        <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
          <CheckButton />
          <Link href="/how-it-works/" className="text-[15px] font-semibold text-[var(--color-fg)] hover:text-[var(--color-signal)]">
            How it works →
          </Link>
        </div>
        <p className="mt-5 font-mono text-[12px] tracking-[0.04em] text-[var(--color-fg-variant)]">
          Free · takes you 30 seconds · a real person checks it, not a bot.
        </p>
      </div>
      <AIReadout
        caption="Asked just now"
        prompt="Who's a good emergency plumber in Perth?"
        names={["Coastal Plumbing & Gas", "RapidFlow Plumbers", "Westside Emergency Plumbing"]}
        hook="— is your name here?"
      />
    </Section>
  );
}
