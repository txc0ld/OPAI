import { Button } from "@/components/button";
import { cn } from "@/lib/cn";

const supportPoints = [
  "AI strategy for owners starting from zero",
  "Custom AI agents for sales, admin and ops",
  "Workflow automation for repetitive tasks",
  "Managed hosting, monitoring and improvement",
  "Practical AI training for the whole team",
];

export function Hero() {
  return (
    <section
      data-tone="paper"
      className={cn(
        "blueprint-grid w-full text-[var(--color-on-surface)]",
        "pt-[clamp(3.75rem,7vw,6rem)] pb-[clamp(3.25rem,6vw,5rem)]",
      )}
    >
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[clamp(1.25rem,4vw,2.5rem)]">
        <div className="paint-in paint-delay-1 mb-8 flex items-center gap-3">
          <span className="power-dot" aria-hidden="true" />
          <p className="font-heading text-[0.75rem] font-bold uppercase leading-none tracking-[0.08em]">
            OperateAI · Built in Perth
          </p>
        </div>
        <h1
          className={cn(
            "paint-in paint-delay-2 max-w-[15ch]",
            "font-heading [font-size:var(--text-display)] font-bold leading-[0.9] tracking-[-0.055em]",
          )}
        >
          AI agents and automation for small businesses.
        </h1>
        <p className="paint-in paint-delay-3 mt-8 max-w-[44rem] border-l-[3px] border-black pl-5 [font-size:var(--text-lede)] leading-[1.55] text-[var(--color-muted)]">
          OperateAI helps small and medium businesses integrate practical AI
          into their daily operations — from first-time AI training to custom
          AI agents, workflow automation, hosting, management and ongoing
          support.
        </p>
        <ul className="paint-in paint-delay-4 mt-8 grid max-w-[60rem] gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {supportPoints.map((item) => (
            <li key={item} className="flex gap-3 text-[0.95rem] leading-[1.45] text-[var(--color-ink)]">
              <span className="mt-2 h-2 w-2 shrink-0 bg-[var(--color-primary-container)] ring-2 ring-black" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="paint-in paint-delay-4 mt-10 flex flex-col items-start gap-4 sm:flex-row">
          <Button as="a" href="/book-ai-audit/" size="lg">
            Book an AI Business Audit
          </Button>
          <Button as="a" href="/ai-integration-services/" variant="outline" size="lg">
            Explore AI services
          </Button>
        </div>
        <p className="paint-in paint-delay-5 mt-8 font-mono text-[0.875rem] text-[var(--color-muted)]">
          Based in Perth, Western Australia. Supporting businesses across Australia and online worldwide.
        </p>
      </div>
    </section>
  );
}
