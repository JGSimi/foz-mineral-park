import { cn } from "@/lib/utils";

type Accent =
  | "amethyst"
  | "citrine"
  | "quartz"
  | "imperial"
  | "champagne"
  | "pearl";

type Palette = {
  bg0: string;
  bg1: string;
  glowStop: string;
  f1Start: string;
  f1Mid: string;
  f1End: string;
  f2Start: string;
  f2End: string;
  f3Start: string;
  f3End: string;
  strokeLight: string;
  highlight: string;
  spark: string;
};

const palettes: Record<Accent, Palette> = {
  amethyst: {
    bg0: "#432362",
    bg1: "#1e1030",
    glowStop: "#f0deee",
    f1Start: "#ecdcf1",
    f1Mid: "#9660b4",
    f1End: "#301948",
    f2Start: "#432362",
    f2End: "#0f0619",
    f3Start: "#74429b",
    f3End: "#1e1030",
    strokeLight: "#f4ead1",
    highlight: "#f4ead1",
    spark: "#f4ead1",
  },
  imperial: {
    bg0: "#432362",
    bg1: "#1e1030",
    glowStop: "#f0deee",
    f1Start: "#ecdcf1",
    f1Mid: "#9660b4",
    f1End: "#301948",
    f2Start: "#432362",
    f2End: "#0f0619",
    f3Start: "#74429b",
    f3End: "#1e1030",
    strokeLight: "#f4ead1",
    highlight: "#f4ead1",
    spark: "#f4ead1",
  },
  citrine: {
    bg0: "#61401b",
    bg1: "#2a1a0c",
    glowStop: "#f5ecd3",
    f1Start: "#fcf8ef",
    f1Mid: "#dcb570",
    f1End: "#61401b",
    f2Start: "#865a23",
    f2End: "#2a1a0c",
    f3Start: "#c89547",
    f3End: "#3e2913",
    strokeLight: "#fcf8ef",
    highlight: "#fcf8ef",
    spark: "#fcf8ef",
  },
  champagne: {
    bg0: "#61401b",
    bg1: "#2a1a0c",
    glowStop: "#f5ecd3",
    f1Start: "#fcf8ef",
    f1Mid: "#dcb570",
    f1End: "#61401b",
    f2Start: "#865a23",
    f2End: "#2a1a0c",
    f3Start: "#c89547",
    f3End: "#3e2913",
    strokeLight: "#fcf8ef",
    highlight: "#fcf8ef",
    spark: "#fcf8ef",
  },
  quartz: {
    bg0: "#46545e",
    bg1: "#1a2026",
    glowStop: "#e8ecef",
    f1Start: "#f5f7f8",
    f1Mid: "#98a5ac",
    f1End: "#2e3840",
    f2Start: "#3f4a53",
    f2End: "#0d1116",
    f3Start: "#6b7a83",
    f3End: "#141a1f",
    strokeLight: "#f5f7f8",
    highlight: "#f5f7f8",
    spark: "#f5f7f8",
  },
  pearl: {
    bg0: "#46545e",
    bg1: "#1a2026",
    glowStop: "#e8ecef",
    f1Start: "#f5f7f8",
    f1Mid: "#98a5ac",
    f1End: "#2e3840",
    f2Start: "#3f4a53",
    f2End: "#0d1116",
    f3Start: "#6b7a83",
    f3End: "#141a1f",
    strokeLight: "#f5f7f8",
    highlight: "#f5f7f8",
    spark: "#f5f7f8",
  },
};

interface GemIllustrationProps {
  accent?: Accent;
  className?: string;
  title?: string;
}

/**
 * Ilustração procedural de gema trilliant lapidada. Três variantes
 * de paleta (ametista / citrino / quartzo), facetas com filetes
 * dourados, satélites menores e partículas de luz.
 */
export function GemIllustration({
  accent = "imperial",
  className,
  title = "Ilustração de gema",
}: GemIllustrationProps) {
  const id = accent;
  const p = palettes[accent];

  return (
    <svg
      viewBox="0 0 400 500"
      role="img"
      aria-label={title}
      className={cn("block h-full w-full", className)}
    >
      <defs>
        <radialGradient id={`bg-${id}`} cx="35%" cy="25%" r="90%">
          <stop offset="0%" stopColor={p.bg0} stopOpacity="0.78" />
          <stop offset="55%" stopColor={p.bg1} />
          <stop offset="100%" stopColor="#050508" />
        </radialGradient>
        <radialGradient id={`glow-${id}`} cx="30%" cy="20%" r="65%">
          <stop offset="0%" stopColor={p.glowStop} stopOpacity="0.5" />
          <stop offset="100%" stopColor={p.glowStop} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`f1-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.f1Start} />
          <stop offset="50%" stopColor={p.f1Mid} />
          <stop offset="100%" stopColor={p.f1End} />
        </linearGradient>
        <linearGradient id={`f2-${id}`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.f2Start} />
          <stop offset="100%" stopColor={p.f2End} />
        </linearGradient>
        <linearGradient id={`f3-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.f3Start} stopOpacity="0.95" />
          <stop offset="100%" stopColor={p.f3End} />
        </linearGradient>
        <linearGradient id={`gold-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4ead1" />
          <stop offset="100%" stopColor="#865a23" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <rect width="400" height="500" fill={`url(#bg-${id})`} />
      <circle cx="200" cy="160" r="270" fill={`url(#glow-${id})`} />

      {/* Satélite esquerdo */}
      <g opacity="0.72" transform="translate(120 360) scale(0.85)">
        <polygon
          points="-54,-22 -30,-70 30,-70 54,-22 0,80"
          fill={`url(#f2-${id})`}
        />
        <polygon
          points="0,80 54,-22 30,-70 0,-46"
          fill={`url(#f3-${id})`}
          opacity="0.55"
        />
      </g>
      {/* Satélite direito */}
      <g opacity="0.68" transform="translate(305 380) scale(0.75)">
        <polygon
          points="-54,-22 -30,-70 30,-70 54,-22 0,80"
          fill={`url(#f2-${id})`}
        />
        <polygon
          points="-54,-22 -30,-70 0,-46 0,80"
          fill={`url(#f3-${id})`}
          opacity="0.5"
        />
      </g>

      {/* Gema principal */}
      <g transform="translate(205 255)">
        <polygon
          points="-112,-62 -62,-158 62,-158 112,-62 0,162"
          fill={`url(#f1-${id})`}
        />
        <polygon
          points="0,162 112,-62 62,-158 0,-100"
          fill={`url(#f2-${id})`}
          opacity="0.88"
        />
        <polygon
          points="-112,-62 -62,-158 0,-100 0,162"
          fill={`url(#f3-${id})`}
          opacity="0.75"
        />
        <g
          stroke={p.strokeLight}
          strokeOpacity="0.32"
          strokeWidth="0.8"
          fill="none"
          strokeLinejoin="round"
        >
          <polyline points="-62,-158 0,-100 62,-158" />
          <polyline points="-112,-62 0,-100 112,-62" />
          <polyline points="-112,-62 -62,-158" />
          <polyline points="62,-158 112,-62" />
          <polyline points="0,-100 0,162" />
        </g>
        <polyline
          points="-62,-158 0,-100 62,-158"
          fill="none"
          stroke={`url(#gold-${id})`}
          strokeWidth="1.3"
        />
        <polyline
          points="-112,-62 0,-100 112,-62"
          fill="none"
          stroke={`url(#gold-${id})`}
          strokeWidth="1.3"
        />
        <circle cx="-30" cy="-80" r="2.4" fill={p.highlight} opacity="0.95" />
        <circle cx="40" cy="20" r="1.4" fill={p.glowStop} opacity="0.7" />
      </g>

      {/* Partículas de luz */}
      <g fill={p.spark}>
        <circle cx="72" cy="60" r="1.2" opacity="0.75" />
        <circle cx="348" cy="98" r="0.9" opacity="0.6" />
        <circle cx="64" cy="230" r="0.8" opacity="0.5" />
        <circle cx="340" cy="260" r="1.1" opacity="0.7" />
        <circle cx="200" cy="440" r="0.7" opacity="0.4" />
      </g>
    </svg>
  );
}
