import Link from "next/link";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { CheckButton } from "@/components/ui/check-button";
import { AIReadoutLive } from "@/components/ai-readout-live";

export function Hero() {
  return (
    <Section
      tone="paper-warm"
      className="overflow-hidden pt-32 lg:pt-40"
      containerClassName="grid items-center gap-x-14 gap-y-14 lg:grid-cols-[1.04fr_0.96fr]"
    >
      {/* soft lime wash behind the answer card */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-8%] top-[6%] h-[520px] w-[520px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--color-signal-glow), transparent 65%)" }}
      />

      <div className="relative">
        <MonoLabel tone="light">Perth local business</MonoLabel>

        <h1 className="mt-6 max-w-[15ch] text-[length:var(--text-display)] font-extrabold leading-[0.97] tracking-[-0.035em] text-[var(--color-ink)]">
          Your next customer won&rsquo;t scroll Google. They&rsquo;ll ask <span className="hl">AI</span> who to call.
        </h1>

        <p className="mt-7 max-w-[46ch] text-[length:var(--text-lede)] leading-[1.5] text-[var(--color-ink-soft)]">
          More people now ask ChatGPT or Google&rsquo;s AI for a good local business, a plumber, a physio, a place to
          eat. It names two or three. Miss that list, and you don&rsquo;t exist for that customer.
        </p>

        <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.55] text-[var(--color-ink-soft)]">
          And when you&rsquo;re ready, we build the AI-readable website and the agents that run your busywork.
        </p>

        <div className="mt-9 flex flex-col gap-x-5 gap-y-4 sm:flex-row sm:items-center">
          <CheckButton />
          <Link
            href="/how-it-works/"
            className="group inline-flex items-center gap-1.5 text-[15px] font-semibold text-[var(--color-ink)] transition-colors hover:text-[var(--color-ink-soft)]"
          >
            How it works
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        <p className="mt-7 text-[13px] text-[var(--color-ink-soft)]">
          Free. Takes 30 seconds. Checked by a real person, not a bot.
        </p>
      </div>

      <div className="relative">
        <AIReadoutLive
          caption="Asked just now"
          prompt="Who's a good emergency plumber in Perth?"
          competitors={["No Probs Plumbing", "GA Perry", "Sarros Plumbing"]}
        />
      </div>
    </Section>
  );
}
