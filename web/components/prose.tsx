import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ProseProps = {
  children: ReactNode;
  className?: string;
};

// Premium long-form reading on paper (ink on light). Big comfortable body,
// drop-cap lead, lime list markers, pull-quote blockquotes. Selectors only
// target real prose elements (p/h2/ul/li/blockquote/...), so mockup components
// dropped into the MDX (built from div/span) are left untouched.
export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "w-full text-[1.15rem] leading-[1.8] text-[var(--color-ink)]",
        "[&>p]:my-[1.35em] [&>p:first-child]:mt-0",
        // Lead paragraph + drop cap
        "[&>p:first-of-type]:text-[1.3rem] [&>p:first-of-type]:leading-[1.6] [&>p:first-of-type]:text-[var(--color-ink-soft)]",
        "[&>p:first-of-type::first-letter]:float-left [&>p:first-of-type::first-letter]:mr-[0.08em] [&>p:first-of-type::first-letter]:mt-[0.04em] [&>p:first-of-type::first-letter]:text-[3.4em] [&>p:first-of-type::first-letter]:font-extrabold [&>p:first-of-type::first-letter]:leading-[0.74] [&>p:first-of-type::first-letter]:text-[var(--color-ink)]",
        "[&_a]:font-medium [&_a]:text-[var(--color-ink)] [&_a]:underline [&_a]:underline-offset-[3px] [&_a]:decoration-[var(--color-signal-dim)] [&_a]:decoration-2 [&_a:hover]:decoration-[var(--color-ink)]",
        "[&_strong]:font-bold [&_strong]:text-[var(--color-ink)]",
        "[&_em]:italic",
        "[&_h2]:font-extrabold [&_h2]:tracking-[-0.025em] [&_h2]:text-[clamp(1.6rem,3vw,2.25rem)] [&_h2]:leading-[1.1] [&_h2]:mt-16 [&_h2]:mb-5 [&_h2]:text-[var(--color-ink)] [&_h2]:scroll-mt-24",
        "[&_h3]:font-bold [&_h3]:tracking-[-0.015em] [&_h3]:text-[1.4rem] [&_h3]:leading-[1.2] [&_h3]:mt-12 [&_h3]:mb-4 [&_h3]:text-[var(--color-ink)] [&_h3]:scroll-mt-24",
        "[&_ul]:my-[1.4em] [&_ul]:grid [&_ul]:gap-3 [&_ul]:pl-0 [&_ul]:list-none",
        "[&_ul_li]:relative [&_ul_li]:pl-7",
        "[&_ul_li::before]:absolute [&_ul_li::before]:left-0 [&_ul_li::before]:top-[0.62em] [&_ul_li::before]:h-2 [&_ul_li::before]:w-2 [&_ul_li::before]:rounded-[2px] [&_ul_li::before]:bg-[var(--color-signal-dim)] [&_ul_li::before]:content-['']",
        "[&_ol]:my-[1.4em] [&_ol]:pl-6 [&_ol]:list-decimal [&_ol]:marker:font-bold [&_ol]:marker:text-[var(--color-ink-soft)]",
        "[&_li]:leading-[1.65] [&_li]:text-[var(--color-ink)]",
        "[&_hr]:my-14 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-[var(--color-line-ink)]",
        "[&_code]:font-mono [&_code]:text-[0.86em] [&_code]:bg-[color-mix(in_oklab,var(--color-ink)_8%,transparent)] [&_code]:px-[0.35em] [&_code]:py-[0.1em] [&_code]:rounded-[4px]",
        // Pull-quote
        "[&_blockquote]:my-12 [&_blockquote]:border-l-4 [&_blockquote]:border-[var(--color-signal)] [&_blockquote]:pl-6 [&_blockquote]:text-[1.65rem] [&_blockquote]:font-extrabold [&_blockquote]:leading-[1.2] [&_blockquote]:tracking-[-0.02em] [&_blockquote]:text-[var(--color-ink)]",
        "[&_blockquote_p]:my-0 [&_blockquote_p]:text-[1.65rem] [&_blockquote_p]:text-[var(--color-ink)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
