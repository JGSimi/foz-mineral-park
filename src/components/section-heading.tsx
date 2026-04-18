import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl space-y-4",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "inline-flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.28em]",
            tone === "light" ? "text-champagne-700" : "text-champagne-300",
          )}
        >
          <span
            className={cn(
              "inline-block h-px w-9",
              tone === "light"
                ? "bg-gradient-to-r from-transparent via-champagne-500 to-transparent"
                : "bg-gradient-to-r from-transparent via-champagne-300 to-transparent",
            )}
          />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-balance font-display text-3xl sm:text-4xl md:text-5xl",
          tone === "light" ? "text-obsidian-900" : "text-pearl-100",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-pretty text-base sm:text-lg leading-relaxed",
            tone === "light" ? "text-pearl-700" : "text-pearl-200/85",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
