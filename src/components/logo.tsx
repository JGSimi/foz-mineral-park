import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  tone?: "light" | "dark";
}

/**
 * Marca refinada — corte trilliant hexagonal, rotação sutil de -6°,
 * filete dourado em todo o perímetro. Wordmark com "Mineral" em italic
 * gilded e etiqueta "Park · Foz do Iguaçu" em champagne.
 */
export function Logo({ className, tone = "light" }: LogoProps) {
  const ink = tone === "light" ? "text-foreground" : "text-pearl-100";
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <svg
        viewBox="0 0 64 64"
        aria-hidden="true"
        className="logo-glow size-10 shrink-0"
      >
        <defs>
          <linearGradient id="logo-core" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#e1b9de" />
            <stop offset="28%" stopColor="#b267ad" />
            <stop offset="62%" stopColor="#553056" />
            <stop offset="100%" stopColor="#170e1a" />
          </linearGradient>
          <linearGradient id="logo-shadow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3d2840" />
            <stop offset="100%" stopColor="#0a0910" />
          </linearGradient>
          <linearGradient id="logo-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f0deee" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#b267ad" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="logo-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f4ead1" />
            <stop offset="45%" stopColor="#dbb46e" />
            <stop offset="100%" stopColor="#6c4120" />
          </linearGradient>
        </defs>
        <g transform="translate(32 32) rotate(-6) translate(-32 -32)">
          <path
            d="M32 6 L52 22 L46 52 L32 58 L18 52 L12 22 Z"
            fill="url(#logo-core)"
          />
          <path
            d="M32 6 L52 22 L46 52 L32 58 Z"
            fill="url(#logo-shadow)"
            opacity="0.55"
          />
          <path
            d="M32 6 L52 22 L32 26 L12 22 Z"
            fill="url(#logo-light)"
            opacity="0.75"
          />
          <g
            stroke="#f4ead1"
            strokeOpacity="0.22"
            strokeWidth="0.4"
            fill="none"
            strokeLinejoin="round"
          >
            <path d="M32 6 L32 58" />
            <path d="M12 22 L32 26 L52 22" />
            <path d="M32 26 L18 52" />
            <path d="M32 26 L46 52" />
          </g>
          <path
            d="M32 6 L52 22 L46 52 L32 58 L18 52 L12 22 Z"
            fill="none"
            stroke="url(#logo-gold)"
            strokeWidth="0.7"
            strokeLinejoin="round"
          />
          <circle cx="28" cy="16" r="0.7" fill="#f4ead1" opacity="0.9" />
        </g>
      </svg>
      <span className={cn("flex flex-col leading-[1.02]", ink)}>
        <span className="font-display text-[1.05rem] font-normal tracking-[-0.015em]">
          Foz <em className="text-gilded not-italic font-display italic">Mineral</em>
        </span>
        <span className="mt-[3px] text-[0.6rem] font-medium uppercase tracking-[0.4em] text-champagne-400">
          Park · Foz do Iguaçu
        </span>
      </span>
    </span>
  );
}
