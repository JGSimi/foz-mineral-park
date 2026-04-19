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
 * Reveal "lupa": a pedra é sempre a base. O cristal aparece apenas
 * num pequeno disco (clip-path circle) que segue o ponteiro — e fecha
 * completamente quando o mouse sai.
 *
 * Performance
 * - Pointer e radius são motion values; clipPath é produzido por
 *   useTransform e escrito direto no DOM sem re-render do React.
 * - useSpring suaviza cursor + radius.
 * - `will-change: clip-path` só durante hover.
 * - `contain: layout paint` no wrapper interativo.
 */
export function RevealSection({ dict }: { dict: Dictionary }) {
  const r = dict.reveal;
  const reduced = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [open, setOpen] = useState(false);

  // Tamanho do disco revelado (em % do tamanho do wrapper)
  const HOVER_RADIUS = 26;
  const TAP_RADIUS = 36;
  const FULL_RADIUS = 140; // só usado quando reduced-motion (mostra tudo)

  const x = useMotionValue(52);
  const y = useMotionValue(45);
  const radius = useMotionValue(0);
  const sx = useSpring(x, { damping: 28, stiffness: 220, mass: 0.5 });
  const sy = useSpring(y, { damping: 28, stiffness: 220, mass: 0.5 });
  const sr = useSpring(radius, { damping: 30, stiffness: 180, mass: 0.7 });

  const clipPath = useTransform(
    [sx, sy, sr],
    (latest: number[]) =>
      `circle(${latest[2]}% at ${latest[0]}% ${latest[1]}%)`,
  );

  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const apply = () => setIsTouch(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Peek curto na primeira vez que a seção entra no viewport
  useEffect(() => {
    if (reduced) {
      radius.set(FULL_RADIUS);
      setOpen(true);
      return;
    }
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || hasInteracted) return;
        radius.set(HOVER_RADIUS + 6);
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
    radius.set(HOVER_RADIUS);
    if (topRef.current) topRef.current.style.willChange = "clip-path";
  };
  const onLeave = () => {
    if (isTouch || reduced) return;
    radius.set(0);
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
    radius.set(willOpen ? TAP_RADIUS : 0);
    x.set(50);
    y.set(45);
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-36">
      <div className="bg-geode absolute inset-0 -z-10" aria-hidden="true" />

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
          className="relative mx-auto mt-12 aspect-[4/5] w-[min(82vw,440px)] sm:mt-16 sm:w-[min(56vw,500px)]"
          style={{ contain: "layout paint" }}
        >
          {/* Sombra de chão oval, respira em antifase */}
          <div
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute inset-x-10 bottom-[-6%] -z-10 h-10 rounded-[50%] bg-obsidian-950 opacity-60 blur-2xl",
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
            {/* Camada 1 (base): pedra fechada, sempre visível */}
            <div className="absolute inset-0">
              <Image
                src={reveal.closed}
                alt={r.hintClosed}
                fill
                sizes="(max-width: 768px) 82vw, 500px"
                placeholder="blur"
                className="object-contain"
              />
            </div>

            {/* Camada 2 (topo): cristal revelado dentro de um disco circular
                que segue o ponteiro */}
            <motion.div
              ref={topRef}
              aria-hidden="true"
              className="absolute inset-0"
              style={{ clipPath }}
            >
              <Image
                src={reveal.opened}
                alt=""
                fill
                sizes="(max-width: 768px) 82vw, 500px"
                placeholder="blur"
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>

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
    return radius.on("change", (v) => setIsOpen(v > 8));
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
