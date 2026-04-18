import { cn } from "@/lib/utils";

type Accent = "amethyst" | "citrine" | "quartz";

const palettes: Record<Accent, { top: string; mid: string; bottom: string; shine: string }> = {
  amethyst: {
    top: "#dfccff",
    mid: "#8b52f0",
    bottom: "#2e1750",
    shine: "#f0e6ff",
  },
  citrine: {
    top: "#ffe299",
    mid: "#ffb030",
    bottom: "#954d0c",
    shine: "#fff9ec",
  },
  quartz: {
    top: "#e4ded4",
    mid: "#a79b86",
    bottom: "#3f392e",
    shine: "#faf9f7",
  },
};

interface GemIllustrationProps {
  accent?: Accent;
  className?: string;
  title?: string;
}

export function GemIllustration({
  accent = "amethyst",
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
          <stop offset="0%" stopColor={p.bottom} stopOpacity="0.6" />
          <stop offset="100%" stopColor={p.bottom} />
        </linearGradient>
        <radialGradient id={`glow-${id}`} cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor={p.shine} stopOpacity="0.45" />
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
      </defs>

      <rect width="400" height="500" fill={`url(#bg-${id})`} />
      <circle cx="200" cy="190" r="220" fill={`url(#glow-${id})`} />

      <g transform="translate(200 260)">
        <polygon
          points="-110,-60 -60,-140 60,-140 110,-60 0,140"
          fill={`url(#face-${id}-a)`}
        />
        <polygon
          points="0,140 110,-60 60,-140 0,-90"
          fill={`url(#face-${id}-b)`}
          opacity="0.85"
        />
        <polygon
          points="-110,-60 -60,-140 0,-90 0,140"
          fill={`url(#face-${id}-c)`}
          opacity="0.65"
        />
        <polyline
          points="-60,-140 0,-90 60,-140"
          fill="none"
          stroke={p.shine}
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        <polyline
          points="-110,-60 0,-90 110,-60"
          fill="none"
          stroke={p.shine}
          strokeOpacity="0.35"
          strokeWidth="1"
        />
        <polyline
          points="0,-90 0,140"
          fill="none"
          stroke={p.shine}
          strokeOpacity="0.25"
          strokeWidth="1"
        />
      </g>

      {/* Cristais secundários */}
      <g opacity="0.6">
        <polygon
          points="60,420 80,380 110,395 100,440 75,445"
          fill={`url(#face-${id}-a)`}
        />
        <polygon
          points="300,440 325,400 350,420 340,460 315,465"
          fill={`url(#face-${id}-b)`}
        />
        <polygon
          points="30,120 55,90 80,115 70,150 40,150"
          fill={`url(#face-${id}-c)`}
        />
      </g>
    </svg>
  );
}
