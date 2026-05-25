import Image from "next/image";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
};

/**
 * OperateAI brand mark. Source is web/public/opailogoblk.png — a 1536x1024
 * raster containing the "OPAi" wordmark with the "AUTOMATE · DELEGATE ·
 * ELEVATE" tagline beneath. next/image handles optimization/format.
 */
export function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/opailogoblk.png"
      alt="OperateAI"
      width={1536}
      height={1024}
      priority
      sizes="(min-width: 1024px) 90px, 72px"
      className={cn("h-12 w-auto select-none lg:h-14", className)}
    />
  );
}
