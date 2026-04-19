"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
import { Container } from "@/components/container";

/**
 * "Da pedra ao cristal" — performance-tuned reveal without a frame.
 *
 * - Both images are PNGs with alpha, so the stone genuinely floats over
 *   the bg-geode background. No rounded rectangle, no shadow card.
 * - Pointer is tracked via motion values (no React re-renders); a single
 *   `clip-path: circle(...)` string is written to the DOM per frame.
 * - `will-change: clip-path` only while the cursor is inside.
 * - The whole stack runs inside a CSS `.float-hero` animation so the
 *   composition levitates idly. prefers-reduced-motion disables it.
 * - A radial shadow underneath scales with the float to read as
 *   proper ground shadow (not a flat glow).
 */
export function RevealSection({ dict }: { dict: Dictionary }) {
  const r = dict.reveal;
  const reduced = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [open, setOpen] = useState(false);

  const x = useMotionValue(52);
  const y = useMotionValue(45);
  const radius = useMotionValue(135);
  const sx = useSpring(x, { damping: 26, stiffness: 180, mass: 0.6 });
  const sy = useSpring(y, { damping: 26, stiffness: 180, mass: 0.6 });
  const sr = useSpring(radius, { damping: 32, stiffness: 140, mass: 0.8 });

  const clipPath = useTransform(
    [sx, sy, sr],
    (latest: number[]) =>
      `circle(${latest[2]}% at ${latest[0]}% ${latest[1]}%)`,
  );
  const glowOpacity = useTransform(sr, [0, 135], [1, 0.3]);
  const glowScale = useTransform(sr, [0, 135], [1.1, 0.88]);

  // Detect touch vs hover
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const apply = () => setIsTouch(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Teaser once when section enters viewport
  useEffect(() => {
    if (reduced) {
      radius.set(0);
      setOpen(true);
      return;
    }
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasInteracted) return;
        radius.set(0);
        const t = window.setTimeout(() => {
          if (!hasInteracted) radius.set(135);
        }, 1500);
        return () => window.clearTimeout(t);
      },
      { threshold: 0.55 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasInteracted, radius, reduced]);

  const onEnter = () => {
    if (isTouch || reduced) return;
    setHasInteracted(true);
    radius.set(0);
    if (topRef.current) topRef.current.style.willChange = "clip-path";
  };
  const onLeave = () => {
    if (isTouch || reduced) return;
    radius.set(135);
    if (topRef.current) topRef.current.style.willChange = "auto";
  };
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width) * 100);
    y.set(((e.clientY - rect.top) / rect.height) * 100);
  };
  const toggle = () => {
    if (!isTouch) return;
    setHasInteracted(true);
    const willOpen = !open;
    setOpen(willOpen);
    radius.set(willOpen ? 0 : 135);
    x.set(50);
    y.set(45);
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-36">
      <div
        className="bg-geode absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(244,234,209,0.06),transparent_55%)]"
        aria-hidden="true"
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

        {/* Wrapper flutuante — isola paint e hospeda o float CSS */}
        <div
          className="relative mx-auto mt-12 aspect-[4/5] w-[min(82vw,440px)] sm:mt-16 sm:w-[min(56vw,500px)]"
          style={{ contain: "layout paint" }}
        >
          {/* Glow atrás — animado com o reveal */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-16 -z-10 rounded-full blur-3xl"
            style={{
              opacity: glowOpacity,
              scale: glowScale,
              background:
                "radial-gradient(circle, rgba(146,77,142,0.55) 0%, rgba(200,147,71,0.22) 45%, transparent 78%)",
            }}
          />

          {/* Ground shadow — sombra de chão sob a pedra, também flutua */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-10 bottom-[-8%] -z-10 h-8 rounded-[50%] bg-obsidian-950 opacity-70 blur-2xl",
              !reduced && "animate-[float-shadow_9s_ease-in-out_infinite]",
            )}
          />

          <div
            ref={wrapperRef}
            onPointerEnter={onEnter}
            onPointerLeave={onLeave}
            onPointerMove={onMove}
            onClick={toggle}
            role={isTouch ? "button" : undefined}
            aria-pressed={isTouch ? open : undefined}
            aria-label={open ? r.hintOpened : r.hintClosed}
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
            {/* Camada 1: cristal aberto — sempre lá, atrás da pedra */}
            <div className="absolute inset-0">
              <Image
                src={reveal.opened}
                alt={r.hintOpened}
                fill
                sizes="(max-width: 768px) 82vw, 500px"
                placeholder="blur"
                className="object-contain drop-shadow-[0_20px_40px_rgba(85,48,86,0.45)]"
              />
            </div>

            {/* Camada 2: pedra fechada — clip-path cobre a camada 1 */}
            <motion.div
              ref={topRef}
              aria-hidden="true"
              className="absolute inset-0"
              style={{ clipPath }}
            >
              <Image
                src={reveal.closed}
                alt=""
                fill
                sizes="(max-width: 768px) 82vw, 500px"
                placeholder="blur"
                className="object-contain drop-shadow-[0_16px_32px_rgba(10,9,16,0.6)]"
              />
            </motion.div>
          </div>
        </div>

        {/* Chip de legenda (fora do wrapper flutuante, pra não seguir o float) */}
        <div className="mt-8 flex justify-center sm:mt-10">
          <RevealLabel
            isTouch={isTouch}
            open={open}
            radius={sr}
            dict={r}
          />
        </div>
      </Container>
    </section>
  );
}

function RevealLabel({
  isTouch,
  open,
  radius,
  dict,
}: {
  isTouch: boolean;
  open: boolean;
  radius: ReturnType<typeof useMotionValue<number>>;
  dict: Dictionary["reveal"];
}) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isTouch) {
      setIsOpen(open);
      return;
    }
    return radius.on("change", (v) => setIsOpen(v < 40));
  }, [isTouch, open, radius]);

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-champagne-300/30 bg-obsidian-950/80 px-4 py-1.5 text-[0.58rem] uppercase tracking-[0.3em] text-champagne-200 backdrop-blur">
      <span
        aria-hidden="true"
        className={cn(
          "inline-block size-1.5 rounded-full transition-colors duration-500",
          isOpen ? "bg-champagne-300" : "bg-pearl-400",
        )}
      />
      {isTouch && !isOpen
        ? dict.tapHint
        : isOpen
          ? dict.hintOpened
          : dict.hintClosed}
    </span>
  );
}
