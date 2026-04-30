"use client";

import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, Gem, MapPin, Ticket } from "lucide-react";
import { useRef, useState, type ComponentProps, type ReactNode } from "react";

import { site } from "@/lib/site";
import { heroPoster } from "@/lib/images";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { Button } from "@/components/button";
import { HeroVideo } from "@/components/hero-video";

interface ScrollStoryProps {
  dict: Dictionary;
  locale: Locale;
}

export function ScrollStory({ dict, locale }: ScrollStoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const e = dict.experience;
  const cave = dict.attractions.items["gruta-de-ametista"];
  const plan = dict.visitPlan;
  const [activeStep, setActiveStep] = useState(0);

  const progressScale = useTransform(scrollYProgress, [0, 1], [0.08, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const next = latest < 0.34 ? 0 : latest < 0.68 ? 1 : 2;
    setActiveStep((current) => (current === next ? current : next));
  });

  const panels = [
    {
      eyebrow: e.eyebrow,
      index: "01",
      title: (
        <>
          {e.titleLead}{" "}
          <em className="italic text-champagne-200">{e.titleEm}</em>
          {e.titleTail}
        </>
      ),
      body: e.description,
    },
    {
      eyebrow: cave.tagline,
      index: "02",
      title: (
        <>
          {renderTitleLead(cave.name)}{" "}
          <em className="italic text-champagne-200">
            {renderTitleTail(cave.name)}
          </em>
        </>
      ),
      body: cave.long,
    },
    {
      eyebrow: plan.eyebrow,
      index: "03",
      title: (
        <>
          {plan.titleLead}{" "}
          <em className="italic text-champagne-200">{plan.titleEm}</em>{" "}
          {plan.titleTail}
        </>
      ),
      body: plan.description,
      children: (
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="gold">
            <Link href={localePath(locale, "/ingressos")}>
              <Ticket className="size-4" />
              {e.ctaBuy}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="onDark">
            <Link href={localePath(locale, "/#atracoes")}>
              <Gem className="size-4" />
              {e.ctaMore}
            </Link>
          </Button>
        </div>
      ),
    },
  ];
  const currentPanel = panels[reduced ? 0 : activeStep] ?? panels[0];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="video-experience-title"
      className="relative"
    >
      <h2 id="video-experience-title" className="sr-only">
        {e.titleLead} {e.titleEm}
        {e.titleTail}
      </h2>
      <HeroVideo
        src={site.hero.scrollVideo}
        poster={heroPoster}
        minWidth={0}
        scrollInteractive
        className="story-stage"
      >
        <div className="absolute inset-0 z-10 flex items-end px-5 pb-8 pt-28 sm:px-8 sm:pb-12 md:items-center md:pb-0">
          <div className="mx-auto grid w-full max-w-6xl gap-8 md:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.55fr)] md:items-center">
            <div className="relative min-h-[22rem] text-pearl-100 sm:min-h-[24rem] md:min-h-[28rem]">
              {reduced ? (
                <StoryPanel
                  eyebrow={currentPanel.eyebrow}
                  index={currentPanel.index}
                  title={currentPanel.title}
                  body={currentPanel.body}
                >
                  {currentPanel.children}
                </StoryPanel>
              ) : (
                <AnimatePresence initial={false} mode="wait">
                  <StoryPanel
                    key={currentPanel.index}
                    eyebrow={currentPanel.eyebrow}
                    index={currentPanel.index}
                    title={currentPanel.title}
                    body={currentPanel.body}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {currentPanel.children}
                  </StoryPanel>
                </AnimatePresence>
              )}
            </div>

            <motion.aside
              initial={reduced ? undefined : { opacity: 0, x: 28 }}
              whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="hidden rounded-[28px] border border-pearl-100/15 bg-obsidian-950/42 p-4 text-pearl-100 shadow-luxe-dark backdrop-blur-md md:block"
            >
              <div className="grid gap-3">
                {dict.quickFacts.map((fact) => (
                  <div
                    key={fact.label}
                    className="rounded-2xl border border-pearl-100/10 bg-pearl-100/[0.06] p-4"
                  >
                    <p className="text-[0.58rem] uppercase tracking-[0.28em] text-champagne-200">
                      {fact.label}
                    </p>
                    <p className="mt-2 font-display text-2xl leading-none">
                      {fact.value}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-pearl-100/70">
                      {fact.detail}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-champagne-300/20 bg-champagne-300/10 p-4 text-sm text-pearl-100/85">
                <MapPin className="size-4 text-champagne-200" />
                {e.pillLocation}
              </div>
            </motion.aside>
          </div>
        </div>

        <div className="absolute inset-x-5 bottom-5 z-20 h-px overflow-hidden rounded-full bg-pearl-100/20 sm:inset-x-8 md:bottom-8">
          <motion.div
            style={reduced ? undefined : { scaleX: progressScale }}
            className="h-full origin-left bg-champagne-300"
          />
        </div>
      </HeroVideo>
    </section>
  );
}

function StoryPanel({
  eyebrow,
  index,
  title,
  body,
  children,
  style,
  initial,
  animate,
  exit,
  transition,
}: {
  eyebrow: string;
  index: string;
  title: ReactNode;
  body: string;
  children?: ReactNode;
  style?: ComponentProps<typeof motion.div>["style"];
  initial?: ComponentProps<typeof motion.div>["initial"];
  animate?: ComponentProps<typeof motion.div>["animate"];
  exit?: ComponentProps<typeof motion.div>["exit"];
  transition?: ComponentProps<typeof motion.div>["transition"];
}) {
  return (
    <motion.div
      style={style}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      className="absolute inset-x-0 bottom-10 md:bottom-auto md:top-0"
    >
      <div className="max-w-3xl">
        <div className="flex items-center gap-4">
          <span className="font-display text-sm italic text-champagne-200">
            {index}
          </span>
          <span className="h-px w-12 bg-champagne-300/60" aria-hidden="true" />
          <p className="text-[0.62rem] uppercase tracking-[0.3em] text-champagne-200">
            {eyebrow}
          </p>
        </div>
        <h3 className="mt-5 max-w-4xl text-balance font-display text-[2.05rem] leading-[1.02] sm:text-5xl md:text-7xl">
          {title}
        </h3>
        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-pearl-100/78 sm:text-lg">
          {body}
        </p>
        {children}
      </div>
    </motion.div>
  );
}

function renderTitleLead(name: string) {
  const words = name.split(" ");
  return words.slice(0, -1).join(" ") || name;
}

function renderTitleTail(name: string) {
  const words = name.split(" ");
  return words.length > 1 ? (words[words.length - 1] ?? "") : "";
}
