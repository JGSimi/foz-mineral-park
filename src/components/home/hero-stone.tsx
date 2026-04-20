"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";
import { reveal } from "@/lib/reveal-images";
import type { Dictionary } from "@/i18n/dictionaries/pt";

/**
 * Camada de partículas atrás da pedra — poeira de cristal/ouro
 * flutuando pra reforçar o efeito "levitando".
 *
 * O array é derivado de um PRNG com seed fixa por índice. Mesmos
 * valores no server e no client, zero flicker de hidratação.
 * `prefers-reduced-motion` desliga a camada inteira.
 */
const PARTICLE_COUNT = 26;

function StoneParticles({ reduced }: { reduced: boolean | null }) {
  const particles = useMemo(() => {
    const rand = (i: number, salt: number) => {
      const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const tintRoll = rand(i, 8);
      // Mistura de tons: a maioria champagne (poeira dourada),
      // algumas imperial (hint amethyst), poucas pearl (brilho).
      const tint =
        tintRoll < 0.55
          ? "bg-champagne-300"
          : tintRoll < 0.85
            ? "bg-imperial-300"
            : "bg-pearl-50";
      return {
        x: rand(i, 1) * 120 - 10, // -10% → 110%
        startY: 55 + rand(i, 2) * 55, // 55% → 110%
        travelY: 340 + rand(i, 3) * 260, // sobe 340–600 px
        sway: (rand(i, 4) - 0.5) * 36, // ±18 px lateral
        size: 1.5 + rand(i, 5) * 4.2, // 1.5–5.7 px
        duration: 7 + rand(i, 6) * 9, // 7–16 s
        delay: -rand(i, 7) * 10, // já no meio do ciclo no load
        blur: rand(i, 9) * 1.3, // 0–1.3 px blur (profundidade)
        maxOpacity: 0.3 + rand(i, 10) * 0.55, // 0.3–0.85
        tint,
      };
    });
  }, []);

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-[1] overflow-visible"
    >
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className={cn("absolute block rounded-full", p.tint)}
          style={{
            left: `${p.x}%`,
            top: `${p.startY}%`,
            width: p.size,
            height: p.size,
            filter: p.blur ? `blur(${p.blur.toFixed(2)}px)` : undefined,
          }}
          animate={{
            y: [0, -p.travelY],
            x: [0, p.sway, -p.sway * 0.6, 0],
            opacity: [0, p.maxOpacity, p.maxOpacity * 0.7, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.2, 0.7, 1],
          }}
        />
      ))}
    </div>
  );
}

/**
 * Stone interativa pro hero.
 *
 * A pedra base fica sempre visível; uma máscara SVG revela o cristal
 * dentro, com borda orgânica via feTurbulence + feDisplacementMap.
 * No hover segue o cursor; no toque (mobile) abre/fecha no centro.
 *
 * Camadas de transform (fora pra dentro):
 * - `float-hero` (CSS keyframe) — a flutuação constante.
 * - motion.div com x/y — parallax sutil seguindo o cursor.
 *
 * Não tem zoom de scroll aqui: o stone já é a estrela do hero, não
 * precisa de transição cinematográfica — esta ficou pra seções internas.
 */
export function HeroStone({
  dict,
  className,
}: {
  dict: Dictionary;
  className?: string;
}) {
  const r = dict.reveal;
  const reduced = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const HOVER_R = 22;
  const TAP_R = 30;
  const FULL_R = 140;

  const x = useMotionValue(50);
  const y = useMotionValue(56);
  const radius = useMotionValue(0);
  const sx = useSpring(x, { damping: 28, stiffness: 240, mass: 0.45 });
  const sy = useSpring(y, { damping: 28, stiffness: 240, mass: 0.45 });
  const sr = useSpring(radius, { damping: 30, stiffness: 180, mass: 0.7 });

  const parallaxX = useTransform(sx, [0, 100], [-8, 8]);
  const parallaxY = useTransform(sy, [0, 125], [-5, 5]);
  const smoothPX = useSpring(parallaxX, {
    damping: 22,
    stiffness: 140,
    mass: 0.6,
  });
  const smoothPY = useSpring(parallaxY, {
    damping: 22,
    stiffness: 140,
    mass: 0.6,
  });

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const apply = () => setIsTouch(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Peek automático após o hero entrar na tela — ensina a interação
  // sem bloquear o LCP com uma animação imediata.
  useEffect(() => {
    if (reduced) {
      radius.set(FULL_R);
      return;
    }
    const t1 = window.setTimeout(() => {
      if (!hasInteracted) radius.set(HOVER_R + 6);
    }, 1400);
    const t2 = window.setTimeout(() => {
      if (!hasInteracted) radius.set(0);
    }, 2900);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [hasInteracted, radius, reduced]);

  const onEnter = () => {
    if (isTouch || reduced) return;
    setHasInteracted(true);
    radius.set(HOVER_R);
  };
  const onLeave = () => {
    if (isTouch || reduced) return;
    radius.set(0);
    x.set(50);
    y.set(56);
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width) * 100);
    y.set(((e.clientY - rect.top) / rect.height) * 125);
  };
  const toggle = () => {
    if (!isTouch) return;
    setHasInteracted(true);
    const isOpen = radius.get() > 5;
    radius.set(isOpen ? 0 : TAP_R);
    x.set(50);
    y.set(56);
  };

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[4/5] w-[min(80vw,420px)] sm:w-[min(46vw,480px)]",
        className,
      )}
    >
      {/* Halo ambiente atrás da pedra — leve pra funcionar sobre pearl claro */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[48px] bg-gradient-to-br from-imperial-400/18 via-transparent to-champagne-400/14 blur-3xl"
      />
      {/* Sombra oval no chão — mais suave contra o claro */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-10 bottom-[-6%] -z-10 h-10 rounded-[50%] bg-obsidian-950 opacity-30 blur-2xl",
          !reduced && "animate-[float-shadow_9s_ease-in-out_infinite]",
        )}
      />

      {/* Poeira de cristal flutuando ao redor */}
      <StoneParticles reduced={reduced} />

      <div
        ref={wrapperRef}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        onPointerMove={onMove}
        onClick={toggle}
        role={isTouch ? "button" : undefined}
        aria-label={r.hintOpened}
        tabIndex={isTouch ? 0 : -1}
        onKeyDown={(e) => {
          if (!isTouch) return;
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
          }
        }}
        className={cn(
          "relative h-full w-full select-none",
          !reduced && "float-hero",
          isTouch && "cursor-pointer",
        )}
      >
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { x: smoothPX, y: smoothPY }}
        >
          <div className="pointer-events-none absolute inset-0">
            <Image
              src={reveal.closed}
              alt={r.hintClosed}
              fill
              sizes="(max-width: 768px) 80vw, 480px"
              placeholder="blur"
              className="object-contain"
              priority
            />
          </div>

          <svg
            viewBox="0 0 100 125"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <filter
                id="fmp-liquid"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
                colorInterpolationFilters="sRGB"
              >
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.018 0.022"
                  numOctaves="2"
                  seed="3"
                  result="turb"
                >
                  {!reduced && (
                    <animate
                      attributeName="seed"
                      values="3;5;7;5;3"
                      dur="12s"
                      repeatCount="indefinite"
                      calcMode="linear"
                    />
                  )}
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="turb"
                  scale="12"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>

              <mask
                id="fmp-reveal-mask"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="100"
                height="125"
              >
                <rect x="0" y="0" width="100" height="125" fill="black" />
                <motion.circle
                  cx={sx}
                  cy={sy}
                  r={sr}
                  fill="white"
                  filter="url(#fmp-liquid)"
                />
              </mask>
            </defs>

            <image
              href={reveal.opened.src}
              x="0"
              y="0"
              width="100"
              height="125"
              preserveAspectRatio="xMidYMid meet"
              mask="url(#fmp-reveal-mask)"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
