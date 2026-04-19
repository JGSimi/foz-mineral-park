import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Ticket } from "lucide-react";

import { site } from "@/lib/site";
import { attractionImages, heroPoster } from "@/lib/images";
import { localePath } from "@/i18n/routing";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { HeroVideo } from "@/components/hero-video";
import { AnimateIn } from "@/components/animate";

export function ExperienceSection({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const e = dict.experience;
  const grutaImg = attractionImages["gruta-de-ametista"];
  const grutaName = dict.attractions.items["gruta-de-ametista"].name;

  return (
    <section className="relative overflow-hidden py-24 sm:py-32 md:py-40">
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <HeroVideo
          src={site.hero.video}
          poster={heroPoster}
          className="scale-105"
        />
      </div>
      <div
        className="hero-overlay-main absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div
        className="hero-overlay-glow absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden="true" />
      {/* Fade do topo: saída do pearl do hero pro dark do vídeo — alto
          o bastante pra não dar corte seco. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 bg-gradient-to-b from-obsidian-950 to-transparent sm:h-72"
      />

      <Container className="grid items-center gap-12 md:grid-cols-[1fr_1.05fr] md:gap-16">
        <AnimateIn className="space-y-6 text-pearl-100 sm:space-y-7" y={24}>
          <span className="ornament font-display text-[0.62rem] uppercase tracking-[0.3em] text-champagne-300">
            {e.eyebrow}
          </span>
          <h2 className="text-balance font-display text-[2.2rem] leading-[1.05] text-pearl-100 sm:text-5xl md:text-[3.2rem]">
            {e.titleLead}{" "}
            <em className="italic text-champagne-300">{e.titleEm}</em>
            {e.titleTail}
          </h2>
          <p className="max-w-xl text-pretty text-[0.95rem] leading-relaxed text-pearl-200/90 sm:text-lg">
            {e.description}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              variant="gold"
              className="w-full sm:w-auto"
            >
              <Link href={localePath(locale, "/ingressos")}>
                <Ticket className="size-4" />
                {e.ctaBuy}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="onDark"
              className="w-full sm:w-auto"
            >
              <Link href="#atracoes">{e.ctaMore}</Link>
            </Button>
          </div>
        </AnimateIn>

        <AnimateIn className="relative isolate" y={30} delay={0.12}>
          <div
            className="absolute -inset-12 -z-10 rounded-[48px] bg-gradient-to-br from-imperial-400/25 via-transparent to-champagne-400/25 blur-3xl"
            aria-hidden="true"
          />
          <div className="float-a frame-gold relative aspect-[4/5] overflow-hidden rounded-[28px] shadow-luxe-dark sm:rounded-[32px]">
            <Image
              src={grutaImg}
              alt={grutaName}
              fill
              sizes="(max-width: 768px) 90vw, 480px"
              placeholder="blur"
              className="object-cover"
            />
            <div
              className="card-media-overlay absolute inset-0"
              aria-hidden="true"
            />
          </div>
          <div className="float-b absolute -bottom-8 -left-6 hidden sm:block">
            <div className="w-52 -rotate-[4deg] rounded-2xl border border-champagne-300/20 bg-obsidian-900/85 p-4 shadow-luxe-dark backdrop-blur">
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300">
                {e.photoBadge.k}
              </p>
              <p className="mt-1 font-display text-lg italic text-pearl-100">
                {e.photoBadge.title}
              </p>
              <p className="text-xs text-pearl-200/70">{e.photoBadge.sub}</p>
            </div>
          </div>
          <div className="float-c absolute -top-6 right-6 hidden sm:block">
            <div className="rotate-[3deg] rounded-full border border-champagne-300/30 bg-obsidian-900/80 px-4 py-2 text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300 backdrop-blur">
              {e.pillLocation}
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
