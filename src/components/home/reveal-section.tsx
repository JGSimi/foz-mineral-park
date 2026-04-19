"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";
import { reveal } from "@/lib/reveal-images";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { Container } from "@/components/container";

/**
 * Reveal com borda orgânica (líquida) + parallax de cursor + zoom cinemático no scroll.
 *
 * Camadas de transform (do mais externo pro mais interno):
 * 1. motion.div com scale vindo de useScroll — cria o zoom out na
 *    entrada e zoom in na saída.
 * 2. div com animação CSS `float-hero` — o flutuar lento da pedra.
 * 3. motion.div com translate vindo de useTransform(sx/sy) — o
 *    parallax sutil que segue o cursor.
 *
 * Cada um tem sua própria element, então os transforms compõem
 * via matriz do DOM sem conflito.
 */
export function RevealSection({ dict }: { dict: Dictionary }) {
  const r = dict.reveal;
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Sistema de coordenadas do SVG (viewBox 100 x 125 = 4:5, igual ao wrapper)
  const HOVER_R = 22;
  const TAP_R = 30;
  const FULL_R = 140;

  const x = useMotionValue(50);
  const y = useMotionValue(56);
  const radius = useMotionValue(0);
  const sx = useSpring(x, { damping: 28, stiffness: 240, mass: 0.45 });
  const sy = useSpring(y, { damping: 28, stiffness: 240, mass: 0.45 });
  const sr = useSpring(radius, { damping: 30, stiffness: 180, mass: 0.7 });

  // Parallax sutil baseado no cursor. Deviação pequena pra não descolar
  // o centro do blob da posição do cursor.
  const parallaxX = useTransform(sx, [0, 100], [-6, 6]);
  const parallaxY = useTransform(sy, [0, 125], [-4, 4]);
  const smoothPX = useSpring(parallaxX, { damping: 24, stiffness: 140, mass: 0.6 });
  const smoothPY = useSpring(parallaxY, { damping: 24, stiffness: 140, mass: 0.6 });

  // Scroll-driven zoom: pedra grande ao entrar, encolhe no centro,
  // cresce de novo ao sair — efeito "dip" cinemático.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduced ? [1, 1, 1] : [1.95, 0.42, 1.95],
  );
  const scale = useSpring(rawScale, { damping: 32, stiffness: 110, mass: 0.9 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const apply = () => setIsTouch(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) {
      radius.set(FULL_R);
      return;
    }
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasInteracted) return;
        radius.set(HOVER_R + 6);
        const t = window.setTimeout(() => {
          if (!hasInteracted) radius.set(0);
        }, 1300);
        return () => window.clearTimeout(t);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasInteracted, radius, reduced]);

  const onEnter = () => {
    if (isTouch || reduced) return;
    setHasInteracted(true);
    radius.set(HOVER_R);
  };
  const onLeave = () => {
    if (isTouch || reduced) return;
    radius.set(0);
    // Recentraliza x/y pra o parallax voltar ao repouso.
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
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-32 sm:py-44 md:py-56"
    >
      <div className="bg-geode absolute inset-0 -z-10" aria-hidden="true" />
      {/* Fade do topo: mascara o radial imperial do geode pra casar
          com o obsidian puro da QuickFacts acima, sem seam. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-obsidian-950 to-transparent sm:h-56"
      />

      <Container size="md" className="text-center">
        <span className="ornament font-display text-[0.62rem] uppercase tracking-[0.3em] text-champagne-300">
          {r.eyebrow}
        </span>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance font-display text-[2rem] leading-[1.05] text-pearl-100 sm:text-5xl md:text-[3.2rem]">
          {r.titleLead}{" "}
          <em className="italic text-champagne-300">{r.titleEm}</em>
          {r.titleTail}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-pearl-200/80 sm:text-base">
          {r.description}
        </p>

        <div className="relative mx-auto mt-12 aspect-[4/5] w-[min(82vw,440px)] sm:mt-16 sm:w-[min(56vw,500px)]">
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-10 bottom-[-6%] -z-10 h-10 rounded-[50%] bg-obsidian-950 opacity-60 blur-2xl",
              !reduced && "animate-[float-shadow_9s_ease-in-out_infinite]",
            )}
          />

          <motion.div
            className="absolute inset-0"
            style={reduced ? undefined : { scale }}
          >
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
                {/* Base: pedra fechada, sempre visível */}
                <div className="pointer-events-none absolute inset-0">
                  <Image
                    src={reveal.closed}
                    alt={r.hintClosed}
                    fill
                    sizes="(max-width: 768px) 82vw, 500px"
                    placeholder="blur"
                    className="object-contain"
                  />
                </div>

                {/* Topo: cristal mascarado pelo blob líquido */}
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
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
