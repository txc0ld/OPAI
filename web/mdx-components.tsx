import type { MDXComponents } from "mdx/types";
import { Prose } from "@/components/prose";
import { GbpCard, PhoneAnswer, ReviewStrip, MissedCall, Callout } from "@/components/mock/examples";

export function useMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    wrapper: ({ children }) => <Prose>{children}</Prose>,
    // Illustrative example components, usable directly in any .mdx article.
    GbpCard,
    PhoneAnswer,
    ReviewStrip,
    MissedCall,
    Callout,
    ...components,
  };
}
