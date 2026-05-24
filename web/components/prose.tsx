import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ProseProps = {
  children: ReactNode;
  className?: string;
};

export function Prose({ children, className }: ProseProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[var(--measure)]",
        "text-[1.0625rem] leading-[1.7] text-[var(--color-w70)]",
        "[&_p]:my-[1.25em]",
        "[&_p:first-child]:mt-0 [&_p:last-child]:mb-0",
        "[&_a]:text-[var(--color-fg)] [&_a]:underline [&_a]:underline-offset-[3px] [&_a]:decoration-[1px] [&_a]:decoration-[var(--color-w30)] [&_a:hover]:decoration-[var(--color-accent)]",
        "[&_strong]:font-semibold [&_strong]:text-[var(--color-fg)]",
        "[&_em]:italic",
        "[&_h1]:font-bold [&_h1]:tracking-[-0.03em] [&_h1]:text-[clamp(2rem,4.5vw,3rem)] [&_h1]:leading-[1.05] [&_h1]:mt-0 [&_h1]:mb-8 [&_h1]:text-[var(--color-fg)]",
        "[&_h2]:font-bold [&_h2]:tracking-[-0.02em] [&_h2]:text-[clamp(1.375rem,2.4vw,1.75rem)] [&_h2]:leading-[1.15] [&_h2]:mt-14 [&_h2]:mb-5 [&_h2]:text-[var(--color-fg)]",
        "[&_h3]:font-semibold [&_h3]:tracking-[-0.01em] [&_h3]:text-[1.25rem] [&_h3]:leading-[1.25] [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:text-[var(--color-fg)]",
        "[&_h4]:font-semibold [&_h4]:text-[1.0625rem] [&_h4]:leading-[1.3] [&_h4]:mt-8 [&_h4]:mb-3 [&_h4]:text-[var(--color-fg)]",
        "[&_ul]:my-[1.25em] [&_ul]:pl-6 [&_ul]:list-disc [&_ul]:marker:text-[var(--color-accent)]",
        "[&_ol]:my-[1.25em] [&_ol]:pl-6 [&_ol]:list-decimal [&_ol]:marker:text-[var(--color-accent)]",
        "[&_li]:my-[0.5em] [&_li]:pl-1",
        "[&_hr]:my-12 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-[var(--color-w10)]",
        "[&_code]:font-mono [&_code]:text-[0.875em] [&_code]:bg-[var(--color-w10)] [&_code]:px-[0.35em] [&_code]:py-[0.1em] [&_code]:rounded-[3px] [&_code]:text-[var(--color-fg)]",
        "[&_blockquote]:my-10 [&_blockquote]:pl-6 [&_blockquote]:border-l [&_blockquote]:border-[var(--color-accent)] [&_blockquote]:italic [&_blockquote]:text-[var(--color-fg)]",
        "[&_blockquote_p]:my-2",
        "[&_.footnote]:font-mono [&_.footnote]:text-[0.8125rem] [&_.footnote]:leading-[1.5] [&_.footnote]:text-[var(--color-w30)] [&_.footnote]:mt-12 [&_.footnote]:pt-6 [&_.footnote]:border-t [&_.footnote]:border-[var(--color-w10)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
