import Link from "next/link";
import { Logo } from "@/components/logo";
import { FOOTER_LEGAL } from "@/lib/nav";
import { BUSINESS, emails } from "@/lib/business";

type FooterLink = { href: string; label: string };

const SERVICES: FooterLink[] = [
  { href: "/ioagent/", label: "iOAgent" },
  { href: "/websites/", label: "Websites" },
  { href: "/done-for-you/", label: "Done-for-you" },
  { href: "/check/", label: "Free AI Check" },
];

const COMPANY: FooterLink[] = [
  { href: "/how-it-works/", label: "How it works" },
  { href: "/about/", label: "About" },
  { href: "/articles/", label: "Articles" },
  { href: "/contact/", label: "Contact" },
];

const linkClass =
  "link text-[15px] text-[var(--color-fg-variant)] transition-colors duration-300 hover:text-[var(--color-signal)]";
const headingClass = "text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-fg-variant)]";

function Column({ title, links, d }: { title: string; links: FooterLink[]; d: number }) {
  return (
    <div className="reveal" data-d={d}>
      <h3 className={headingClass}>{title}</h3>
      <ul className="mt-5 grid gap-3">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className={linkClass}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="grain relative border-t border-[var(--color-border)] bg-[var(--color-void)] px-6 pt-16 pb-10 text-[var(--color-fg)] lg:px-12 lg:pt-24 lg:pb-12">
      <div className="relative z-[1] mx-auto grid w-full max-w-[var(--container-max)] gap-12 xl:grid-cols-3 xl:gap-8">
        {/* Brand */}
        <div className="reveal flex flex-col items-start">
          <Link href="/" className="inline-flex" aria-label="OperateAI home">
            <Logo />
          </Link>
          <p className="mt-5 max-w-[340px] text-[15px] leading-[1.6] text-[var(--color-fg-variant)]">
            We help Perth local service businesses get found, recommended and booked by AI, sorted for how customers
            search now and how AI is about to book them next.
          </p>
          <div className="mt-6 flex flex-col gap-2.5">
            <a
              href={`mailto:${emails.team}`}
              className="text-[15px] font-semibold text-[var(--color-fg)] transition-colors duration-300 hover:text-[var(--color-signal)]"
            >
              {emails.team}
            </a>
            <a
              href={`tel:${BUSINESS.telephone.replace(/\s+/g, "")}`}
              className="text-[15px] text-[var(--color-fg-variant)] transition-colors duration-300 hover:text-[var(--color-signal)]"
            >
              {BUSINESS.telephone}
            </a>
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-[var(--color-fg-variant)] transition-colors duration-300 hover:text-[var(--color-signal)]"
            >
              Instagram @operateai.au
            </a>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 xl:col-span-2">
          <Column title="Services" links={SERVICES} d={1} />
          <Column title="Company" links={COMPANY} d={2} />
          <Column title="Legal" links={[...FOOTER_LEGAL]} d={3} />
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="reveal relative z-[1] mx-auto mt-16 flex w-full max-w-[var(--container-max)] flex-wrap justify-between gap-2 border-t border-[var(--color-border)] pt-7 text-[12px] tracking-[0.02em] text-[var(--color-fg-variant)] lg:mt-20"
        data-d={4}
      >
        <span>
          {BUSINESS.abn}, &copy; {BUSINESS.copyrightYear} {BUSINESS.legalName}
        </span>
        <span>Perth, WA</span>
      </div>
    </footer>
  );
}
