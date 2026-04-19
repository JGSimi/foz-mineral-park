import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  MapPin,
  Accessibility,
  Ticket,
  Sparkles,
  Star,
  Map as MapIcon,
  Camera,
  Gem,
} from "lucide-react";

import { site } from "@/lib/site";
import { attractionImages } from "@/lib/images";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { localePath } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { AnimateIn, Stagger, StaggerItem } from "@/components/animate";
import { AttractionsSection } from "@/components/home/attractions-section";
import { HeroStone } from "@/components/home/hero-stone";
import { ExperienceSection } from "@/components/home/experience-section";
import { notFound } from "next/navigation";

type Params = { lang: string };

export default async function Home({ params }: { params: Promise<Params> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  return (
    <>
      <Hero dict={dict} locale={locale} />
      <QuickFacts dict={dict} />
      <ExperienceSection dict={dict} locale={locale} />
      <AttractionsSection dict={dict} locale={locale} />
      <WhyVisit dict={dict} />
      <Testimonials dict={dict} />
      <VisitPlan dict={dict} locale={locale} />
      <FinalCta dict={dict} locale={locale} />
    </>
  );
}

const iconMap = {
  Clock,
  MapPin,
  Accessibility,
  Gem,
  Sparkles,
  Camera,
} as const;

function Hero({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const h = dict.hero;
  return (
    <section className="relative -mt-16 overflow-hidden pb-28 pt-32 sm:-mt-20 sm:pb-40 sm:pt-52">
      {/* Stage escuro: bg-geode no chão, halo brando e grão por cima. */}
      <div className="bg-geode absolute inset-0 -z-20" aria-hidden="true" />
      <div
        className="hero-overlay-glow absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden="true" />

      <Container className="grid items-center gap-12 md:grid-cols-[1.05fr_1fr] md:gap-16">
        <AnimateIn className="space-y-7 text-pearl-100 sm:space-y-8" y={24}>
          <p className="inline-flex items-center gap-2 rounded-full border border-champagne-300/30 bg-white/5 px-3.5 py-1.5 text-[0.58rem] uppercase tracking-[0.22em] text-champagne-300 backdrop-blur sm:px-4 sm:text-[0.65rem] sm:tracking-[0.28em]">
            <Sparkles className="size-3 sm:size-3.5" />
            <span className="truncate">{h.locationBadge}</span>
          </p>
          <h1 className="text-balance font-display text-[2.6rem] leading-[1] sm:text-6xl sm:leading-[0.98] md:text-[4.4rem]">
            {h.titleLead}{" "}
            <em className="italic text-gilded">{h.titleEm}</em>
            {h.titleTail}
          </h1>
          <p className="max-w-xl text-pretty text-[0.95rem] leading-relaxed text-pearl-200/90 sm:text-lg">
            {h.description}
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
                {h.ctaBuy}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="onDark"
              className="w-full sm:w-auto"
            >
              <Link href={localePath(locale, "/como-chegar")}>
                <MapIcon className="size-4" />
                {h.ctaHowTo}
              </Link>
            </Button>
          </div>
          <dl className="grid max-w-xl grid-cols-3 gap-4 border-t border-champagne-300/15 pt-6 text-sm text-pearl-200 sm:gap-6 sm:pt-8">
            {h.stats.map((s) => (
              <div key={s.k}>
                <dt className="text-[0.56rem] uppercase tracking-[0.24em] text-champagne-300 sm:text-[0.6rem] sm:tracking-[0.3em]">
                  {s.k}
                </dt>
                <dd className="mt-1.5 font-display text-2xl text-pearl-100 sm:mt-2 sm:text-3xl">
                  {s.v}
                </dd>
                <dd className="text-[0.7rem] text-pearl-200/70 sm:text-xs">
                  {s.d}
                </dd>
              </div>
            ))}
          </dl>
        </AnimateIn>

        <AnimateIn className="relative" y={30} delay={0.12}>
          <HeroStone dict={dict} />
        </AnimateIn>
      </Container>
    </section>
  );
}

function QuickFacts({ dict }: { dict: Dictionary }) {
  const icons = [Clock, MapPin, Accessibility];
  return (
    <section className="relative bg-gradient-to-b from-imperial-950 to-obsidian-950 pb-20 sm:pb-24">
      <Container className="-mt-14 sm:-mt-16">
        <Stagger className="relative grid gap-0 rounded-[22px] border border-champagne-400/22 bg-pearl-50 p-1 shadow-luxe sm:grid-cols-3">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-5 left-1/3 hidden w-px bg-gradient-to-b from-transparent via-champagne-400/22 to-transparent sm:block"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-5 left-2/3 hidden w-px bg-gradient-to-b from-transparent via-champagne-400/22 to-transparent sm:block"
          />
          {dict.quickFacts.map((f, i) => {
            const Icon = icons[i];
            return (
              <StaggerItem
                key={f.label}
                className="flex items-start gap-3.5 px-5 py-4"
              >
                <div className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-champagne-400/30 bg-obsidian-950 text-champagne-300">
                  <Icon className="size-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-champagne-700">
                    {f.label}
                  </p>
                  <p className="mt-1 font-display text-xl leading-tight text-obsidian-900">
                    {f.value}
                  </p>
                  <p className="mt-0.5 text-[0.8rem] text-pearl-700">
                    {f.detail}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}

function WhyVisit({ dict }: { dict: Dictionary }) {
  const icons = [Gem, Sparkles, Camera, Accessibility];
  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-36">
      <div
        className="absolute inset-0 -z-10 bg-parchment-grid opacity-60"
        aria-hidden="true"
      />
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-start">
          <AnimateIn>
            <SectionHeading
              eyebrow={dict.whyVisit.eyebrow}
              title={
                <>
                  {dict.whyVisit.titleLead}{" "}
                  <em className="italic text-champagne-600">
                    {dict.whyVisit.titleEm}
                  </em>
                  {dict.whyVisit.titleTail && ` ${dict.whyVisit.titleTail}`}
                </>
              }
              description={dict.whyVisit.description}
            />
          </AnimateIn>
          <Stagger as="ol" className="grid gap-5 sm:grid-cols-2">
            {dict.whyVisit.points.map((p, i) => {
              const Icon = icons[i] ?? Gem;
              return (
                <StaggerItem
                  key={p.title}
                  as="li"
                  className="relative overflow-hidden rounded-2xl border border-pearl-300 bg-pearl-50 p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne-300 hover:shadow-luxe-lift"
                >
                  <span className="absolute right-5 top-5 font-display text-3xl italic text-champagne-400/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="inline-flex size-11 items-center justify-center rounded-full border border-champagne-400/40 bg-obsidian-900 text-champagne-300">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl text-obsidian-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-pearl-700">
                    {p.body}
                  </p>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

function Testimonials({ dict }: { dict: Dictionary }) {
  return (
    <section className="py-20 sm:py-28 md:py-36">
      <Container size="md" className="text-center">
        <AnimateIn>
          <span className="ornament font-display text-[0.65rem] uppercase tracking-[0.3em] text-champagne-700">
            {dict.testimonials.eyebrow}
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl leading-tight sm:text-5xl">
            {dict.testimonials.titleLead}{" "}
            <em className="italic text-champagne-600">
              {dict.testimonials.titleEm}
            </em>
            {dict.testimonials.titleTail}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-pearl-700">
            {dict.testimonials.description}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="md" variant="gold">
              <a
                href={site.social.googleMaps}
                target="_blank"
                rel="noreferrer"
              >
                <Star className="size-4" />
                {dict.testimonials.rateGoogle}
              </a>
            </Button>
            <Button asChild size="md" variant="outline">
              <a
                href="https://www.tripadvisor.com.br/Search?q=Foz+Mineral+Park"
                target="_blank"
                rel="noreferrer"
              >
                {dict.testimonials.rateTripadvisor}
              </a>
            </Button>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}

function VisitPlan({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const v = dict.visitPlan;
  return (
    <section className="py-20 sm:py-28 md:py-36">
      <Container>
        <AnimateIn>
          <div className="relative isolate grid overflow-hidden rounded-3xl border border-champagne-400/15 bg-aurora text-pearl-100 md:grid-cols-[1.1fr_1fr]">
            <div className="relative z-10 space-y-7 p-8 sm:space-y-8 sm:p-12 md:p-16">
              <SectionHeading
                eyebrow={v.eyebrow}
                title={
                  <>
                    {v.titleLead}{" "}
                    <em className="italic text-champagne-300">{v.titleEm}</em>{" "}
                    {v.titleTail}
                  </>
                }
                description={v.description}
                tone="dark"
              />
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { k: v.labels.address, val: site.address.full },
                  {
                    k: v.labels.hours,
                    val: `${site.hours.summary}. ${site.hours.lastEntry}.`,
                  },
                  { k: v.labels.parking, val: v.values.parking },
                  { k: v.labels.accessibility, val: v.values.accessibility },
                ].map((item) => (
                  <div
                    key={item.k}
                    className="border-l border-champagne-300/40 pl-4"
                  >
                    <p className="text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300">
                      {item.k}
                    </p>
                    <p className="mt-1.5 text-sm text-pearl-200/90">
                      {item.val}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3 pt-3 sm:flex-row">
                <Button asChild variant="gold">
                  <Link href={localePath(locale, "/ingressos")}>
                    <Ticket className="size-4" />
                    {v.ctaBuy}
                  </Link>
                </Button>
                <Button asChild variant="onDark">
                  <a
                    href={site.social.googleMaps}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MapIcon className="size-4" />
                    {v.ctaMaps}
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative aspect-[16/11] overflow-hidden md:aspect-auto md:h-full md:min-h-[420px]">
              <Image
                src={attractionImages["museu-de-minerais"]}
                alt={dict.attractions.items["museu-de-minerais"].name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                placeholder="blur"
                className="object-cover"
              />
              <div
                className="image-split-overlay absolute inset-0"
                aria-hidden="true"
              />
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}

function FinalCta({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const f = dict.finalCta;
  return (
    <section className="py-20 sm:py-28 md:py-36">
      <Container size="md" className="text-center">
        <AnimateIn>
          <span className="ornament font-display text-[0.65rem] uppercase tracking-[0.3em]">
            {f.eyebrow}
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl leading-tight sm:text-5xl md:text-[3.2rem]">
            {f.titleLead}{" "}
            <em className="italic text-champagne-600">{f.titleEm}</em>{" "}
            {f.titleTail}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-pearl-700 sm:text-lg">
            {f.description}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="gold">
              <Link href={localePath(locale, "/ingressos")}>
                {f.ctaBuy}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href={localePath(locale, "/contato")}>{f.ctaContact}</Link>
            </Button>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}

// Unused but needed by aliasing
void iconMap;
