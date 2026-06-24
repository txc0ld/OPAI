import Image from "next/image";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
};

/**
 * OperateAI logo: the °OA mark (public/LOGOMAIN.png) + the wordmark. Used
 * site-wide (header, footer). The wordmark text carries the accessible name,
 * so the mark itself is decorative.
 */
export function Logo({ className }: LogoProps) {
  return (
    <span className={cn("inline-flex select-none items-center gap-2.5", className)}>
      <Image
        src="/LOGOMAIN.png"
        alt=""
        aria-hidden
        width={28}
        height={28}
        className="h-7 w-7 rounded-lg"
        priority
      />
      <span className="text-[18px] font-extrabold tracking-[-0.02em]">
        OperateAI<span className="text-[var(--color-signal)]">.</span>
      </span>
    </span>
  );
}
