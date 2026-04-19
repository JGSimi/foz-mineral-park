import { cn } from "@/lib/utils";

/**
 * Pedra bruta — silhueta irregular, cinza-marrom, sem facetas.
 * Existe pra esconder o cristal atrás dela até o usuário interagir.
 */
export function RockIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 500"
      aria-hidden="true"
      className={cn("block h-full w-full", className)}
    >
      <defs>
        <radialGradient id="rock-bg" cx="50%" cy="42%" r="62%">
          <stop offset="0%" stopColor="#2a2520" />
          <stop offset="60%" stopColor="#14110e" />
          <stop offset="100%" stopColor="#050508" />
        </radialGradient>
        <linearGradient id="rock-body-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4d453c" />
          <stop offset="55%" stopColor="#2b2620" />
          <stop offset="100%" stopColor="#0f0c09" />
        </linearGradient>
        <linearGradient id="rock-body-b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a5148" />
          <stop offset="100%" stopColor="#1a1612" />
        </linearGradient>
        <linearGradient id="rock-body-c" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d3730" />
          <stop offset="100%" stopColor="#0d0a07" />
        </linearGradient>
        <filter id="rock-noise" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            seed="7"
          />
          <feColorMatrix
            values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0   0 0 0 0.18 0"
          />
          <feComposite in2="SourceGraphic" operator="in" />
        </filter>
        {/* Sugestão de brilho interno — convida à interação */}
        <radialGradient id="rock-hint" cx="65%" cy="40%" r="18%">
          <stop offset="0%" stopColor="#c89347" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#c89347" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="500" height="500" fill="url(#rock-bg)" />

      {/* Silhueta irregular principal */}
      <g transform="translate(250 255)">
        <polygon
          points="-150,-20 -128,-110 -68,-168 18,-180 110,-152 160,-72 172,38 138,130 58,180 -40,182 -128,142 -168,60"
          fill="url(#rock-body-a)"
        />
        {/* Face escura direita */}
        <polygon
          points="18,-180 110,-152 160,-72 172,38 138,130 58,180 18,120 38,10 18,-180"
          fill="url(#rock-body-c)"
          opacity="0.85"
        />
        {/* Face iluminada superior */}
        <polygon
          points="-150,-20 -128,-110 -68,-168 18,-180 -12,-90 -70,-40 -130,-10"
          fill="url(#rock-body-b)"
          opacity="0.75"
        />
        {/* Rachaduras / fissuras */}
        <g
          stroke="#1a1612"
          strokeWidth="1.4"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        >
          <path d="M -80 -120 L -40 -60 L 10 -20 L -20 40 L 50 90" />
          <path d="M 100 -130 L 60 -60 L 90 10 L 40 70" />
          <path d="M -120 30 L -60 10 L 0 50 L -30 120" />
          <path d="M 120 -20 L 160 40 L 100 100 L 130 160" />
        </g>
        {/* Grãos / pontilhado */}
        <g fill="#2a2520">
          <circle cx="-60" cy="-40" r="2" />
          <circle cx="30" cy="-100" r="1.5" opacity="0.7" />
          <circle cx="80" cy="-20" r="2.5" />
          <circle cx="-30" cy="80" r="1.8" opacity="0.6" />
          <circle cx="110" cy="60" r="2" />
          <circle cx="-100" cy="20" r="1.2" opacity="0.5" />
          <circle cx="60" cy="140" r="1.6" />
        </g>
        {/* Pequeno brilho dourado insinuando cristal dentro */}
        <circle cx="40" cy="-30" r="60" fill="url(#rock-hint)" />
        <circle cx="40" cy="-30" r="2" fill="#f4ead1" opacity="0.65" />
      </g>

      {/* Grain overlay pra realismo */}
      <rect
        width="500"
        height="500"
        filter="url(#rock-noise)"
        opacity="0.6"
      />
    </svg>
  );
}
