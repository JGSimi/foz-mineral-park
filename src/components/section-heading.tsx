import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
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
            "inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em]",
            tone === "light" ? "text-amethyst-700" : "text-citrine-300",
          )}
        >
          <span
            className={cn(
              "inline-block h-px w-8",
              tone === "light" ? "bg-amethyst-500" : "bg-citrine-400",
            )}
          />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-balance text-3xl sm:text-4xl md:text-5xl",
          tone === "light" ? "text-foreground" : "text-white",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-pretty text-base sm:text-lg leading-relaxed",
            tone === "light" ? "text-quartz-600" : "text-quartz-200",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
