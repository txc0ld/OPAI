import { cn } from "@/lib/cn";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  as?: "section" | "div" | "footer";
  id?: string;
};

export function Section({ children, className, containerClassName, as: Tag = "section", id }: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn("px-6 py-[var(--section-pad-y-mobile)] lg:px-12 lg:py-[var(--section-pad-y)]", className)}
    >
      <div className={cn("mx-auto w-full max-w-[var(--container-max)]", containerClassName)}>{children}</div>
    </Tag>
  );
}
