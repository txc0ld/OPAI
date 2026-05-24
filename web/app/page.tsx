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
    "Curious about AI in your business? OperateAI helps small and medium businesses try AI safely. From your first ChatGPT lesson to custom AI agents, automation, hosting and training.",
  alternates: { canonical: "/" },
};

const FAQS = [
  {
    question: "I have never used AI. Can you still help?",
    answer:
      "Yes. A lot of the businesses we work with have never used anything beyond a quick ChatGPT chat. We start in plain English, show you what AI is actually good at (and what it is not), and help you try it in low-risk ways before committing to anything bigger.",
  },
  {
    question: "Do we need technical staff to work with you?",
    answer:
      "No. About half our clients have no technical staff at all. For those teams we handle the technical side and focus on simple guidance, training and ready-to-use tools. If you do have developers or ops people in-house, we can also go deep on agent design, integrations and managed operations.",
  },
  {
    question: "What does an AI consultant actually do?",
    answer:
      "We help you work out where AI fits in your business, choose the right tools, set them up safely, build any custom helpers you need, and train your team to use them. The goal is plain: less manual work, faster responses, fewer dropped balls.",
  },
  {
    question: "Can you build custom AI agents for our business?",
    answer:
      "Yes. We build AI agents for customer support, admin, sales, internal knowledge, operations and onboarding. Each agent has a clear job, a fixed scope, and access only to the information it should see.",
  },
  {
    question: "Do you offer AI training in Perth?",
    answer:
      "Yes. We run AI training across Perth and Australia for owners, managers, staff, and technical teams. In person where it suits, or online.",
  },
  {
    question: "Do you host and manage AI agents?",
    answer:
      "Yes. Once an agent is built, we host it, watch it, keep its knowledge fresh, and fix it when something breaks. You get the benefit of automation without needing technical staff in-house.",
  },
  {
    question: "Is AI right for every part of a business?",
    answer:
      "No. AI is great at repetitive, information-heavy and customer-facing work. It is not great everywhere. A good audit shows where AI helps, where humans need to stay in the loop, and where automation would create more risk than it removes.",
  },
];

const SERVICES = [
  {
    n: "01",
    href: "/book-ai-audit/",
    title: "AI Business Audit",
    body: "A simple, structured look at your tools, your workflows, and where AI could actually help. You leave with a plain-English plan, not a slide deck.",
    cta: "Book an audit →",
  },
  {
    n: "02",
    href: "/ai-integration-services/",
    title: "AI Integration Services",
    body: "We plug AI into the tools you already use. Email, CRMs, customer support, admin, sales, reporting, internal knowledge. We focus on the parts of your day that take the longest.",
    cta: "View integration →",
  },
  {
    n: "03",
    href: "/ai-agents-for-business/",
    title: "Custom AI Agents",
    body: "An AI agent is a helper with one clear job. We build agents that answer customer questions, draft documents, qualify leads, summarise reports, or anything else that eats your team's time.",
    cta: "Explore agents →",
  },
  {
    n: "04",
    href: "/ai-agent-hosting/",
    title: "AI Agent Hosting & Management",
    body: "Once an AI is running in your business, somebody has to look after it. We do that. You get the benefit without the maintenance.",
    cta: "Managed hosting →",
  },
  {
    n: "05",
    href: "/ai-training-for-business/",
    title: "AI Training for Business",
    body: "Plain-English training for everyone on your team. Whether someone has never opened ChatGPT or they build agents already, we meet them where they are.",
    cta: "View training →",
  },
];

const USE_CASES = [
  "A customer support helper that knows your products and policies",
  "An internal assistant trained on your procedures and documents",
  "A sales helper that qualifies leads and drafts follow-ups",
  "Automatic drafting of emails, quotes and proposals",
  "Faster quoting, intake and admin",
  "Auto-summarised reports and meeting notes",
  "Staff training and onboarding help",
  "AI connected to your existing business tools",
  "Clear policies for how your team uses AI safely",
];

const STEPS = [
  { n: "01", title: "Audit", body: "We look at your business, your tools, the slow parts, and where AI could realistically help." },
  { n: "02", title: "Roadmap", body: "You get a clear plan, ranked by value, effort and risk. No jargon, no over-promises." },
  { n: "03", title: "Build", body: "We set up the tools, build any agents you need, and connect them to your systems." },
  { n: "04", title: "Train", body: "We train your team so the AI is actually used. Every level, beginner to advanced." },
  { n: "05", title: "Manage", body: "We host, watch, update and improve the AI for as long as you want us around." },
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
            title: "OperateAI. AI agents and automation for small businesses.",
            description:
              "OperateAI helps small and medium businesses try AI safely. From your first ChatGPT lesson to custom agents, automation, hosting and training.",
          }),
          buildLocalBusiness(),
          buildFaqPage(FAQS),
        ])}
      />

      <ParticleCanvas />

      {/* Stage 1: hero */}
      <StageShell stageId="stage-top" bodyId="body-top">
        <h1 className="sr-only">AI agents and automation for small businesses.</h1>
        <span className="eyebrow mb-[22px]">OperateAI · For small businesses</span>
        <p className="text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
          Curious about using AI in your business but not sure where to start? We help small and
          medium businesses try AI safely. Whether you have never used ChatGPT or you already build
          your own automations, we will help you find the AI that actually fits your work.
        </p>
        <Ticks
          items={[
            "Plain-English help for people new to AI",
            "Hands-on builds for technical teams",
            "AI that fits the tools you already use",
            "We run the technical side, so you do not have to",
            "Training that meets your team where they are",
          ]}
        />
        <CtaRow>
          <BtnFill href="/book-ai-audit/">Book an AI Business Audit →</BtnFill>
          <BtnLine href="/ai-integration-services/">Explore AI services</BtnLine>
        </CtaRow>
        <Footnote>Based in Perth, Western Australia. Working with businesses across Australia and online worldwide.</Footnote>
      </StageShell>

      {/* Stage 2: integration */}
      <StageShell stageId="stage-integration" bodyId="body-integration">
        <span className="eyebrow mb-[22px]">OperateAI · Service</span>
        <p className="text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
          AI is most useful when it fits the tools you already use. We plug AI into your email, your
          customer support, your sales process, your admin, your reports and the knowledge your team
          relies on every day.
        </p>
        <Ticks
          twoCol
          items={[
            "AI chat helpers",
            "Internal knowledge tools",
            "Customer support workflows",
            "Sales and lead qualification",
            "Document drafting",
            "Email and inbox helpers",
            "CRM and pipeline workflows",
            "Auto-summarised reports",
          ]}
        />
        <CtaRow>
          <BtnFill href="/book-ai-audit/">Book a chat →</BtnFill>
          <BtnLine href="/ai-agents-for-business/">Custom AI agents</BtnLine>
        </CtaRow>
        <Footnote>Useful systems, not gimmicks. A single workflow usually ships in 2 to 4 weeks.</Footnote>
      </StageShell>

      {/* Stage 3: hosting */}
      <StageShell stageId="stage-hosting" bodyId="body-hosting">
        <span className="eyebrow mb-[22px]">OperateAI · Service</span>
        <p className="text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
          An AI agent is only useful when it keeps working. We host it, watch it, keep its knowledge
          fresh and fix things when they break. You get the benefit, without needing technical staff
          in-house.
        </p>
        <Ticks
          twoCol
          items={[
            "Setup and deployment",
            "Hosting and access management",
            "Prompt and instruction upkeep",
            "Knowledge updates",
            "Workflow monitoring",
            "Performance reviews",
            "Security and access controls",
            "Usage reports",
          ]}
        />
        <CtaRow>
          <BtnFill href="/book-ai-audit/">See managed AI options →</BtnFill>
          <BtnLine href="/ai-integration-services/">AI integration</BtnLine>
        </CtaRow>
        <Footnote>Month-to-month after setup. Full handover on cancellation.</Footnote>
      </StageShell>

      {/* Stage 4: training */}
      <StageShell stageId="stage-training" bodyId="body-training">
        <span className="eyebrow mb-[22px]">OperateAI · Service</span>
        <p className="text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
          AI training should be practical, not buzzword soup. We teach owners, managers and staff
          how to actually use AI tools. Whether your team has never opened ChatGPT, or they build
          agents already, we meet them where they are. In person in Perth, or online from anywhere.
        </p>
        <Ticks
          twoCol
          items={[
            "AI basics for business",
            "Prompting that actually works",
            "AI for admin, sales and ops",
            "AI-assisted writing and docs",
            "Designing AI workflows",
            "Agents and automation",
            "Safe use of business data",
            "Team-wide AI policies",
          ]}
        />
        <CtaRow>
          <BtnFill href="/book-ai-audit/">Book AI training →</BtnFill>
          <BtnLine href="/ai-agents-for-business/">Custom AI agents</BtnLine>
        </CtaRow>
        <Footnote>Three levels: beginner, intermediate, advanced. Built around your team and tools.</Footnote>
      </StageShell>

      {/* Stage 5: industries */}
      <StageShell stageId="stage-industries" bodyId="body-industries">
        <span className="eyebrow mb-[22px]">OperateAI · Industries</span>
        <p className="text-[clamp(17px,2vw,21px)] leading-[1.55] text-[var(--color-w70)]">
          We tailor AI for the sectors most Australian small and medium businesses sit in. Do not
          see yours? Book an audit and we will work out whether AI fits your situation.
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
        <Footnote>Built around your sector&apos;s admin, compliance and customer workflows.</Footnote>
      </StageShell>

      {/* Main content sections */}
      <main className="relative z-10 bg-[var(--color-bg)]">
        {/* Problem */}
        <Section>
          <div className="mx-auto w-full max-w-[820px]">
            <Eyebrow className="reveal">The problem</Eyebrow>
            <H2 className="reveal mt-[26px]" data-d="1">
              Most businesses know AI matters. Few know where to start.
            </H2>
            <Body className="reveal" data-d="2">
              AI is everywhere. Most small and medium businesses are still trying to work out what
              to actually do with it. Maybe your team uses ChatGPT now and then. Maybe you have
              signed up for a few automation tools. You probably suspect AI could save time and
              cut admin, but without a clear plan it just becomes one more thing nobody really uses.
            </Body>
            <Body className="reveal" data-d="2">
              OperateAI helps you move from poking at AI to actually getting value from it.
            </Body>
          </div>
        </Section>

        {/* Services */}
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
              Built for first-timers and technical teams alike
            </H2>
            <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-12">
              <div className="reveal rounded-xl border border-[var(--color-w10)] p-[34px]" data-d="1">
                <h3 className="mb-[14px] text-[22px] font-bold tracking-[-0.02em]">If you are new to AI</h3>
                <p className="text-[15px] leading-[1.6] text-[var(--color-w70)]">
                  We start in plain English. We explain what AI is good at and what it is not. We
                  show you safe ways to try it. We help you build the habit before you build the
                  systems.
                </p>
              </div>
              <div className="reveal rounded-xl border border-[var(--color-w10)] p-[34px]" data-d="2">
                <h3 className="mb-[14px] text-[22px] font-bold tracking-[-0.02em]">If you already build with AI</h3>
                <p className="text-[15px] leading-[1.6] text-[var(--color-w70)]">
                  We go deep on agent design, prompting, integrations, hosting and ongoing tuning.
                  We can work alongside your team or take whole workflows off their plate.
                </p>
              </div>
            </div>
            <Body className="reveal" data-d="3">
              You do not need to know exactly what you want before talking to us. Step one is just
              working out where AI could be useful for you.
            </Body>
          </div>
        </Section>

        {/* Use cases */}
        <Section>
          <div className="mx-auto w-full max-w-[1200px]">
            <Eyebrow className="reveal">Use cases</Eyebrow>
            <H2 className="reveal mt-[26px]" data-d="1">
              Common ways small and medium businesses use AI
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

        {/* How we work: light section */}
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
              The fastest way to start is with a focused AI audit. We look at your current tools,
              your workflows and your real opportunities. Then we tell you where AI could help, and
              where it is not worth the effort yet. You leave with a clear plan, not vague ideas.
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
              Start with an AI Business Audit. We will work out the best opportunities, the risks
              to avoid, and what to do first.
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

// Local UI primitives

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
