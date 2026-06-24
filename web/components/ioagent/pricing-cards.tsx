import { ButtonLink } from "@/components/ui/button-link";
import { IOAGENT_PLANS, IOAGENT_INCLUDES, type AgentPlan } from "@/lib/business";

// en-US locale renders AUD as "A$" (en-AU renders just "$"), so the currency is explicit.
const aud = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

function Card({ plan }: { plan: AgentPlan }) {
  const buyable = Boolean(plan.stripeUrl);
  const cta = buyable
    ? { href: plan.stripeUrl as string, label: `Start, ${aud.format(plan.pricePerMonth)}/mo` }
    : { href: "/contact/", label: "Book a setup call" };
  const agentLine = `${plan.agents} custom-built always-on agent${plan.agents > 1 ? "s" : ""}`;

  return (
    <div
      className={[
        "grain relative flex flex-col rounded-3xl border p-8 transition-colors",
        plan.featured
          ? "border-[color-mix(in_oklab,var(--color-signal)_55%,transparent)] lg:-mt-4 lg:mb-[-4px]"
          : "border-[var(--color-border)] hover:border-[color-mix(in_oklab,var(--color-signal)_35%,transparent)]",
      ].join(" ")}
      style={{
        background: plan.featured
          ? "linear-gradient(165deg,var(--color-surface-high),var(--color-surface-low))"
          : "linear-gradient(165deg,var(--color-surface-container),var(--color-surface-low))",
      }}
    >
      {plan.featured && (
        <span className="absolute -top-3 left-8 rounded-full bg-[var(--color-signal)] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-on-signal)]">
          Most popular
        </span>
      )}

      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-signal)]">
        {plan.agents} {plan.agents > 1 ? "agents" : "agent"}
      </div>
      <h3 className="mt-2 text-[26px] font-extrabold tracking-[-0.02em] text-[var(--color-fg)]">{plan.name}</h3>
      <p className="mt-3 min-h-[3rem] text-[14px] leading-[1.55] text-[var(--color-fg-variant)]">{plan.blurb}</p>

      <div className="mt-5 flex items-baseline gap-1.5 border-t border-[var(--color-border)] pt-5">
        <span className="text-[34px] font-extrabold tracking-[-0.03em] text-[var(--color-fg)]">
          {aud.format(plan.pricePerMonth)}
        </span>
        <span className="text-[14px] text-[var(--color-fg-variant)]">/month</span>
      </div>

      <ul className="mt-6 grid gap-3">
        <li className="flex gap-3 text-[14px] font-semibold leading-[1.4] text-[var(--color-fg)]">
          <span aria-hidden className="mt-0.5 select-none text-[var(--color-signal)]">
            ✓
          </span>
          {agentLine}
        </li>
        {IOAGENT_INCLUDES.map((f) => (
          <li key={f} className="flex gap-3 text-[14px] leading-[1.45] text-[var(--color-fg-variant)]">
            <span aria-hidden className="mt-0.5 select-none text-[var(--color-signal)]">
              ✓
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="mt-8 pt-2">
        <ButtonLink
          href={cta.href}
          label={cta.label}
          variant={plan.featured ? "solid" : "ghost"}
          className="w-full justify-center"
        />
      </div>
    </div>
  );
}

export function IOAgentPlans() {
  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
      {IOAGENT_PLANS.map((plan) => (
        <Card key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
