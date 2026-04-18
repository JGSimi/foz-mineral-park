import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  tone?: "light" | "dark";
}

export function Logo({ className, tone = "light" }: LogoProps) {
  const ink = tone === "light" ? "text-foreground" : "text-pearl-100";
  const accent = "text-champagne-400";
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="size-10 shrink-0 drop-shadow-[0_4px_14px_rgba(200,147,71,0.35)]"
      >
        <defs>
          <linearGradient id="logo-imperial" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#cc8fc8" />
            <stop offset="55%" stopColor="#733b71" />
            <stop offset="100%" stopColor="#2a1c2e" />
          </linearGradient>
          <linearGradient id="logo-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f4ead1" />
            <stop offset="50%" stopColor="#c89347" />
            <stop offset="100%" stopColor="#6c4120" />
          </linearGradient>
        </defs>
        <polygon
          points="20,3 34,12 34,28 20,37 6,28 6,12"
          fill="url(#logo-imperial)"
          stroke="url(#logo-gold)"
          strokeWidth="0.7"
        />
        <polyline
          points="20,3 20,37"
          stroke="#fff"
          strokeOpacity="0.35"
          strokeWidth="0.6"
          fill="none"
        />
        <polyline
          points="6,12 34,28"
          stroke="#fff"
          strokeOpacity="0.22"
          strokeWidth="0.6"
          fill="none"
        />
        <polyline
          points="34,12 6,28"
          stroke="#fff"
          strokeOpacity="0.22"
          strokeWidth="0.6"
          fill="none"
        />
        <circle cx="20" cy="20" r="1.6" fill="#f4ead1" opacity="0.85" />
      </svg>
      <span className={cn("flex flex-col leading-tight", ink)}>
        <span className="font-display text-[1.05rem] font-medium tracking-tight">
          Foz Mineral
        </span>
        <span
          className={cn(
            "-mt-0.5 text-[0.65rem] font-medium uppercase tracking-[0.32em]",
            accent,
          )}
        >
          Park · Foz do Iguaçu
        </span>
      </span>
    </span>
  );
}
