import type { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { MonoLabel } from "@/components/ui/mono-label";
import { ContactForm } from "@/components/contact/contact-form";
import { JsonLd } from "@/components/json-ld";
import { buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

const PAGE_URL = `${BUSINESS.url}/contact/`;
const TITLE = "Contact";
const DESCRIPTION = "Get in touch with OperateAI — or take the free AI Visibility Check first.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={wrapGraph([buildWebPage({ url: PAGE_URL, title: TITLE, description: DESCRIPTION })])} />
      <Section className="pt-32 lg:pt-40" containerClassName="max-w-[720px]">
        <MonoLabel>Contact</MonoLabel>
        <h1 className="mt-5 text-[var(--text-section)] font-extrabold leading-[1.08] tracking-[-0.02em]">
          Rather just have a chat?
        </h1>
        <p className="mt-5 text-[17px] leading-[1.6] text-[var(--color-fg-variant)]">
          The fastest start is the{" "}
          <a href="/check/" className="text-[var(--color-signal)] underline-offset-4 hover:underline">
            free AI check
          </a>{" "}
          — but if you&rsquo;d rather email me, drop a line below or write to{" "}
          <a href={`mailto:${BUSINESS.email}`} className="text-[var(--color-signal)] underline-offset-4 hover:underline">
            {BUSINESS.email}
          </a>
          .
        </p>
        <div className="mt-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-container)] p-6 lg:p-8">
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
