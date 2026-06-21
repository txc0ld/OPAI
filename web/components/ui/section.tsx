import { cn } from "@/lib/cn";

type Tone = "dark" | "void" | "paper" | "paper-warm";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: "section" | "div" | "footer";
  id?: string;
  tone?: Tone;
};

// Dark tones carry the grain overlay; paper tones stay clean.
const TONE: Record<Tone, string> = {
  dark: "grain bg-[var(--color-surface)] text-[var(--color-fg)]",
  void: "grain bg-[var(--color-void)] text-[var(--color-fg)]",
  paper: "bg-[var(--color-paper)] text-[var(--color-ink)]",
  "paper-warm": "bg-[var(--color-paper-warm)] text-[var(--color-ink)]",
};

export function Section({
  children,
  className,
  containerClassName,
  as: Tag = "section",
  id,
  tone = "dark",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative px-6 py-[var(--section-pad-y-mobile)] lg:px-12 lg:py-[var(--section-pad-y)]",
        TONE[tone],
        className,
      )}
    >
      <div className={cn("relative z-[1] mx-auto w-full max-w-[var(--container-max)]", containerClassName)}>
        {children}
      </div>
    </Tag>
  );
}
