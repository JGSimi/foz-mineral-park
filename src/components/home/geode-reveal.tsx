"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { RockIllustration } from "./rock-illustration";

interface GeodeRevealProps {
  crystal: StaticImageData;
  crystalAlt: string;
  hintLabel?: string;
  revealedLabel?: string;
  className?: string;
}

/**
 * "Pedra comum → cristal" reveal.
 *
 * - Desktop: ao hover, o clip-path circular da pedra encolhe a partir da
 *   posição exata do ponteiro, como se o mouse fosse um martelo.
 * - Mobile: toque alterna o estado (pedra/cristal). Quando visível no
 *   viewport pela primeira vez, revela automaticamente por 2s antes de
 *   voltar ao estado "pedra" — convida o usuário a interagir.
 * - Respeita prefers-reduced-motion: sempre mostra o cristal.
 */
export function GeodeReveal({
  crystal,
  crystalAlt,
  hintLabel = "Passe o mouse",
  revealedLabel = "Ametista",
  className,
}: GeodeRevealProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(Boolean(reduced));
  const [pointer, setPointer] = useState({ x: 55, y: 40 });
  const [isTouch, setIsTouch] = useState(false);

  // Detecta toque (vs mouse) para decidir UX
  useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    setIsTouch(mq.matches);
    const onChange = () => setIsTouch(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Teaser automático em mobile quando o elemento entra em view
  useEffect(() => {
    if (reduced || !isTouch) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setOpen(true);
        const t = setTimeout(() => setOpen(false), 2200);
        return () => clearTimeout(t);
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isTouch, reduced]);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isTouch) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPointer({ x, y });
  };

  const handleEnter = () => !isTouch && setOpen(true);
  const handleLeave = () => !isTouch && setOpen(false);
  const handleClick = () => {
    if (!isTouch) return;
    setOpen((v) => !v);
  };

  const clipRadius = reduced ? 0 : open ? 0 : 120;

  return (
    <div
      ref={ref}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      onPointerMove={handleMove}
      onClick={handleClick}
      role={isTouch ? "button" : undefined}
      aria-pressed={isTouch ? open : undefined}
      aria-label={open ? revealedLabel : hintLabel}
      tabIndex={isTouch ? 0 : -1}
      onKeyDown={(e) => {
        if (!isTouch) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((v) => !v);
        }
      }}
      className={cn(
        "group/reveal relative aspect-square w-full select-none",
        isTouch && "cursor-pointer",
        className,
      )}
    >
      {/* Glow imperial ao redor — intensifica ao revelar */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-16 -z-10 rounded-full blur-3xl"
        animate={{
          opacity: open ? 0.9 : 0.3,
          scale: open ? 1.05 : 0.92,
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "radial-gradient(circle, rgba(146,77,142,0.45) 0%, rgba(200,147,71,0.2) 45%, transparent 75%)",
        }}
      />

      {/* Camada base — o cristal */}
      <div className="absolute inset-0 overflow-hidden rounded-[32px] shadow-luxe-dark">
        <Image
          src={crystal}
          alt={crystalAlt}
          fill
          priority
          sizes="(max-width: 768px) 92vw, 520px"
          placeholder="blur"
          className="object-cover"
        />
        {/* Leve vinheta para legibilidade */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(5,5,8,0.35)_100%)]"
        />
      </div>

      {/* Camada superior — pedra bruta com clip-path animado */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 overflow-hidden rounded-[32px]"
        animate={{
          clipPath: `circle(${clipRadius}% at ${pointer.x}% ${pointer.y}%)`,
        }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <RockIllustration className="h-full w-full" />
      </motion.div>

      {/* Filete dourado na borda — sempre visível */}
      <div
        aria-hidden="true"
        className="frame-gold pointer-events-none absolute inset-0 rounded-[32px]"
      />

      {/* Partículas que aparecem ao revelar */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: open ? 0.2 : 0 }}
      >
        {SPARKLES.map((s, i) => (
          <motion.span
            key={i}
            className="absolute block rounded-full bg-champagne-200"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              boxShadow: `0 0 ${s.size * 3}px rgba(244,234,209,0.8)`,
            }}
            animate={{
              opacity: open ? [0, 1, 0.6] : 0,
              scale: open ? [0.4, 1.1, 1] : 0.4,
            }}
            transition={{
              duration: 1.4 + (i % 3) * 0.3,
              repeat: open ? Infinity : 0,
              repeatType: "reverse",
              delay: (i % 4) * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      {/* Chip de legenda — troca de "hover hint" pra nome da pedra */}
      <div className="pointer-events-none absolute inset-x-0 bottom-5 z-10 flex justify-center">
        <motion.span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-champagne-300/35 bg-obsidian-950/80 px-4 py-1.5 text-[0.6rem] uppercase tracking-[0.32em] backdrop-blur",
            open ? "text-champagne-300" : "text-pearl-100/75",
          )}
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            aria-hidden="true"
            className="inline-block size-1.5 rounded-full"
            animate={{
              backgroundColor: open ? "#dbb46e" : "#9f8f73",
              scale: open ? [1, 1.6, 1] : 1,
            }}
            transition={{
              duration: open ? 1.6 : 0.4,
              repeat: open ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
          {open ? revealedLabel : hintLabel}
        </motion.span>
      </div>
    </div>
  );
}

const SPARKLES = [
  { x: 18, y: 22, size: 3 },
  { x: 82, y: 14, size: 2 },
  { x: 88, y: 58, size: 4 },
  { x: 12, y: 64, size: 2 },
  { x: 50, y: 8, size: 3 },
  { x: 70, y: 82, size: 2 },
  { x: 28, y: 88, size: 3 },
  { x: 92, y: 40, size: 2 },
  { x: 36, y: 46, size: 2 },
];
