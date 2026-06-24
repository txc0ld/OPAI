import { BrowserFrame } from "@/components/work/browser-frame";
import { WEBSITE_EXAMPLES } from "@/content/work";

export function WebsiteGallery() {
  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-2">
      {WEBSITE_EXAMPLES.map((w) => (
        <figure key={w.key}>
          <BrowserFrame src={w.image} alt={w.alt} url={w.url} />
          <figcaption className="mt-4 flex items-start justify-between gap-4">
            <div>
              <div className="font-bold text-[var(--color-fg)]">{w.business}</div>
              <div className="mt-0.5 text-[14px] leading-[1.5] text-[var(--color-fg-variant)]">
                {w.trade} · {w.blurb}
              </div>
            </div>
            <span className="flex-none rounded-full border border-[var(--color-border)] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-fg-variant)]">
              Example build
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
