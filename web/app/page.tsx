import { Hero } from "@/components/home/hero";
import { TheShift } from "@/components/home/the-shift";
import { WhyTradies } from "@/components/home/why-tradies";
import { CheckCta } from "@/components/home/check-cta";
import { HowItWorksGrid } from "@/components/home/how-it-works-grid";
import { Credibility } from "@/components/home/credibility";
import { Forward } from "@/components/home/forward";
import { LatestArticles } from "@/components/home/latest-articles";
import { FinalCta } from "@/components/home/final-cta";
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
      <FinalCta />
    </>
  );
}
