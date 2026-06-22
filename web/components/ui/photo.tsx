import Image from "next/image";
import { cn } from "@/lib/cn";

type PhotoProps = {
  src: string;
  alt: string;
  className?: string; // give it an aspect ratio, e.g. "aspect-[4/5]"
  dark?: boolean; // treatment for dark sections (mood grade + bottom gradient)
  priority?: boolean;
};

// Interim stock photography (web/public/photos/*) — swap with real WA job shots
// by dropping files into that folder and updating the src. next/image optimises
// the local files; no remote config needed.
export function Photo({ src, alt, className, dark = false, priority }: PhotoProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border",
        dark ? "border-[var(--color-border)]" : "border-[var(--color-line-ink)]",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 1024px) 48vw, 100vw"
        className={cn("object-cover", dark && "grayscale contrast-[1.02] brightness-[0.92]")}
      />
      {dark ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(155deg, transparent 35%, rgba(10,10,10,0.55))" }}
        />
      ) : null}
    </div>
  );
}
