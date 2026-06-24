import { ButtonLink } from "@/components/ui/button-link";
import { WEBSITE_PACKAGES, type WebsitePackage } from "@/lib/business";

const aud = new Intl.NumberFormat("en-AU", {
  style: "currency",
  currency: "AUD",
  maximumFractionDigits: 0,
});

function Card({ pkg }: { pkg: WebsitePackage }) {
  const buyable = Boolean(pkg.stripeUrl);
  const cta = buyable
    ? { href: pkg.stripeUrl as string, label: `Pay ${aud.format(pkg.deposit)} deposit to start` }
    : { href: "/contact/", label: "Enquire" };

  return (
    <div
      className={[
        "grain relative flex flex-col rounded-3xl border p-8 transition-colors",
        pkg.featured
          ? "border-[color-mix(in_oklab,var(--color-signal)_55%,transparent)] lg:-mt-4 lg:mb-[-4px]"
          : "border-[var(--color-border)] hover:border-[color-mix(in_oklab,var(--color-signal)_35%,transparent)]",
      ].join(" ")}
      style={{
        background: pkg.featured
          ? "linear-gradient(165deg,var(--color-surface-high),var(--color-surface-low))"
          : "linear-gradient(165deg,var(--color-surface-container),var(--color-surface-low))",
      }}
    >
      {pkg.featured && (
        <span className="absolute -top-3 left-8 rounded-full bg-[var(--color-signal)] px-3.5 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--color-on-signal)]">
          Most popular
        </span>
      )}

      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-signal)]">
        {pkg.tagline}
      </div>
      <h3 className="mt-2 text-[26px] font-extrabold tracking-[-0.02em] text-[var(--color-fg)]">{pkg.name}</h3>
      <p className="mt-3 min-h-[3.5rem] text-[14px] leading-[1.55] text-[var(--color-fg-variant)]">{pkg.blurb}</p>

      <div className="mt-5 border-t border-[var(--color-border)] pt-5">
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] text-[var(--color-fg-variant)]">from</span>
          <span className="text-[34px] font-extrabold tracking-[-0.03em] text-[var(--color-fg)]">
            {aud.format(pkg.priceFrom)}
          </span>
        </div>
        <p className="mt-1 text-[13px] text-[var(--color-fg-variant)]">
          {buyable
            ? `${aud.format(pkg.deposit)} deposit to start, balance on completion`
            : `${aud.format(pkg.deposit)} deposit to start`}
        </p>
      </div>

      <ul className="mt-6 grid gap-3">
        {pkg.features.map((f) => (
          <li key={f} className="flex gap-3 text-[14px] leading-[1.5] text-[var(--color-fg)]">
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
          variant={pkg.featured ? "solid" : "ghost"}
          className="w-full justify-center"
        />
        <p className="mt-3 text-center text-[12px] text-[var(--color-fg-variant)]">{pkg.timeline}</p>
      </div>
    </div>
  );
}

export function PricingCards() {
  return (
    <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
      {WEBSITE_PACKAGES.map((pkg) => (
        <Card key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
}
