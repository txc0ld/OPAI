import type { Metadata } from "next";
import Link from "next/link";
import { ParticleCanvas } from "@/components/home/particle-canvas";
import { StageShell } from "@/components/home/stage-shell";
import { JsonLd } from "@/components/json-ld";
import { buildLocalBusiness, buildWebPage, wrapGraph, buildFaqPage } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

export const metadata: Metadata = {
  title: "OperateAI | AI Agents, Automation & Training for Australian Businesses",
  description:
    "OperateAI helps small and medium businesses integrate AI, automate workflows, host AI agents and train staff. Based in Perth, serving Australia and online clients worldwide.",
  alternates: { canonical: "/" },
};

const FAQS = [
  {
    question: "What does an AI consultant do for a small business?",
    answer:
      "An AI consultant helps a business identify where AI can be used practically, choose the right tools, design workflows, train staff and implement systems such as AI agents, automation and internal knowledge assistants. The goal is to apply AI where it creates measurable operational value.",
  },
  {
    question: "Do we need technical staff to use your AI services?",
    answer:
      "No. OperateAI works with both non-technical owners and technical teams. For beginners we provide plain-English guidance and training; for technical teams we support deeper workflow design, AI agent architecture, integrations and managed operations.",
  },
  {
    question: "Can you build custom AI agents for our business?",
    answer:
      "Yes. We design and build custom AI agents for customer support, admin, sales, internal knowledge, operations and onboarding. Each agent has a clear purpose, defined boundaries and appropriate business information.",
  },
  {
    question: "Do you offer AI training in Perth?",
    answer:
      "Yes. OperateAI offers AI training for businesses in Perth and across Australia, for owners, managers, staff and technical personnel — in person where suitable or online.",
  },
  {
    question: "Do you host and manage AI agents?",
    answer:
      "Yes. We provide managed AI agent hosting, monitoring, maintenance and optimisation for businesses that want AI systems running without managing the technical details internally.",
  },
  {
    question: "Is AI suitable for every business process?",
    answer:
      "No. AI is useful for many repetitive, information-heavy and support workflows, but not every task. A proper audit identifies where AI helps, where human oversight is required, and where automation would create unnecessary risk.",
  },
];

const SERVICES = [
  {
    n: "01",
    href: "/book-ai-audit/",
    title: "AI Business Audit",
    body: "A structured review of your workflows, tools, bottlenecks and AI opportunities. We identify where AI can create measurable value and where it should be avoided.",
    cta: "Book an audit →",
  },
  {
    n: "02",
    href: "/ai-integration-services/",
    title: "AI Integration Services",
    body: "We integrate AI into your daily processes — customer support, admin, sales, reporting, operations, documentation and internal knowledge systems.",
    cta: "View integration →",
  },
  {
    n: "03",
    href: "/ai-agents-for-business/",
    title: "Custom AI Agents",
    body: "We design and build AI agents that handle repetitive tasks, answer business-specific questions, process information, support customers and help staff work faster.",
    cta: "Explore agents →",
  },
  {
    n: "04",
    href: "/ai-agent-hosting/",
    title: "AI Agent Hosting & Management",
    body: "We host, monitor, maintain and improve your AI agents so your business is not left managing technical systems alone.",
    cta: "Managed hosting →",
  },
  {
    n: "05",
    href: "/ai-training-for-business/",
    title: "AI Training for Business",
    body: "Practical training for owners, managers and staff — from AI basics to advanced workflows, prompt design, tool selection and safe business usage.",
    cta: "View training →",
  },
];

const USE_CASES = [
  "Customer support assistants trained on your business information",
  "Internal knowledge assistants for policies, procedures and documents",
  "Lead qualification and sales support agents",
  "Automated email, proposal and document drafting workflows",
  "AI-assisted quoting, intake and admin processes",
  "Reporting and data summarisation workflows",
  "Staff training and AI adoption programs",
  "AI agents connected to business tools and databases",
  "AI governance, usage policies and risk controls",
];

const STEPS = [
  { n: "01", title: "Audit", body: "We review your business workflows, tools, pain points, staff capability and AI opportunities." },
  { n: "02", title: "Roadmap", body: "You receive a practical AI implementation plan prioritised by value, complexity, risk and speed of deployment." },
  { n: "03", title: "Build", body: "We configure tools, design workflows, build AI agents and integrate systems where appropriate." },
  { n: "04", title: "Train", body: "We train owners, managers and staff so the AI systems are used properly and consistently." },
  { n: "05", title: "Manage", body: "We provide ongoing hosting, monitoring, updates and optimisation for businesses that want managed AI operations." },
];

const INDUSTRIES = [
  { slug: "ai-for-accounting-firms", label: "Accounting firms" },
  { slug: "ai-for-real-estate-agencies", label: "Real estate agencies" },
  { slug: "ai-for-trades-businesses", label: "Trades businesses" },
  { slug: "ai-for-health-clinics", label: "Health clinics" },
  { slug: "ai-for-law-firms", label: "Law firms" },
  { slug: "ai-for-ecommerce-businesses", label: "Ecommerce businesses" },
];

export default function Home() {
  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({
            url: BUSINESS.url + "/",
            title: "OperateAI — AI agents and automation for small businesses",
            description:
              "OperateAI helps small and medium businesses integrate AI, automate workflows, host AI agents and train staff.",
          }),
          buildLocalBusiness(),
          buildFaqPage(FAQS),
        ])}
      />

      <ParticleCanvas />

      {/* STAGE 1 — hero */}
      <StageShell stageId="stage-top" bodyId="body-top">
        <h1 className="sr-only">AI agents and automation for small businesses.</h1>
        <span className="eyebrow mb-[22px]">OperateAI · Built in Perth</span>
        <p className="text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
          OperateAI helps small and medium businesses integrate practical AI into their daily operations
          — from first-time AI training to custom AI agents, workflow automation, hosting, management
          and ongoing support.
        </p>
        <Ticks
          items={[
            "AI strategy for owners starting from zero",
            "Custom AI agents for sales, admin and ops",
            "Workflow automation for repetitive tasks",
            "Managed hosting, monitoring and improvement",
            "Practical AI training for the whole team",
          ]}
        />
        <CtaRow>
          <BtnFill href="/book-ai-audit/">Book an AI Business Audit →</BtnFill>
          <BtnLine href="/ai-integration-services/">Explore AI services</BtnLine>
        </CtaRow>
        <Footnote>Based in Perth, Western Australia. Supporting businesses across Australia and online worldwide.</Footnote>
      </StageShell>

      {/* STAGE 2 — integration */}
      <StageShell stageId="stage-integration" bodyId="body-integration">
        <span className="eyebrow mb-[22px]">OperateAI · Service</span>
        <p className="text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
          AI integration is not about adding another tool to your business. It is about connecting AI
          to the way your business already works — across admin, sales, customer service, operations,
          reporting and internal knowledge.
        </p>
        <Ticks
          twoCol
          items={[
            "AI chat assistants",
            "Internal knowledge bases",
            "Customer support workflows",
            "Sales & lead qualification",
            "Document generation systems",
            "Email & inbox workflows",
            "CRM & pipeline workflows",
            "Reporting & summarisation",
          ]}
        />
        <CtaRow>
          <BtnFill href="/book-ai-audit/">Book an AI Integration Call →</BtnFill>
          <BtnLine href="/ai-agents-for-business/">Custom AI agents</BtnLine>
        </CtaRow>
        <Footnote>Usable systems, not gimmicks. A single high-value workflow typically ships in 2–4 weeks.</Footnote>
      </StageShell>

      {/* STAGE 3 — hosting */}
      <StageShell stageId="stage-hosting" bodyId="body-hosting">
        <span className="eyebrow mb-[22px]">OperateAI · Service</span>
        <p className="text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
          Building an AI agent is only the first step. To be useful, it needs to be hosted, monitored,
          maintained and improved over time. We run managed AI agent hosting so you get the automation
          without carrying the technical burden internally.
        </p>
        <Ticks
          twoCol
          items={[
            "Setup & deployment",
            "Hosting & access management",
            "Prompt & instruction upkeep",
            "Knowledge base updates",
            "Workflow monitoring",
            "Performance reviews",
            "Security & access controls",
            "Usage reporting",
          ]}
        />
        <CtaRow>
          <BtnFill href="/book-ai-audit/">View Managed AI Options →</BtnFill>
          <BtnLine href="/ai-integration-services/">AI integration</BtnLine>
        </CtaRow>
        <Footnote>Month-to-month after setup. Full offboarding handover on cancellation.</Footnote>
      </StageShell>

      {/* STAGE 4 — training */}
      <StageShell stageId="stage-training" bodyId="body-training">
        <span className="eyebrow mb-[22px]">OperateAI · Service</span>
        <p className="text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
          AI training should not be abstract, technical or filled with hype. We train owners, managers
          and staff to use AI tools confidently, safely and productively — beginner to advanced, in
          person in Perth or online worldwide.
        </p>
        <Ticks
          twoCol
          items={[
            "AI fundamentals for business",
            "Prompting for practical work",
            "AI for admin, sales & ops",
            "AI-assisted writing & docs",
            "AI workflow design",
            "Agents & automation",
            "AI policy & governance",
            "Safe use of business data",
          ]}
        />
        <CtaRow>
          <BtnFill href="/book-ai-audit/">Book AI Training →</BtnFill>
          <BtnLine href="/ai-agents-for-business/">Custom AI agents</BtnLine>
        </CtaRow>
        <Footnote>Three levels — beginner, intermediate, advanced — tailored to your team and tools.</Footnote>
      </StageShell>

      {/* STAGE 5 — industries */}
      <StageShell stageId="stage-industries" bodyId="body-industries">
        <span className="eyebrow mb-[22px]">OperateAI · Industries</span>
        <p className="text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
          Practical AI agents, automation and training tailored to common Australian small- and
          medium-business sectors. If your sector is not listed, book an audit and we will assess fit
          directly.
        </p>
        <ul className="mt-[34px] grid max-w-[680px] list-none gap-3 sm:grid-cols-2 sm:gap-x-[34px]">
          {INDUSTRIES.map((i) => (
            <li key={i.slug} className="flex items-start gap-3 text-[15px] text-[var(--color-w70)]">
              <span className="mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full bg-[var(--color-accent)]" />
              <Link href={`/industries/${i.slug}/`} className="hover:text-[var(--color-fg)]">
                {i.label} →
              </Link>
            </li>
          ))}
        </ul>
        <CtaRow>
          <BtnFill href="/book-ai-audit/">Book an AI Business Audit →</BtnFill>
        </CtaRow>
        <Footnote>Tailored to your sector&apos;s admin, compliance and customer workflows.</Footnote>
      </StageShell>

      {/* MAIN content sections */}
      <main className="relative z-10 bg-[var(--color-bg)]">
        {/* Problem */}
        <Section>
          <div className="mx-auto w-full max-w-[820px]">
            <Eyebrow className="reveal">The problem</Eyebrow>
            <H2 className="reveal mt-[26px]" data-d="1">
              Most businesses know AI matters. Few know where to start.
            </H2>
            <Body className="reveal" data-d="2">
              AI tools are everywhere, but most small and medium businesses are still stuck at the
              experimentation stage. You may have staff using ChatGPT casually, or have tried a few
              automation tools, and you may know AI could save time, reduce admin and improve customer
              service — but without a clear implementation plan it becomes another disconnected tool
              instead of a business advantage.
            </Body>
            <Body className="reveal" data-d="2">
              OperateAI helps you move from scattered AI usage to structured AI systems that support
              real business workflows.
            </Body>
          </div>
        </Section>

        {/* Services list */}
        <Section>
          <div className="mx-auto w-full max-w-[1200px]">
            <Eyebrow className="reveal">Services</Eyebrow>
            <H2 className="reveal mt-[26px]" data-d="1">
              AI services for every stage of business adoption
            </H2>
            <div className="mt-14 border-t border-[var(--color-w10)]">
              {SERVICES.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="reveal group grid grid-cols-1 gap-[10px] border-b border-[var(--color-w10)] py-[30px] transition-all duration-[400ms] ease-[var(--ease)] hover:pl-3 md:grid-cols-[38px_280px_1fr_auto] md:items-start md:gap-7"
                >
                  <span className="font-mono text-[13px] text-[var(--color-accent)]">{s.n}</span>
                  <span className="text-[21px] font-bold leading-tight tracking-[-0.02em]">{s.title}</span>
                  <span className="text-[15px] leading-[1.6] text-[var(--color-w50)]">{s.body}</span>
                  <span className="whitespace-nowrap text-[14px] text-[var(--color-w50)] transition-colors duration-300 group-hover:text-[var(--color-fg)]">
                    {s.cta}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Section>

        {/* Audience */}
        <Section>
          <div className="mx-auto w-full max-w-[1200px]">
            <Eyebrow className="reveal">Who it&apos;s for</Eyebrow>
            <H2 className="reveal mt-[26px]" data-d="1">
              Built for non-technical owners and technical teams
            </H2>
            <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-12">
              <div className="reveal rounded-xl border border-[var(--color-w10)] p-[34px]" data-d="1">
                <h3 className="mb-[14px] text-[22px] font-bold tracking-[-0.02em]">Starting from zero</h3>
                <p className="text-[15px] leading-[1.6] text-[var(--color-w70)]">
                  For business owners and teams new to AI, we provide plain-English guidance, practical
                  training and step-by-step implementation.
                </p>
              </div>
              <div className="reveal rounded-xl border border-[var(--color-w10)] p-[34px]" data-d="2">
                <h3 className="mb-[14px] text-[22px] font-bold tracking-[-0.02em]">With technical staff</h3>
                <p className="text-[15px] leading-[1.6] text-[var(--color-w70)]">
                  For businesses with technical personnel, we provide deeper support across AI agent
                  design, workflow architecture, automation logic, hosting, documentation and ongoing
                  optimisation.
                </p>
              </div>
            </div>
            <Body className="reveal" data-d="3">
              You do not need to know exactly what you need before speaking with us. The first step is
              identifying where AI can create useful business value.
            </Body>
          </div>
        </Section>

        {/* Use cases */}
        <Section>
          <div className="mx-auto w-full max-w-[1200px]">
            <Eyebrow className="reveal">Use cases</Eyebrow>
            <H2 className="reveal mt-[26px]" data-d="1">
              Common AI use cases for small and medium businesses
            </H2>
            <ul className="mt-12 grid list-none gap-0 md:grid-cols-2 md:gap-x-12">
              {USE_CASES.map((u, i) => (
                <li
                  key={u}
                  className="reveal flex items-start gap-[14px] border-b border-[var(--color-w10)] py-[18px] text-[16px] text-[var(--color-w70)]"
                >
                  <span className="min-w-[24px] font-mono text-[12px] text-[var(--color-w30)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* How we work — light section */}
        <section className="bg-[var(--color-light)] px-6 py-32 text-[var(--color-ink)] lg:px-12 lg:py-40">
          <div className="mx-auto w-full max-w-[1200px]">
            <span className="eyebrow light-mode reveal">How we work</span>
            <h2
              className="reveal mt-[26px] text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] text-[var(--color-ink)]"
              data-d="1"
            >
              From audit to managed operations
            </h2>
            <div className="mt-14 border-t border-black/10">
              {STEPS.map((s) => (
                <div
                  key={s.n}
                  className="reveal grid grid-cols-1 gap-2 border-b border-black/10 py-8 md:grid-cols-[90px_200px_1fr] md:items-baseline md:gap-8"
                >
                  <span className="font-mono text-[42px] font-medium tracking-[-0.02em] text-black/[0.18]">
                    {s.n}
                  </span>
                  <h3 className="text-[22px] font-bold tracking-[-0.02em] text-[var(--color-ink)]">
                    {s.title}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-[#555]">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid CTA */}
        <Section>
          <div className="mx-auto w-full max-w-[820px] text-center">
            <H2 className="reveal">Start with an AI Business Audit</H2>
            <p
              className="reveal mt-[22px] text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]"
              data-d="1"
            >
              The fastest way to begin is with a focused AI Business Audit. We review your current
              tools, workflows and opportunities, then identify where AI agents, automation or training
              can deliver practical value — so you leave with a clear roadmap instead of vague AI ideas.
            </p>
            <div className="reveal mt-10 flex justify-center" data-d="2">
              <BtnFill href="/book-ai-audit/">Book an AI Business Audit →</BtnFill>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section>
          <div className="mx-auto w-full max-w-[1200px]">
            <Eyebrow className="reveal">FAQ</Eyebrow>
            <H2 className="reveal mt-[26px]" data-d="1">
              Frequently asked questions
            </H2>
            <div className="reveal mt-12 max-w-[860px]" data-d="2">
              {FAQS.map((f) => (
                <details key={f.question} className="group border-b border-[var(--color-w10)]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[18px] font-semibold tracking-[-0.01em] transition-colors hover:text-[var(--color-fg)] [&::-webkit-details-marker]:hidden">
                    <span>{f.question}</span>
                    <span className="relative h-[18px] w-[18px] shrink-0">
                      <span className="absolute left-1/2 top-1/2 h-[1.5px] w-[14px] -translate-x-1/2 -translate-y-1/2 bg-[var(--color-w50)]" />
                      <span className="absolute left-1/2 top-1/2 h-[14px] w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-[var(--color-w50)] transition-transform duration-300 group-open:scale-y-0" />
                    </span>
                  </summary>
                  <div className="overflow-hidden pb-6 text-[15px] leading-[1.65] text-[var(--color-w70)]">
                    <p className="max-w-[760px]">{f.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </Section>

        {/* Closing CTA */}
        <Section>
          <div className="mx-auto w-full max-w-[820px] text-center">
            <H2 className="reveal">Not sure where AI fits your business?</H2>
            <p
              className="reveal mt-[22px] text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]"
              data-d="1"
            >
              Start with an AI Business Audit. We will identify the best opportunities, the risks to
              avoid, and the clearest next steps for implementation.
            </p>
            <div className="reveal mt-10 flex justify-center" data-d="2">
              <BtnFill href="/book-ai-audit/">Book an AI Business Audit →</BtnFill>
            </div>
          </div>
        </Section>
      </main>
    </>
  );
}

// ── Local UI primitives ─────────────────────────────────────────

function Ticks({ items, twoCol = false }: { items: string[]; twoCol?: boolean }) {
  return (
    <ul
      className={
        twoCol
          ? "mt-[34px] grid max-w-[680px] list-none gap-3 sm:grid-cols-2 sm:gap-x-[34px]"
          : "mt-[34px] grid max-w-[640px] list-none gap-3"
      }
    >
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3 text-[15px] text-[var(--color-w70)]">
          <span className="mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full bg-[var(--color-accent)]" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function CtaRow({ children }: { children: React.ReactNode }) {
  return <div className="mt-10 flex flex-wrap gap-[14px]">{children}</div>;
}

function BtnFill({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-[7px] bg-[var(--color-fg)] px-6 py-3.5 text-[15px] font-semibold text-black transition-transform duration-300 hover:-translate-y-0.5"
    >
      {children}
    </Link>
  );
}

function BtnLine({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-[7px] border border-[var(--color-w30)] px-6 py-3.5 text-[15px] font-semibold text-[var(--color-fg)] transition-colors duration-300 hover:border-[var(--color-fg)] hover:bg-[var(--color-w10)]"
    >
      {children}
    </Link>
  );
}

function Footnote({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-9 font-mono text-[12px] tracking-[0.04em] text-[var(--color-w30)]">{children}</p>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="bg-[var(--color-bg)] px-6 py-32 lg:px-12 lg:py-40">{children}</section>;
}

function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={`eyebrow ${className ?? ""}`}>{children}</span>;
}

function H2({
  children,
  className,
  ...rest
}: { children: React.ReactNode; className?: string; [k: string]: unknown }) {
  return (
    <h2
      className={`text-[clamp(32px,5vw,56px)] font-extrabold leading-[1.05] tracking-[-0.03em] ${className ?? ""}`}
      {...rest}
    >
      {children}
    </h2>
  );
}

function Body({
  children,
  className,
  ...rest
}: { children: React.ReactNode; className?: string; [k: string]: unknown }) {
  return (
    <p
      className={`mt-[18px] text-[16px] leading-[1.65] text-[var(--color-w70)] ${className ?? ""}`}
      {...rest}
    >
      {children}
    </p>
  );
}
