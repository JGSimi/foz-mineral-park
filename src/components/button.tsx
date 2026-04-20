import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden rounded-full text-sm font-medium tracking-wide transition-all duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "btn-primary-surface active:scale-[0.985]",
        // gold tem uma renderização dedicada (crystal SVG) — o CVA
        // abaixo fica como fallback inócuo.
        gold: "",
        outline:
          "border border-pearl-400 bg-pearl-50/80 text-obsidian-900 backdrop-blur hover:border-champagne-500 hover:bg-pearl-50 hover:text-obsidian-950 active:scale-[0.985]",
        ghost: "text-obsidian-900 hover:bg-pearl-200 active:scale-[0.985]",
        link: "text-imperial-700 underline-offset-4 hover:underline",
        onDark:
          "border border-champagne-300/40 bg-white/5 text-pearl-100 backdrop-blur hover:border-champagne-300/80 hover:bg-white/10 active:scale-[0.985]",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-14 px-8 text-[0.95rem]",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

type AsChildProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

// =============================================================================
// Gold variant — cristal bruto de ametista (design "Botao Cristal" — variação C2)
// =============================================================================

const CRYSTAL_W = 440;
const CRYSTAL_H = 108;
const CRYSTAL_OUTER =
  "12,46 48,14 180,6 280,10 400,16 428,54 388,96 240,102 130,100 28,88";
const CRYSTAL_RIM =
  "8,46 46,10 178,2 280,6 402,12 432,54 390,100 240,106 130,104 26,92";
const CRYSTAL_TOP_FACET = "48,14 180,6 280,10 260,40 140,44 80,36";
const CRYSTAL_BOT_FACET = "28,88 130,100 240,102 388,96 300,78 140,74";
const CRYSTAL_EDGE = "80,36 140,44 260,40 300,78 140,74";
const CRYSTAL_SHINE_A = "70,24 130,22 110,54 55,50";
const CRYSTAL_SHINE_B = "350,30 380,34 370,70 335,60";

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
  shadow: string;
  textShadow: string;
  translateY: number;
  shineOpacity: number;
  rim: string | null;
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
    shadow:
      "0 18px 30px rgba(60,15,110,0.5), 0 4px 8px rgba(40,5,80,0.35)",
    textShadow:
      "0 1px 2px rgba(15,0,35,0.9), 0 0 14px rgba(200,140,240,0.3)",
    translateY: 0,
    shineOpacity: 0.85,
    rim: null,
  },
  hover: {
    main: { a: "#d8a0f0", b: "#7838b8", c: "#2e0850" },
    topLite: { a: "#f0d4ff", b: "#9858d8" },
    botDark: { a: "#4a1880", b: "#1c0538" },
    shine: "rgba(255,250,255,0.95)",
    stroke: "rgba(20,5,50,0.75)",
    innerStroke: "rgba(20,0,40,0.4)",
    text: "#ffffff",
    shadow:
      "0 22px 40px rgba(80,20,140,0.58), 0 6px 14px rgba(50,10,100,0.4), 0 0 40px rgba(160,90,220,0.35)",
    textShadow:
      "0 1px 2px rgba(15,0,35,0.9), 0 0 18px rgba(220,160,255,0.55)",
    translateY: -2,
    shineOpacity: 1,
    rim: null,
  },
  pressed: {
    main: { a: "#a060d0", b: "#4a1a80", c: "#180528" },
    topLite: { a: "#b878d8", b: "#5a2090" },
    botDark: { a: "#2a0a48", b: "#0c0218" },
    shine: "rgba(255,240,255,0.4)",
    stroke: "rgba(10,0,25,0.85)",
    innerStroke: "rgba(15,0,35,0.55)",
    text: "#e8d0ff",
    shadow:
      "0 6px 14px rgba(40,10,80,0.5), 0 2px 4px rgba(30,5,60,0.35)",
    textShadow: "0 1px 2px rgba(10,0,25,0.95)",
    translateY: 3,
    shineOpacity: 0.45,
    rim: null,
  },
  disabled: {
    main: { a: "#b0a0c0", b: "#7060a0", c: "#3a3048" },
    topLite: { a: "#c8c0d4", b: "#8878a0" },
    botDark: { a: "#4a4058", b: "#28202e" },
    shine: "rgba(255,250,255,0.25)",
    stroke: "rgba(30,20,40,0.5)",
    innerStroke: "rgba(30,20,40,0.3)",
    text: "rgba(240,230,250,0.55)",
    shadow: "0 6px 10px rgba(40,30,60,0.2)",
    textShadow: "none",
    translateY: 0,
    shineOpacity: 0.35,
    rim: null,
  },
  focus: {
    main: { a: "#c088e8", b: "#6428a8", c: "#200638" },
    topLite: { a: "#e0b8f0", b: "#8045c0" },
    botDark: { a: "#3a1066", b: "#140425" },
    shine: "rgba(255,240,255,0.7)",
    stroke: "rgba(15,0,35,0.75)",
    innerStroke: "rgba(20,0,40,0.4)",
    text: "#f8e8ff",
    shadow:
      "0 18px 30px rgba(60,15,110,0.5), 0 4px 8px rgba(40,5,80,0.35)",
    textShadow:
      "0 1px 2px rgba(15,0,35,0.9), 0 0 14px rgba(200,140,240,0.3)",
    translateY: 0,
    shineOpacity: 0.85,
    rim: "#c078e8",
  },
};

const CRYSTAL_SCALE: Record<"sm" | "md" | "lg" | "icon", number> = {
  sm: 0.48,
  md: 0.68,
  lg: 0.88,
  icon: 0.48,
};

/** Quebra a string "a, b" em filter: drop-shadow(a) drop-shadow(b). */
function buildShadowFilter(shadow: string): string {
  // As vírgulas dentro de rgba() não podem ser splitadas ingenuamente.
  const parts: string[] = [];
  let depth = 0;
  let buf = "";
  for (const ch of shadow) {
    if (ch === "(") depth++;
    else if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      parts.push(buf.trim());
      buf = "";
    } else {
      buf += ch;
    }
  }
  if (buf.trim()) parts.push(buf.trim());
  return parts.map((p) => `drop-shadow(${p})`).join(" ");
}

type CrystalBodyProps = {
  palette: CrystalPalette;
  scale: number;
  uid: string;
  children: React.ReactNode;
};

function CrystalBody({ palette, scale, uid, children }: CrystalBodyProps) {
  const w = CRYSTAL_W * scale;
  const h = CRYSTAL_H * scale;
  const fontSize = Math.max(11, Math.round(19 * scale));
  const iconGap = Math.max(6, Math.round(14 * scale));
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
          <linearGradient id={`${uid}-main`} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor={palette.main.a} />
            <stop offset="40%" stopColor={palette.main.b} />
            <stop offset="100%" stopColor={palette.main.c} />
          </linearGradient>
          <linearGradient id={`${uid}-top`} x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={palette.topLite.a} />
            <stop offset="100%" stopColor={palette.topLite.b} />
          </linearGradient>
          <linearGradient id={`${uid}-bot`} x1="0%" y1="0%" x2="30%" y2="100%">
            <stop offset="0%" stopColor={palette.botDark.a} />
            <stop offset="100%" stopColor={palette.botDark.b} />
          </linearGradient>
          <linearGradient id={`${uid}-shine`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={palette.shine} />
            <stop offset="100%" stopColor="rgba(255,240,255,0)" />
          </linearGradient>
        </defs>

        {palette.rim && (
          <polygon
            points={CRYSTAL_RIM}
            fill="none"
            stroke={palette.rim}
            strokeWidth={2}
            opacity={0.8}
            strokeDasharray="4 3"
          />
        )}

        <polygon points={CRYSTAL_OUTER} fill={`url(#${uid}-main)`} />
        <polygon
          points={CRYSTAL_TOP_FACET}
          fill={`url(#${uid}-top)`}
          opacity={0.95}
          stroke={palette.innerStroke}
          strokeWidth={0.8}
        />
        <polygon
          points={CRYSTAL_BOT_FACET}
          fill={`url(#${uid}-bot)`}
          opacity={0.75}
          stroke={palette.innerStroke}
          strokeWidth={0.8}
        />
        <polyline
          points={CRYSTAL_EDGE}
          fill="none"
          stroke="rgba(20,0,40,0.5)"
          strokeWidth={0.9}
        />
        <polygon
          points={CRYSTAL_SHINE_A}
          fill={`url(#${uid}-shine)`}
          opacity={palette.shineOpacity}
        />
        <polygon
          points={CRYSTAL_SHINE_B}
          fill={`url(#${uid}-shine)`}
          opacity={palette.shineOpacity * 0.5}
        />
        <polygon
          points={CRYSTAL_OUTER}
          fill="none"
          stroke={palette.stroke}
          strokeWidth={1.3}
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
          transition: "color 180ms ease",
          whiteSpace: "nowrap",
          lineHeight: 1,
        }}
      >
        {children}
      </span>
    </>
  );
}

type GoldButtonProps = {
  asChild?: boolean;
  size?: "sm" | "md" | "lg" | "icon";
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "size" | "children" | "disabled"
>;

function GoldButton({
  asChild = false,
  size = "md",
  disabled = false,
  className,
  children,
  ...rest
}: GoldButtonProps) {
  const uid = React.useId();
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

  const shadowFilter = buildShadowFilter(palette.shadow);

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
    filter: shadowFilter,
    transform: `translateY(${palette.translateY}px)`,
    transition:
      "transform 180ms cubic-bezier(.2,.8,.2,1), filter 220ms ease",
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
      <CrystalBody palette={palette} scale={scale} uid={uid}>
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
      <CrystalBody palette={palette} scale={scale} uid={uid}>
        {children}
      </CrystalBody>
    </button>
  );
}

// =============================================================================

function Shine() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-[1100ms] ease-out group-hover/btn:translate-x-full"
    />
  );
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  if (variant === "gold") {
    return (
      <GoldButton
        asChild={asChild}
        size={size ?? "md"}
        disabled={props.disabled}
        className={className}
        {...props}
      >
        {children}
      </GoldButton>
    );
  }

  const showShine = variant === "onDark";
  const classes = cn(buttonVariants({ variant, size, className }));

  if (asChild && React.isValidElement<AsChildProps>(children)) {
    const child = children;
    return React.cloneElement(
      child,
      {
        className: cn(classes, child.props.className),
      } as AsChildProps,
      <>
        <span className="relative z-10 inline-flex items-center gap-2">
          {child.props.children}
        </span>
        {showShine && <Shine />}
      </>,
    );
  }

  return (
    <button className={classes} {...props}>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
      {showShine && <Shine />}
    </button>
  );
}

export { buttonVariants };
