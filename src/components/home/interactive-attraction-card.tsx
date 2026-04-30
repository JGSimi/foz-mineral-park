"use client";

import Link from "next/link";
import type { PointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight, Clock, Gem } from "lucide-react";

import type { Attraction } from "@/lib/site";
import { attractionImages, type AttractionSlug } from "@/lib/images";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { cn } from "@/lib/utils";
import { MotionMedia } from "@/components/home/motion-media";

type AttractionCopy =
  Dictionary["attractions"]["items"][keyof Dictionary["attractions"]["items"]];

interface InteractiveAttractionCardProps {
  attraction: Attraction;
  copy: AttractionCopy;
  index: number;
  locale: Locale;
  accessibleLabel: string;
  learnMoreLabel: string;
}

export function InteractiveAttractionCard({
  attraction,
  copy,
  index,
  locale,
  accessibleLabel,
  learnMoreLabel,
}: InteractiveAttractionCardProps) {
  const reduced = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 150, damping: 22, mass: 0.35 });
  const sy = useSpring(py, { stiffness: 150, damping: 22, mass: 0.35 });
  const rotateY = useTransform(sx, [-1, 1], [-5, 5]);
  const rotateX = useTransform(sy, [-1, 1], [4, -4]);

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = event.currentTarget.getBoundingClientRect();
    px.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    py.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.article
      initial={reduced ? undefined : { opacity: 0, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.72,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.08,
      }}
      className="w-[84%] shrink-0 snap-center md:w-auto md:shrink"
    >
      <motion.div
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={reduced ? undefined : { rotateX, rotateY }}
        className="h-full transform-gpu"
      >
        <Link
          href={localePath(locale, `/atracoes/${attraction.slug}`)}
          className={cn(
            "group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-champagne-400/25 bg-pearl-50 shadow-luxe transition-[border-color,box-shadow,transform] duration-500",
            "hover:border-champagne-300 hover:shadow-luxe-lift focus-visible:outline-champagne-400",
          )}
        >
          <span
            aria-hidden="true"
            className="absolute left-5 top-5 z-20 inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-champagne-300/70 bg-obsidian-950/85 px-3 font-display italic text-[0.78rem] tracking-[0.16em] text-champagne-200 shadow-lg backdrop-blur"
          >
            {["I", "II", "III"][index] ?? String(index + 1)}
          </span>

          <MotionMedia
            src={attractionImages[attraction.slug as AttractionSlug]}
            alt={`${copy.name} - ${copy.tagline}`}
            sizes="(max-width: 768px) 84vw, 33vw"
            className="aspect-[4/5]"
            overlayClassName="card-media-overlay"
          >
            <div className="absolute inset-x-4 bottom-4 z-10 flex items-end justify-between gap-3">
              <div className="inline-flex min-w-0 items-center gap-1.5 rounded-full border border-champagne-400/40 bg-obsidian-900/72 px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-champagne-100 backdrop-blur">
                <Gem className="size-3" />
                <span className="truncate">{copy.badge}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-obsidian-950/72 px-3 py-1 text-xs text-pearl-100 backdrop-blur">
                <Clock className="size-3" />
                {copy.duration}
              </div>
            </div>
          </MotionMedia>

          <div className="relative flex flex-1 flex-col gap-3 p-6 sm:p-7">
            <span
              aria-hidden="true"
              className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-champagne-400/50 to-transparent"
            />
            <p className="text-[0.62rem] uppercase tracking-[0.28em] text-champagne-700">
              {copy.tagline}
            </p>
            <h3 className="font-display text-2xl leading-tight text-obsidian-900">
              {renderAttractionTitle(copy.name)}
            </h3>
            <p className="flex-1 text-sm leading-relaxed text-pearl-700">
              {copy.short}
            </p>
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-dashed border-champagne-400/30 pt-3">
              <span className="inline-flex min-w-0 items-center gap-1.5 text-[0.65rem] text-pearl-600">
                <span
                  aria-hidden="true"
                  className="size-1.5 shrink-0 rounded-full bg-jade-500"
                />
                <span className="truncate">{accessibleLabel}</span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-imperial-700 transition-all duration-500 group-hover:gap-3 group-hover:text-champagne-700">
                {learnMoreLabel}
                <ArrowRight className="size-4" />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.article>
  );
}

function renderAttractionTitle(name: string) {
  const words = name.split(" ");
  if (words.length < 2) return name;
  const last = words[words.length - 1];
  const head = words.slice(0, -1).join(" ");
  return (
    <>
      {head} <em className="italic text-imperial-700">{last}</em>
    </>
  );
}
