import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-[var(--color-bg)] px-6 pt-[140px] pb-24 text-center lg:px-12 lg:pt-[180px] lg:pb-32">
      <div className="mx-auto w-full max-w-[820px]">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-[var(--color-w50)]">404</p>
        <h1 className="text-[clamp(40px,7vw,88px)] font-extrabold leading-[1] tracking-[-0.04em]">
          Not the page.
        </h1>
        <p className="mx-auto mt-6 max-w-[36rem] text-[var(--color-w70)]">
          That route does not exist. Probably.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[7px] bg-[var(--color-fg)] px-6 py-3.5 text-[15px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
          >
            Back to home →
          </Link>
          <Link
            href="/industries/"
            className="inline-flex items-center gap-2 rounded-[7px] border border-[var(--color-w30)] px-6 py-3.5 text-[15px] font-semibold text-[var(--color-fg)] transition-colors duration-300 hover:border-[var(--color-fg)] hover:bg-[var(--color-w10)]"
          >
            Industries
          </Link>
          <Link
            href="/book-ai-audit/"
            className="inline-flex items-center gap-2 rounded-[7px] border border-[var(--color-w30)] px-6 py-3.5 text-[15px] font-semibold text-[var(--color-fg)] transition-colors duration-300 hover:border-[var(--color-fg)] hover:bg-[var(--color-w10)]"
          >
            Book an audit
          </Link>
        </div>
      </div>
    </section>
  );
}
