import { ButtonLink } from "@/components/ui/button-link";
import { CHECK_CTA } from "@/lib/nav";

type CheckButtonProps = {
  label?: string;
  variant?: "solid" | "ghost";
  tone?: "dark" | "light";
  className?: string;
};

// Canonical CTA to the free check. Thin wrapper over ButtonLink.
export function CheckButton({
  label = "See what AI says about you",
  variant = "solid",
  tone = "dark",
  className,
}: CheckButtonProps) {
  return <ButtonLink href={CHECK_CTA.href} label={label} variant={variant} tone={tone} className={className} />;
}
