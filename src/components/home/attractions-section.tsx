"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, Clock, Gem } from "lucide-react";

import { site } from "@/lib/site";
import { attractionImages } from "@/lib/images";
import type { Locale } from "@/i18n/config";
import { localePath } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { CarouselDots } from "@/components/carousel-dots";
import { AnimateIn } from "@/components/animate";

interface Props {
  dict: Dictionary;
  locale: Locale;
}

export function AttractionsSection({ dict, locale }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section id="atracoes" className="py-24 sm:py-32 md:py-36">
      <Container>
        <AnimateIn>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow={dict.attractions.eyebrow}
              title={
                <>
                  {dict.attractions.titleLead}{" "}
                  <em className="italic text-champagne-600">
                    {dict.attractions.titleEm}
                  </em>{" "}
                  {dict.attractions.titleTail}
                </>
              }
              description={dict.attractions.description}
            />
            <span className="ornament hidden text-[0.65rem] uppercase tracking-[0.3em] md:inline-flex">
              {dict.attractions.selectHint}
            </span>
          </div>
        </AnimateIn>

        <div
          ref={ref}
          className="h-scroll scroll-fade-x -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:mt-16 md:grid md:snap-none md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
        >
          {site.attractions.map((a, i) => {
            const t =
              dict.attractions.items[
                a.slug as keyof typeof dict.attractions.items
              ];
            return (
              <motion.article
                key={a.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                  delay: i * 0.08,
                }}
                className="w-[82%] shrink-0 snap-center md:w-auto md:shrink"
              >
                <Link
                  href={localePath(locale, `/atracoes/${a.slug}`)}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-pearl-300 bg-pearl-50 transition-all duration-500 active:scale-[0.98] hover:-translate-y-1.5 hover:border-champagne-300 hover:shadow-luxe-lift"
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-5 top-5 z-10 inline-flex size-9 items-center justify-center rounded-full border border-champagne-300/70 bg-obsidian-950/85 font-display italic text-[0.85rem] tracking-[0.12em] text-champagne-200 shadow-lg backdrop-blur"
                  >
                    {["I", "II", "III"][i] ?? ""}
                  </span>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={
                        attractionImages[
                          a.slug as keyof typeof attractionImages
                        ]
                      }
                      alt={`${t.name} — ${t.tagline}`}
                      fill
                      sizes="(max-width: 768px) 82vw, 33vw"
                      placeholder="blur"
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                    />
                    <div
                      className="card-media-overlay absolute inset-0"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-champagne-400/40 bg-obsidian-900/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-champagne-200 backdrop-blur">
                      <Gem className="size-3" />
                      {t.badge}
                    </div>
                    <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-obsidian-950/70 px-3 py-1 text-xs text-pearl-200 backdrop-blur">
                      <Clock className="size-3" />
                      {t.duration}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
                    <p className="text-[0.65rem] uppercase tracking-[0.28em] text-champagne-700">
                      {t.tagline}
                    </p>
                    <h3 className="font-display text-2xl leading-tight text-obsidian-900">
                      {renderAttractionTitle(t.name)}
                    </h3>
                    <p className="flex-1 text-sm leading-relaxed text-pearl-700">
                      {t.short}
                    </p>
                    <div className="mt-3 flex items-center justify-between border-t border-dashed border-champagne-400/30 pt-3">
                      <span className="inline-flex items-center gap-1.5 text-[0.65rem] text-pearl-600">
                        <span
                          aria-hidden="true"
                          className="size-1.5 rounded-full bg-jade-500"
                        />
                        <span>{dict.attractions.accessible}</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-imperial-700 transition-all duration-500 group-hover:gap-3 group-hover:text-champagne-700">
                        {dict.attractions.learnMore}
                        <ArrowRight className="size-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </div>

        <CarouselDots
          containerRef={ref}
          total={site.attractions.length}
          className="mt-4 md:hidden"
        />
      </Container>
    </section>
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
