import Link from "next/link";
import { CheckButton } from "@/components/ui/check-button";

export default function NotFound() {
  return (
    <section className="bg-[#121414] px-6 pt-[140px] pb-24 text-center lg:px-12 lg:pt-[180px] lg:pb-32">
      <div className="mx-auto w-full max-w-[820px]">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-fg-variant)]">404</p>
        <h1 className="text-[clamp(40px,7vw,88px)] font-extrabold leading-[1] tracking-[-0.04em] text-[var(--color-fg)]">
          That page isn&apos;t here.
        </h1>
        <p className="mx-auto mt-6 max-w-[36rem] text-[var(--color-fg-variant)]">
          Want to see what AI says about your business?
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <CheckButton label="Get your free AI check" />
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded border border-[var(--color-fg-variant)] px-6 py-3.5 text-[15px] font-semibold text-[var(--color-fg)] transition-colors duration-300 hover:border-[var(--color-fg)] hover:bg-[var(--color-fg)]/10"
          >
            Back to home →
          </Link>
        </div>
      </div>
    </section>
  );
}
