import { cn } from "@/lib/utils";

type Accent = "amethyst" | "citrine" | "quartz" | "imperial" | "champagne" | "pearl";

const palettes: Record<
  Accent,
  { top: string; mid: string; bottom: string; shine: string; bg: string }
> = {
  // Aliases antigos mapeados para paleta nova
  amethyst: {
    top: "#e1b9de",
    mid: "#733b71",
    bottom: "#170e1a",
    shine: "#f9f2f8",
    bg: "#2a1c2e",
  },
  imperial: {
    top: "#e1b9de",
    mid: "#733b71",
    bottom: "#170e1a",
    shine: "#f9f2f8",
    bg: "#2a1c2e",
  },
  citrine: {
    top: "#f4ead1",
    mid: "#c89347",
    bottom: "#4a2d18",
    shine: "#fbf6ed",
    bg: "#2c1b10",
  },
  champagne: {
    top: "#f4ead1",
    mid: "#c89347",
    bottom: "#4a2d18",
    shine: "#fbf6ed",
    bg: "#2c1b10",
  },
  quartz: {
    top: "#ece3d2",
    mid: "#9f8f73",
    bottom: "#1d1a14",
    shine: "#faf6ef",
    bg: "#0a0910",
  },
  pearl: {
    top: "#ece3d2",
    mid: "#9f8f73",
    bottom: "#1d1a14",
    shine: "#faf6ef",
    bg: "#0a0910",
  },
};

interface GemIllustrationProps {
  accent?: Accent;
  className?: string;
  title?: string;
}

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
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.bg} stopOpacity="0.55" />
          <stop offset="100%" stopColor="#050508" />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="50%" cy="30%" r="65%">
          <stop offset="0%" stopColor={p.shine} stopOpacity="0.55" />
          <stop offset="100%" stopColor={p.shine} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`face-${id}-a`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.top} />
          <stop offset="100%" stopColor={p.mid} />
        </linearGradient>
        <linearGradient id={`face-${id}-b`} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.mid} />
          <stop offset="100%" stopColor={p.bottom} />
        </linearGradient>
        <linearGradient id={`face-${id}-c`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.mid} stopOpacity="0.9" />
          <stop offset="100%" stopColor={p.bottom} />
        </linearGradient>
        <linearGradient id={`gold-edge-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4ead1" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#915a25" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <rect width="400" height="500" fill={`url(#bg-${id})`} />
      <circle cx="200" cy="190" r="240" fill={`url(#glow-${id})`} />

      {/* Gema principal */}
      <g transform="translate(200 260)">
        <polygon
          points="-112,-62 -62,-142 62,-142 112,-62 0,142"
          fill={`url(#face-${id}-a)`}
        />
        <polygon
          points="0,142 112,-62 62,-142 0,-90"
          fill={`url(#face-${id}-b)`}
          opacity="0.88"
        />
        <polygon
          points="-112,-62 -62,-142 0,-90 0,142"
          fill={`url(#face-${id}-c)`}
          opacity="0.68"
        />
        {/* Filetes dourados nas arestas — "lapidação" */}
        <polyline
          points="-62,-142 0,-90 62,-142"
          fill="none"
          stroke={`url(#gold-edge-${id})`}
          strokeWidth="1.2"
        />
        <polyline
          points="-112,-62 0,-90 112,-62"
          fill="none"
          stroke={`url(#gold-edge-${id})`}
          strokeWidth="1.2"
        />
        <polyline
          points="0,-90 0,142"
          fill="none"
          stroke={p.shine}
          strokeOpacity="0.35"
          strokeWidth="0.8"
        />
        {/* Pequena luz central */}
        <circle cx="0" cy="-60" r="3" fill={p.shine} opacity="0.9" />
      </g>

      {/* Cristais satélites */}
      <g opacity="0.55">
        <polygon
          points="58,420 82,378 112,394 102,440 76,446"
          fill={`url(#face-${id}-a)`}
        />
        <polygon
          points="298,438 326,400 352,420 340,462 314,466"
          fill={`url(#face-${id}-b)`}
        />
        <polygon
          points="28,118 56,88 82,114 70,150 40,150"
          fill={`url(#face-${id}-c)`}
        />
      </g>

      {/* Partículas de ouro flutuando */}
      <g fill="#f4ead1">
        <circle cx="84" cy="64" r="1.4" opacity="0.9" />
        <circle cx="340" cy="108" r="1" opacity="0.7" />
        <circle cx="72" cy="210" r="0.9" opacity="0.55" />
        <circle cx="330" cy="320" r="1.2" opacity="0.75" />
        <circle cx="148" cy="70" r="0.8" opacity="0.4" />
      </g>
    </svg>
  );
}
