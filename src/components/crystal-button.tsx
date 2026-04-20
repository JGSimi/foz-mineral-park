"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Gold variant — cristal bruto de ametista (design "Botao Cristal"
 * variação C2 do handoff Claude Design). Polígono assimétrico de 10
 * vértices, 5 estados interativos (default/hover/pressed/focus/
 * disabled). Cada instância sorteia uma variação de forma seedada
 * pelo useId — todo botão na página parece um cristal único.
 */

// Tamanho do viewBox. Todas as posições são em coordenadas do viewBox.
const CRYSTAL_W = 440;
const CRYSTAL_H = 108;
const CENTER: Pt = [220, 54];

type Pt = [number, number];

// Âncoras canônicas do design C2. Cada botão desloca estes pontos
// um pouco, seedado pelo useId da instância.
const DEFAULT_ANCHORS = {
  // Outer (clockwise da ponta esquerda)
  lt: [12, 46] as Pt,
  l1: [48, 14] as Pt,
  l2: [180, 6] as Pt,
  r1: [280, 10] as Pt,
  r2: [400, 16] as Pt,
  rt: [428, 54] as Pt,
  br1: [388, 96] as Pt,
  bm: [240, 102] as Pt,
  bl2: [130, 100] as Pt,
  bl1: [28, 88] as Pt,
  // Top facet internals (onde a face superior encontra a inferior)
  ti_r: [260, 40] as Pt,
  ti_m: [140, 44] as Pt,
  ti_l: [80, 36] as Pt,
  // Bottom facet internals
  bi_r: [300, 78] as Pt,
  bi_m: [140, 74] as Pt,
  // Shine A (retângulo de luz à esquerda)
  sa1: [70, 24] as Pt,
  sa2: [130, 22] as Pt,
  sa3: [110, 54] as Pt,
  sa4: [55, 50] as Pt,
  // Shine B (retângulo de luz à direita)
  sb1: [350, 30] as Pt,
  sb2: [380, 34] as Pt,
  sb3: [370, 70] as Pt,
  sb4: [335, 60] as Pt,
};

type AnchorMap = typeof DEFAULT_ANCHORS;

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(a: number): () => number {
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildAnchors(seed: number): AnchorMap {
  const rand = mulberry32(seed);
  const j = (base: Pt, mag: number): Pt => [
    base[0] + (rand() - 0.5) * 2 * mag,
    base[1] + (rand() - 0.5) * 2 * mag,
  ];
  const BIG = 7; // outer — vértices do cristal (mais liberdade)
  const MED = 4; // facet internals — menos (ou quebra alinhamento)
  const SML = 2.5; // shine — quase nada
  return {
    lt: j(DEFAULT_ANCHORS.lt, BIG),
    l1: j(DEFAULT_ANCHORS.l1, BIG),
    l2: j(DEFAULT_ANCHORS.l2, BIG),
    r1: j(DEFAULT_ANCHORS.r1, BIG),
    r2: j(DEFAULT_ANCHORS.r2, BIG),
    rt: j(DEFAULT_ANCHORS.rt, BIG),
    br1: j(DEFAULT_ANCHORS.br1, BIG),
    bm: j(DEFAULT_ANCHORS.bm, BIG),
    bl2: j(DEFAULT_ANCHORS.bl2, BIG),
    bl1: j(DEFAULT_ANCHORS.bl1, BIG),
    ti_r: j(DEFAULT_ANCHORS.ti_r, MED),
    ti_m: j(DEFAULT_ANCHORS.ti_m, MED),
    ti_l: j(DEFAULT_ANCHORS.ti_l, MED),
    bi_r: j(DEFAULT_ANCHORS.bi_r, MED),
    bi_m: j(DEFAULT_ANCHORS.bi_m, MED),
    sa1: j(DEFAULT_ANCHORS.sa1, SML),
    sa2: j(DEFAULT_ANCHORS.sa2, SML),
    sa3: j(DEFAULT_ANCHORS.sa3, SML),
    sa4: j(DEFAULT_ANCHORS.sa4, SML),
    sb1: j(DEFAULT_ANCHORS.sb1, SML),
    sb2: j(DEFAULT_ANCHORS.sb2, SML),
    sb3: j(DEFAULT_ANCHORS.sb3, SML),
    sb4: j(DEFAULT_ANCHORS.sb4, SML),
  };
}

function inflate(p: Pt, factor: number): Pt {
  return [
    CENTER[0] + (p[0] - CENTER[0]) * factor,
    CENTER[1] + (p[1] - CENTER[1]) * factor,
  ];
}

function toPoints(...pts: Pt[]): string {
  return pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
}

// =============================================================================
// Paletas por estado — exatas do design C2.
// =============================================================================

type CrystalStateKey =
  | "default"
  | "hover"
  | "pressed"
  | "disabled"
  | "focus";

type CrystalPalette = {
  main: { a: string; b: string; c: string };
  topLite: { a: string; b: string };
  botDark: { a: string; b: string };
  shine: string;
  stroke: string;
  innerStroke: string;
  text: string;
  textShadow: string;
  translateY: number;
  shineOpacity: number;
  rim: string | null;
  // Drop-shadow principal (feDropShadow dentro do SVG)
  shadow: { dy: number; blur: number; color: string; opacity: number };
  // Shadow secundária opcional (glow/halo pro hover)
  shadow2?: { dy: number; blur: number; color: string; opacity: number };
};

const CRYSTAL_PALETTES: Record<CrystalStateKey, CrystalPalette> = {
  default: {
    main: { a: "#c088e8", b: "#6428a8", c: "#200638" },
    topLite: { a: "#e0b8f0", b: "#8045c0" },
    botDark: { a: "#3a1066", b: "#140425" },
    shine: "rgba(255,240,255,0.7)",
    stroke: "rgba(15,0,35,0.75)",
    innerStroke: "rgba(20,0,40,0.4)",
    text: "#f8e8ff",
    textShadow:
      "0 1px 2px rgba(15,0,35,0.9), 0 0 14px rgba(200,140,240,0.3)",
    translateY: 0,
    shineOpacity: 0.85,
    rim: null,
    shadow: { dy: 18, blur: 15, color: "rgb(60,15,110)", opacity: 0.5 },
  },
  hover: {
    main: { a: "#d8a0f0", b: "#7838b8", c: "#2e0850" },
    topLite: { a: "#f0d4ff", b: "#9858d8" },
    botDark: { a: "#4a1880", b: "#1c0538" },
    shine: "rgba(255,250,255,0.95)",
    stroke: "rgba(20,5,50,0.75)",
    innerStroke: "rgba(20,0,40,0.4)",
    text: "#ffffff",
    textShadow:
      "0 1px 2px rgba(15,0,35,0.9), 0 0 18px rgba(220,160,255,0.55)",
    translateY: -2,
    shineOpacity: 1,
    rim: null,
    shadow: { dy: 22, blur: 20, color: "rgb(80,20,140)", opacity: 0.58 },
    shadow2: { dy: 0, blur: 20, color: "rgb(160,90,220)", opacity: 0.35 },
  },
  pressed: {
    main: { a: "#a060d0", b: "#4a1a80", c: "#180528" },
    topLite: { a: "#b878d8", b: "#5a2090" },
    botDark: { a: "#2a0a48", b: "#0c0218" },
    shine: "rgba(255,240,255,0.4)",
    stroke: "rgba(10,0,25,0.85)",
    innerStroke: "rgba(15,0,35,0.55)",
    text: "#e8d0ff",
    textShadow: "0 1px 2px rgba(10,0,25,0.95)",
    translateY: 3,
    shineOpacity: 0.45,
    rim: null,
    shadow: { dy: 6, blur: 7, color: "rgb(40,10,80)", opacity: 0.5 },
  },
  disabled: {
    main: { a: "#b0a0c0", b: "#7060a0", c: "#3a3048" },
    topLite: { a: "#c8c0d4", b: "#8878a0" },
    botDark: { a: "#4a4058", b: "#28202e" },
    shine: "rgba(255,250,255,0.25)",
    stroke: "rgba(30,20,40,0.5)",
    innerStroke: "rgba(30,20,40,0.3)",
    text: "rgba(240,230,250,0.55)",
    textShadow: "none",
    translateY: 0,
    shineOpacity: 0.35,
    rim: null,
    shadow: { dy: 6, blur: 5, color: "rgb(40,30,60)", opacity: 0.2 },
  },
  focus: {
    main: { a: "#c088e8", b: "#6428a8", c: "#200638" },
    topLite: { a: "#e0b8f0", b: "#8045c0" },
    botDark: { a: "#3a1066", b: "#140425" },
    shine: "rgba(255,240,255,0.7)",
    stroke: "rgba(15,0,35,0.75)",
    innerStroke: "rgba(20,0,40,0.4)",
    text: "#f8e8ff",
    textShadow:
      "0 1px 2px rgba(15,0,35,0.9), 0 0 14px rgba(200,140,240,0.3)",
    translateY: 0,
    shineOpacity: 0.85,
    rim: "#c078e8",
    shadow: { dy: 18, blur: 15, color: "rgb(60,15,110)", opacity: 0.5 },
  },
};

const CRYSTAL_SCALE: Record<"sm" | "md" | "lg" | "icon", number> = {
  sm: 0.48,
  md: 0.68,
  lg: 0.88,
  icon: 0.48,
};

// =============================================================================

type AsChildProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

type CrystalBodyProps = {
  palette: CrystalPalette;
  scale: number;
  uid: string;
  anchors: AnchorMap;
  children: React.ReactNode;
};

function CrystalBody({
  palette,
  scale,
  uid,
  anchors,
  children,
}: CrystalBodyProps) {
  const w = CRYSTAL_W * scale;
  const h = CRYSTAL_H * scale;
  const fontSize = Math.max(11, Math.round(19 * scale));
  const iconGap = Math.max(6, Math.round(14 * scale));

  const a = anchors;
  const outerPts = toPoints(
    a.lt, a.l1, a.l2, a.r1, a.r2, a.rt, a.br1, a.bm, a.bl2, a.bl1,
  );
  const rimPts = toPoints(
    ...[a.lt, a.l1, a.l2, a.r1, a.r2, a.rt, a.br1, a.bm, a.bl2, a.bl1].map(
      (p) => inflate(p, 1.04),
    ),
  );
  const topFacetPts = toPoints(a.l1, a.l2, a.r1, a.ti_r, a.ti_m, a.ti_l);
  const botFacetPts = toPoints(
    a.bl1, a.bl2, a.bm, a.br1, a.bi_r, a.bi_m,
  );
  const edgePts = toPoints(a.ti_l, a.ti_m, a.ti_r, a.bi_r, a.bi_m);
  const shineAPts = toPoints(a.sa1, a.sa2, a.sa3, a.sa4);
  const shineBPts = toPoints(a.sb1, a.sb2, a.sb3, a.sb4);

  const shadowFilterId = `${uid}-sh`;

  // Transições comuns por tipo de elemento SVG — cor e opacidade
  // fazem crossfade suave entre paletas de estado. Sem isso, tudo
  // trocava em um frame quando o hover/active/focus virava true.
  const stopT: React.CSSProperties = {
    transition: "stop-color 260ms ease-out",
  };
  const polyT: React.CSSProperties = {
    transition:
      "fill 260ms ease-out, stroke 260ms ease-out, opacity 260ms ease-out",
  };
  const lineT: React.CSSProperties = {
    transition: "stroke 260ms ease-out",
  };
  const dropT: React.CSSProperties = {
    transition:
      "flood-color 260ms ease-out, flood-opacity 260ms ease-out",
  };

  return (
    <>
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${CRYSTAL_W} ${CRYSTAL_H}`}
        style={{
          position: "absolute",
          inset: 0,
          overflow: "visible",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <defs>
          {/* Sombra dentro do SVG — segue o alpha dos polígonos, não
              o rect do <button>. Resolve a "sombra quadrada" que
              aparecia quando o filter estava no elemento pai. */}
          <filter
            id={shadowFilterId}
            x="-30%"
            y="-30%"
            width="160%"
            height="180%"
            colorInterpolationFilters="sRGB"
          >
            <feDropShadow
              dx="0"
              dy={palette.shadow.dy}
              stdDeviation={palette.shadow.blur}
              floodColor={palette.shadow.color}
              floodOpacity={palette.shadow.opacity}
              style={dropT}
            />
            {palette.shadow2 && (
              <feDropShadow
                dx="0"
                dy={palette.shadow2.dy}
                stdDeviation={palette.shadow2.blur}
                floodColor={palette.shadow2.color}
                floodOpacity={palette.shadow2.opacity}
                style={dropT}
              />
            )}
          </filter>
          <linearGradient id={`${uid}-main`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={palette.main.a} style={stopT} />
            <stop offset="40%" stopColor={palette.main.b} style={stopT} />
            <stop offset="100%" stopColor={palette.main.c} style={stopT} />
          </linearGradient>
          <linearGradient id={`${uid}-top`} x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={palette.topLite.a} style={stopT} />
            <stop offset="100%" stopColor={palette.topLite.b} style={stopT} />
          </linearGradient>
          <linearGradient id={`${uid}-bot`} x1="0%" y1="0%" x2="30%" y2="100%">
            <stop offset="0%" stopColor={palette.botDark.a} style={stopT} />
            <stop offset="100%" stopColor={palette.botDark.b} style={stopT} />
          </linearGradient>
          <linearGradient id={`${uid}-shine`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.shine} style={stopT} />
            <stop offset="100%" stopColor="rgba(255,240,255,0)" />
          </linearGradient>
          {/* Gradient dourado idêntico ao do logo (champagne → ouro
              → bronze). Aplicado como stroke do contorno pra dar
              acabamento de bezel em joalheria. */}
          <linearGradient id={`${uid}-bezel`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4ead1" />
            <stop offset="45%" stopColor="#dbb46e" />
            <stop offset="100%" stopColor="#6c4120" />
          </linearGradient>
        </defs>

        {/* Sombra aplicada numa cópia invisível do contorno — pinta
            só a silhueta externa do cristal, sem o alpha das facetas. */}
        <polygon
          points={outerPts}
          fill="#000"
          filter={`url(#${shadowFilterId})`}
          style={{ opacity: 0 }}
        />

        {/* Anel de foco — offsetado do outer por inflate(1.04) */}
        {palette.rim && (
          <polygon
            points={rimPts}
            fill="none"
            stroke={palette.rim}
            strokeWidth={2}
            opacity={0.8}
            strokeDasharray="4 3"
          />
        )}

        {/* Corpo principal */}
        <polygon
          points={outerPts}
          fill={`url(#${uid}-main)`}
          style={polyT}
        />
        {/* Faceta superior clara */}
        <polygon
          points={topFacetPts}
          fill={`url(#${uid}-top)`}
          opacity={0.95}
          stroke={palette.innerStroke}
          strokeWidth={0.8}
          style={polyT}
        />
        {/* Faceta inferior escura */}
        <polygon
          points={botFacetPts}
          fill={`url(#${uid}-bot)`}
          opacity={0.75}
          stroke={palette.innerStroke}
          strokeWidth={0.8}
          style={polyT}
        />
        {/* Aresta central */}
        <polyline
          points={edgePts}
          fill="none"
          stroke="rgba(20,0,40,0.5)"
          strokeWidth={0.9}
          style={lineT}
        />
        {/* Highlights */}
        <polygon
          points={shineAPts}
          fill={`url(#${uid}-shine)`}
          opacity={palette.shineOpacity}
          style={polyT}
        />
        <polygon
          points={shineBPts}
          fill={`url(#${uid}-shine)`}
          opacity={palette.shineOpacity * 0.5}
          style={polyT}
        />
        {/* Bezel dourado — espelha o filete gold do logo (stroke com
            o mesmo gradient). Fica debaixo do contorno dark pra ele
            definir o limite interno sem cobrir o ouro visível. */}
        <polygon
          points={outerPts}
          fill="none"
          stroke={`url(#${uid}-bezel)`}
          strokeWidth={3}
          strokeLinejoin="round"
        />
        {/* Contorno interno escuro — mantém a silhueta crisp por
            dentro das facetas, sem apagar o bezel. */}
        <polygon
          points={outerPts}
          fill="none"
          stroke={palette.stroke}
          strokeWidth={0.9}
          style={polyT}
        />
      </svg>

      <span
        className="[&_svg]:!h-[1em] [&_svg]:!w-[1em]"
        style={{
          position: "relative",
          zIndex: 2,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: iconGap,
          fontSize,
          fontWeight: 500,
          letterSpacing: "0.3px",
          color: palette.text,
          textShadow: palette.textShadow,
          transition:
            "color 260ms ease-out, text-shadow 260ms ease-out",
          whiteSpace: "nowrap",
          lineHeight: 1,
        }}
      >
        {children}
      </span>
    </>
  );
}

export type CrystalButtonProps = {
  asChild?: boolean;
  size?: "sm" | "md" | "lg" | "icon";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size" | "children" | "disabled"
>;

export function CrystalButton({
  asChild = false,
  size = "md",
  disabled = false,
  className,
  children,
  ...rest
}: CrystalButtonProps) {
  const uid = React.useId();
  const anchors = React.useMemo(
    () => buildAnchors(hashString(uid)),
    [uid],
  );

  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  let stateKey: CrystalStateKey = "default";
  if (disabled) stateKey = "disabled";
  else if (active) stateKey = "pressed";
  else if (hover) stateKey = "hover";
  else if (focused) stateKey = "focus";

  const palette = CRYSTAL_PALETTES[stateKey];
  const scale = CRYSTAL_SCALE[size] ?? CRYSTAL_SCALE.md;
  const w = CRYSTAL_W * scale;
  const h = CRYSTAL_H * scale;

  const handlers = {
    onMouseEnter: () => {
      if (disabled) return;
      setHover(true);
    },
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => {
      if (disabled) return;
      setActive(true);
    },
    onMouseUp: () => setActive(false),
    onFocus: () => {
      if (disabled) return;
      setFocused(true);
    },
    onBlur: () => setFocused(false),
  };

  const baseStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: w,
    height: h,
    flexShrink: 0,
    border: "none",
    background: "transparent",
    padding: 0,
    cursor: disabled ? "not-allowed" : "pointer",
    fontFamily: 'var(--font-body), "Inter", system-ui, sans-serif',
    // Sombra agora está dentro do SVG (feDropShadow) — aqui só o lift/press
    transform: `translateY(${palette.translateY}px)`,
    // Overshoot suave no hover/active pra dar peso de cristal flutuando.
    transition: "transform 260ms cubic-bezier(.34,1.3,.64,1)",
    outline: "none",
    WebkitTapHighlightColor: "transparent",
    verticalAlign: "middle",
  };

  if (asChild && React.isValidElement<AsChildProps>(children)) {
    const child = children;
    const mergedStyle: React.CSSProperties = {
      ...baseStyle,
      ...(child.props.style ?? {}),
    };
    return React.cloneElement(
      child,
      {
        ...handlers,
        className: cn(className, child.props.className),
        style: mergedStyle,
        "aria-disabled": disabled || undefined,
      } as AsChildProps & Record<string, unknown>,
      <CrystalBody
        palette={palette}
        scale={scale}
        uid={uid}
        anchors={anchors}
      >
        {child.props.children}
      </CrystalBody>,
    );
  }

  return (
    <button
      type="button"
      {...rest}
      {...handlers}
      disabled={disabled}
      className={className}
      style={baseStyle}
    >
      <CrystalBody
        palette={palette}
        scale={scale}
        uid={uid}
        anchors={anchors}
      >
        {children}
      </CrystalBody>
    </button>
  );
}
