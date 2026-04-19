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
import { attractionImages, heroPoster } from "@/lib/images";
import { getDictionary } from "@/i18n/get-dictionary";
import { isLocale, type Locale } from "@/i18n/config";
import { localePath } from "@/i18n/routing";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { HeroVideo } from "@/components/hero-video";
import { AnimateIn, Stagger, StaggerItem } from "@/components/animate";
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
      <Attractions dict={dict} locale={locale} />
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
    <section className="relative -mt-16 overflow-hidden pb-32 pt-40 sm:-mt-20 sm:pt-52">
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

      <Container className="grid items-center gap-16 md:grid-cols-[1.05fr_1fr]">
        <AnimateIn className="space-y-8 text-pearl-100" y={24}>
          <p className="inline-flex items-center gap-2 rounded-full border border-champagne-300/30 bg-white/5 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.28em] text-champagne-300 backdrop-blur">
            <Sparkles className="size-3.5" />
            {h.locationBadge}
          </p>
          <h1 className="text-balance font-display text-5xl leading-[0.98] sm:text-6xl md:text-[4.4rem]">
            {h.titleLead}{" "}
            <em className="italic text-gilded">{h.titleEm}</em>
            {h.titleTail}
          </h1>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-pearl-200/90 sm:text-lg">
            {h.description}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="gold">
              <Link href={localePath(locale, "/ingressos")}>
                <Ticket className="size-4" />
                {h.ctaBuy}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="onDark">
              <Link href={localePath(locale, "/como-chegar")}>
                <MapIcon className="size-4" />
                {h.ctaHowTo}
              </Link>
            </Button>
          </div>
          <dl className="grid max-w-xl grid-cols-3 gap-6 border-t border-champagne-300/15 pt-8 text-sm text-pearl-200">
            {h.stats.map((s) => (
              <div key={s.k}>
                <dt className="text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300">
                  {s.k}
                </dt>
                <dd className="mt-2 font-display text-3xl text-pearl-100">
                  {s.v}
                </dd>
                <dd className="text-xs text-pearl-200/70">{s.d}</dd>
              </div>
            ))}
          </dl>
        </AnimateIn>

        <AnimateIn className="relative isolate" y={30} delay={0.12}>
          <div className="absolute -inset-12 -z-10 rounded-[48px] bg-gradient-to-br from-imperial-400/25 via-transparent to-champagne-400/25 blur-3xl" />
          <div className="float-a frame-gold relative overflow-hidden rounded-[32px] shadow-luxe-dark">
            <Image
              src={attractionImages["gruta-de-ametista"]}
              alt={dict.attractions.items["gruta-de-ametista"].name}
              sizes="(max-width: 768px) 90vw, 480px"
              placeholder="blur"
              className="h-auto w-full object-cover"
              priority
            />
            <div
              className="card-media-overlay absolute inset-0"
              aria-hidden="true"
            />
          </div>
          <div className="float-b absolute -bottom-8 -left-6 hidden sm:block">
            <div className="w-52 -rotate-[4deg] rounded-2xl border border-champagne-300/20 bg-obsidian-900/85 p-4 shadow-luxe-dark backdrop-blur">
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300">
                {h.photoBadge.k}
              </p>
              <p className="mt-1 font-display text-lg italic text-pearl-100">
                {h.photoBadge.title}
              </p>
              <p className="text-xs text-pearl-200/70">{h.photoBadge.sub}</p>
            </div>
          </div>
          <div className="float-c absolute -top-6 right-6 hidden sm:block">
            <div className="rotate-[3deg] rounded-full border border-champagne-300/30 bg-obsidian-900/80 px-4 py-2 text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300 backdrop-blur">
              {h.pillLocation}
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}

function QuickFacts({ dict }: { dict: Dictionary }) {
  const icons = [Clock, MapPin, Accessibility];
  return (
    <section className="relative">
      <Container className="-mt-16">
        <Stagger className="relative grid gap-0 rounded-[22px] border border-champagne-400/22 bg-pearl-50 p-1 sm:grid-cols-3">
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

function Attractions({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <section id="atracoes" className="py-28 sm:py-36">
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

        <Stagger className="h-scroll -mx-5 mt-16 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:snap-none md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
          {site.attractions.map((a, i) => {
            const t = dict.attractions.items[
              a.slug as keyof typeof dict.attractions.items
            ];
            return (
              <StaggerItem
                key={a.slug}
                as="article"
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
                      sizes="(max-width: 768px) 90vw, 33vw"
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
                  <div className="flex flex-1 flex-col gap-3 p-7">
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
              </StaggerItem>
            );
          })}
        </Stagger>
        {/* Indicador "arraste" mobile */}
        <div
          className="mt-4 flex items-center justify-center gap-1.5 text-[0.6rem] uppercase tracking-[0.28em] text-pearl-600 md:hidden"
          aria-hidden="true"
        >
          <span>←</span>
          <span>Arraste</span>
          <span>→</span>
        </div>
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

function WhyVisit({ dict }: { dict: Dictionary }) {
  const icons = [Gem, Sparkles, Camera, Accessibility];
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
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
    <section className="py-28 sm:py-36">
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
    <section className="py-28 sm:py-36">
      <Container>
        <AnimateIn>
          <div className="relative grid overflow-hidden rounded-3xl border border-champagne-400/15 bg-aurora text-pearl-100 md:grid-cols-[1.1fr_1fr]">
            <div className="grain absolute inset-0" aria-hidden="true" />
            <div className="relative space-y-8 p-10 sm:p-16">
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

            <div className="relative min-h-[360px] overflow-hidden">
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
    <section className="py-28 sm:py-36">
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
