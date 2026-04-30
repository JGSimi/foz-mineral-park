"use client";

import { useRef } from "react";

import { site } from "@/lib/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { CarouselDots } from "@/components/carousel-dots";
import { AnimateIn } from "@/components/animate";
import { InteractiveAttractionCard } from "@/components/home/interactive-attraction-card";

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
          className="h-scroll scroll-fade-x -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 md:mx-0 md:mt-16 md:grid md:snap-none md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
        >
          {site.attractions.map((a, i) => {
            const t =
              dict.attractions.items[
                a.slug as keyof typeof dict.attractions.items
              ];
            return (
              <InteractiveAttractionCard
                key={a.slug}
                attraction={a}
                copy={t}
                index={i}
                locale={locale}
                accessibleLabel={dict.attractions.accessible}
                learnMoreLabel={dict.attractions.learnMore}
              />
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
