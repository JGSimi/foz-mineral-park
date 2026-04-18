import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  tone?: "light" | "dark";
}

export function Logo({ className, tone = "light" }: LogoProps) {
  const ink = tone === "light" ? "text-foreground" : "text-white";
  const accent = "text-amethyst-500";
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="size-9 shrink-0"
      >
        <defs>
          <linearGradient id="logo-amethyst" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c6a5ff" />
            <stop offset="55%" stopColor="#8b52f0" />
            <stop offset="100%" stopColor="#452073" />
          </linearGradient>
        </defs>
        <polygon
          points="20,3 34,12 34,28 20,37 6,28 6,12"
          fill="url(#logo-amethyst)"
        />
        <polyline
          points="20,3 20,37"
          stroke="#fff"
          strokeOpacity="0.35"
          strokeWidth="0.8"
          fill="none"
        />
        <polyline
          points="6,12 34,28"
          stroke="#fff"
          strokeOpacity="0.25"
          strokeWidth="0.8"
          fill="none"
        />
        <polyline
          points="34,12 6,28"
          stroke="#fff"
          strokeOpacity="0.25"
          strokeWidth="0.8"
          fill="none"
        />
      </svg>
      <span className={cn("flex flex-col leading-tight", ink)}>
        <span className="font-display text-base font-medium tracking-tight">
          Foz Mineral
        </span>
        <span
          className={cn(
            "-mt-0.5 text-[0.7rem] uppercase tracking-[0.25em]",
            accent,
          )}
        >
          Park
        </span>
      </span>
    </span>
  );
}
