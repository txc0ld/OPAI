import Image from "next/image";

// A CSS browser-window chrome wrapping a screenshot. Image is 1440x1000 (rendered at 2x).
export function BrowserFrame({ src, alt, url }: { src: string; alt: string; url: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_40px_80px_-44px_rgba(0,0,0,0.7)]">
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] px-4 py-3" style={{ background: "var(--color-surface-high)" }}>
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#febc2e" }} />
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#28c840" }} />
        </span>
        <span
          className="ml-2 truncate rounded-md px-3 py-1 font-mono text-[11px] text-[var(--color-fg-variant)]"
          style={{ background: "var(--color-surface-container)" }}
        >
          {url}
        </span>
      </div>
      <Image src={src} alt={alt} width={1440} height={1000} loading="lazy" className="h-auto w-full" />
    </div>
  );
}
