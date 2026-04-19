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
 * Performance-minded rock → crystal reveal.
 *
 * - All pointer tracking runs on motion values (no React re-renders).
 *   clip-path comes from useTransform reading the springed x/y/radius,
 *   so the DOM updates happen directly on each frame.
 * - useSpring smooths the cursor trail (GPU-paced).
 * - `will-change: clip-path` only while the cursor is inside the frame.
 * - Next.js <Image> optimises closed.jpg and opened.png to AVIF/WebP on
 *   build; `sizes` locks the served width to the component's max.
 * - Desktop: hover follow. Touch: tap toggle. Reduced-motion: static
 *   opened frame. On first viewport-entry we briefly "peek" to hint
 *   the interaction.
 */
export function RevealSection({ dict }: { dict: Dictionary }) {
  const r = dict.reveal;
  const reduced = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [open, setOpen] = useState(false);

  const x = useMotionValue(55);
  const y = useMotionValue(42);
  const radius = useMotionValue(130);
  const sx = useSpring(x, { damping: 26, stiffness: 180, mass: 0.6 });
  const sy = useSpring(y, { damping: 26, stiffness: 180, mass: 0.6 });
  const sr = useSpring(radius, { damping: 32, stiffness: 140, mass: 0.8 });

  const clipPath = useTransform(
    [sx, sy, sr],
    (latest: number[]) => `circle(${latest[2]}% at ${latest[0]}% ${latest[1]}%)`,
  );
  const glowOpacity = useTransform(sr, [0, 130], [1, 0.22]);
  const glowScale = useTransform(sr, [0, 130], [1.08, 0.9]);

  // Detect touch vs hover
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const apply = () => setIsTouch(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Quick teaser on first in-view entry (desktop + mobile)
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
          if (!hasInteracted) radius.set(130);
        }, 1400);
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
    const el = wrapperRef.current?.querySelector<HTMLElement>("[data-top]");
    if (el) el.style.willChange = "clip-path";
  };
  const onLeave = () => {
    if (isTouch || reduced) return;
    radius.set(130);
    const el = wrapperRef.current?.querySelector<HTMLElement>("[data-top]");
    if (el) el.style.willChange = "auto";
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
    radius.set(willOpen ? 0 : 130);
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
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(244,234,209,0.07),transparent_55%)]"
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
            "group/reveal relative mx-auto mt-10 aspect-[4/5] w-[min(82vw,460px)] select-none sm:mt-14 sm:w-[min(56vw,520px)]",
            isTouch && "cursor-pointer",
          )}
          style={{ contain: "layout paint" }}
        >
          {/* Glow externo — pulsa com o reveal */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-16 -z-10 rounded-full blur-3xl"
            style={{
              opacity: glowOpacity,
              scale: glowScale,
              background:
                "radial-gradient(circle, rgba(146,77,142,0.45) 0%, rgba(200,147,71,0.18) 45%, transparent 75%)",
            }}
          />

          {/* Camada de baixo — cristal aberto */}
          <div className="absolute inset-0 overflow-hidden rounded-[32px] shadow-luxe-dark">
            <Image
              src={reveal.opened}
              alt={r.hintOpened}
              fill
              sizes="(max-width: 768px) 82vw, 520px"
              placeholder="blur"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(5,5,8,0.35)_100%)]"
            />
          </div>

          {/* Camada de cima — pedra bruta, clip-path animado */}
          <motion.div
            data-top
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden rounded-[32px]"
            style={{ clipPath }}
          >
            <Image
              src={reveal.closed}
              alt=""
              fill
              sizes="(max-width: 768px) 82vw, 520px"
              placeholder="blur"
              className="object-cover"
            />
          </motion.div>

          {/* Filete dourado sempre visível */}
          <div
            aria-hidden="true"
            className="frame-gold pointer-events-none absolute inset-0 rounded-[32px]"
          />

          {/* Chip de legenda */}
          <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center">
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-champagne-300/35 bg-obsidian-950/80 px-4 py-1.5 text-[0.58rem] uppercase tracking-[0.3em] text-champagne-200 backdrop-blur"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <RevealLabel
                isTouch={isTouch}
                open={open}
                radius={sr}
                dict={r}
              />
            </motion.span>
          </div>
        </div>
      </Container>
    </section>
  );
}

/**
 * Pequeno componente que troca o texto do chip de acordo com o
 * estado do reveal. Em desktop lê o motion value da radius (sem
 * forçar re-render do parent), em mobile usa o boolean `open`.
 */
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
    <>
      <span
        aria-hidden="true"
        className={cn(
          "inline-block size-1.5 rounded-full transition-colors",
          isOpen ? "bg-champagne-300" : "bg-pearl-400",
        )}
      />
      {isTouch && !isOpen
        ? dict.tapHint
        : isOpen
          ? dict.hintOpened
          : dict.hintClosed}
    </>
  );
}
