import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { ContactForm } from "@/components/contact/contact-form";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS, emails } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/contact/`;
const TITLE = "Contact";
const DESCRIPTION = "Get in touch with OperateAI, or take the free AI Visibility Check first.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact/" },
  openGraph: {
    type: "website",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION })])} />
      <Section tone="paper" className="pt-32 lg:pt-40" containerClassName="max-w-[720px]">
        <MonoLabel tone="light">Contact</MonoLabel>
        <h1 className="mt-5 text-[length:var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.025em] text-[var(--color-ink)]">
          Rather just have a chat?
        </h1>
        <p className="mt-5 text-[17px] leading-[1.6] text-[var(--color-ink-soft)]">
          The fastest start is the{" "}
          <a href="/check/" className="text-[var(--color-ink)] underline underline-offset-4 hover:opacity-70">
            free AI check
          </a>
          , but if you&rsquo;d rather email me, drop a line below or write to{" "}
          <a
            href={`mailto:${BUSINESS.email}`}
            className="text-[var(--color-ink)] underline underline-offset-4 hover:opacity-70"
          >
            {BUSINESS.email}
          </a>{" "}
          (or{" "}
          <a
            href={`mailto:${emails.hello}`}
            className="text-[var(--color-ink)] underline underline-offset-4 hover:opacity-70"
          >
            {emails.hello}
          </a>{" "}
          for general enquiries).
        </p>

        {/* Dark form card — intentional contrast panel on paper */}
        <div
          className="grain mt-10 rounded-3xl border border-[var(--color-border)] p-8 lg:p-10"
          style={{ background: "linear-gradient(150deg,var(--color-surface-high),var(--color-surface-container))" }}
        >
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
