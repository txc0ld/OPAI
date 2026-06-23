import { Hero } from "@/components/home/hero";
import { TheShift } from "@/components/home/the-shift";
import { WhyTradies } from "@/components/home/why-tradies";
import { CheckCta } from "@/components/home/check-cta";
import { HowItWorksGrid } from "@/components/home/how-it-works-grid";
import { Credibility } from "@/components/home/credibility";
import { Forward } from "@/components/home/forward";
import { LatestArticles } from "@/components/home/latest-articles";
import { FinalCta } from "@/components/home/final-cta";
import { Faq } from "@/components/faq";
import { JsonLd } from "@/components/json-ld";
import { buildLocalBusiness, buildWebPage, wrapGraph } from "@/lib/schema";
import { BUSINESS } from "@/lib/business";

export default function HomePage() {
  return (
    <>
      <JsonLd
        schema={wrapGraph([
          buildWebPage({ url: `${BUSINESS.url}/`, title: "OperateAI", description: BUSINESS.description }),
          buildLocalBusiness(),
        ])}
      />
      <Hero />
      <TheShift />
      <WhyTradies />
      <CheckCta />
      <HowItWorksGrid />
      <Credibility />
      <Forward />
      <LatestArticles />
      <Faq
        tone="paper"
        title="Common questions"
        items={[
          {
            question: "What's SEO, in plain English?",
            answer:
              "SEO is Search Engine Optimisation. It's the old game of getting your business to show up when someone Googles a local business, then letting them pick from the list. Still worth doing, but it's not the whole story anymore.",
          },
          {
            question: "And what's AEO?",
            answer:
              "AEO is Answer Engine Optimisation. Same idea, but for AI. Instead of getting you onto a list, it's about getting ChatGPT and Google's AI to actually name you when someone asks for a good local business. The AI only picks two or three, so being one it names is the new goal.",
          },
          {
            question: "Is this just SEO with a new name?",
            answer:
              "No. SEO put you on a list and let the customer choose. AI doesn't show a list, it names two or three businesses. The job is being one it trusts enough to name.",
          },
          {
            question: "Do I even need a website?",
            answer:
              "It helps, but your Google Business Profile does most of the heavy lifting. If your site exists, the key is plain-text services, prices and suburbs that AI can actually read.",
          },
          {
            question: "How much does it cost?",
            answer:
              "The check is free. If you want it sorted for you, it's a fixed-price setup, no big retainer to start, and you'll know the price before anything happens.",
          },
          {
            question: "How long until it makes a difference?",
            answer:
              "The profile and review fixes start working within weeks as AI re-reads your details. It's not instant, but it compounds.",
          },
          {
            question: "I'm flat out running the business. Can you just handle it?",
            answer:
              "Yes. That's the done-for-you option: profile rebuilt, site made AI-readable, reviews system set up, so you show up without losing weekends to it.",
          },
          {
            question: "Will AI really send me customers?",
            answer:
              "It already recommends local businesses by name today, and it's moving toward booking them. Being on that shortlist is the whole game.",
          },
        ]}
      />
      <FinalCta />
    </>
  );
}
