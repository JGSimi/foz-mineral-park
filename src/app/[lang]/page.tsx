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
import { HeroTitle } from "@/components/home/hero-title";
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
  const icons = [Clock, MapPin, Accessibility];
  const compactHero = h.description.length < 80;

  return (
    <section className="relative isolate overflow-hidden pb-20 pt-24 sm:pb-24 sm:pt-28 md:min-h-[100svh] md:pt-32">
      <div
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_50%_0%,rgba(200,149,71,0.2),transparent_34%),linear-gradient(180deg,var(--color-pearl-50)_0%,var(--color-pearl-100)_48%,var(--color-pearl-200)_100%)]"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="bg-parchment-grid absolute inset-0 -z-10 opacity-45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[22rem] -z-10 h-[34rem] w-[82rem] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(89,47,126,0.18),rgba(200,149,71,0.1)_38%,transparent_70%)] blur-3xl"
      />

      <Container size="xl">
        <AnimateIn className="group/hero-copy mx-auto max-w-5xl text-center" y={22}>
          <p className="mx-auto inline-flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-champagne-700">
            <MapPin className="size-3.5" />
            {h.locationBadge}
          </p>
          <HeroTitle
            compact={compactHero}
            titleEm={h.titleEm}
            titleLead={h.titleLead}
            titleTail={h.titleTail}
          />
          <div
            aria-hidden="true"
            className="mx-auto mt-5 h-px w-full max-w-lg bg-gradient-to-r from-transparent via-champagne-400/55 to-transparent"
          />
          <p
            className={`mx-auto max-w-2xl text-pretty leading-relaxed text-pearl-700 ${
              compactHero
                ? "mt-5 font-display text-[1.45rem] text-pearl-800 sm:text-[1.9rem]"
                : "mt-6 text-base sm:text-lg"
            }`}
          >
            {h.description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
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
              variant="outline"
              className="w-full sm:w-auto"
            >
              <Link href={localePath(locale, "/como-chegar")}>
                <MapIcon className="size-4" />
                {h.ctaHowTo}
              </Link>
            </Button>
          </div>
        </AnimateIn>

        <AnimateIn className="relative mx-auto mt-6 max-w-6xl" y={30} delay={0.12}>
          <div className="pointer-events-none absolute inset-x-8 bottom-8 h-28 rounded-[50%] bg-obsidian-950/18 blur-3xl" />
          <HeroStone
            dict={dict}
            className="w-[min(84vw,520px)] sm:w-[min(60vw,620px)]"
          />
        </AnimateIn>

        <Container size="lg" className="relative z-10 -mt-4 px-0 sm:-mt-8">
          <Stagger className="relative grid overflow-hidden rounded-[28px] border border-champagne-400/30 bg-pearl-50/78 p-1 shadow-[0_24px_80px_-42px_rgba(10,9,16,0.45)] backdrop-blur-xl sm:grid-cols-3">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-6 left-1/3 hidden w-px bg-gradient-to-b from-transparent via-champagne-400/35 to-transparent sm:block"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-6 left-2/3 hidden w-px bg-gradient-to-b from-transparent via-champagne-400/35 to-transparent sm:block"
            />
            {h.stats.map((s) => (
              <StaggerItem
                key={s.k}
                className="flex items-baseline justify-between gap-4 px-6 py-5 sm:block sm:px-8 sm:py-7"
              >
                <p className="text-[0.58rem] uppercase tracking-[0.26em] text-champagne-700">
                  {s.k}
                </p>
                <p className="font-display text-4xl leading-none text-obsidian-900 sm:mt-3 sm:text-5xl">
                  {s.v}
                </p>
                <p className="text-right text-[0.75rem] text-pearl-700 sm:mt-2 sm:text-left sm:text-xs">
                  {s.d}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>

        <Stagger className="mx-auto mt-8 grid max-w-5xl gap-3 text-sm sm:grid-cols-3">
          {dict.quickFacts.map((f, i) => {
            const Icon = icons[i];
            return (
              <StaggerItem
                key={f.label}
                className="flex items-start gap-3 rounded-2xl border border-pearl-300/70 bg-pearl-50/55 px-4 py-4 backdrop-blur"
              >
                <div className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-champagne-400/45 bg-pearl-100 text-champagne-700">
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
  const detail = dict.attractions.detail;
  const cards = [
    {
      icon: Clock,
      k: v.labels.hours,
      val: `${site.hours.summary}. ${site.hours.lastEntry}.`,
    },
    {
      icon: MapPin,
      k: v.labels.address,
      val: site.address.full,
    },
    {
      icon: Accessibility,
      k: v.labels.accessibility,
      val: v.values.accessibility,
    },
    {
      icon: Sparkles,
      k: detail.audienceKey,
      val: detail.audienceDetail,
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 sm:py-28 md:py-36">
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--color-pearl-100),var(--color-pearl-50)_50%,var(--color-pearl-100))]"
        aria-hidden="true"
      />
      <Container size="xl">
        <AnimateIn>
          <div className="grid gap-4 md:grid-cols-4 md:grid-rows-[auto_auto]">
            <div className="relative isolate overflow-hidden rounded-[28px] border border-champagne-400/20 bg-aurora p-8 text-pearl-100 shadow-luxe-dark sm:p-10 md:col-span-2 md:row-span-3 md:p-12">
              <span
                aria-hidden="true"
                className="absolute right-8 top-8 font-display text-8xl italic leading-none text-champagne-300/10"
              >
                03
              </span>
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
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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

            <div className="relative min-h-[280px] overflow-hidden rounded-[28px] border border-pearl-300 bg-pearl-50 shadow-luxe md:col-span-2">
              <Image
                src={attractionImages["museu-de-minerais"]}
                alt={dict.attractions.items["museu-de-minerais"].name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                placeholder="blur"
                className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.04]"
              />
              <div
                className="image-split-overlay absolute inset-0"
                aria-hidden="true"
              />
              <div className="absolute bottom-5 left-5 rounded-2xl border border-pearl-100/20 bg-obsidian-950/65 px-4 py-3 text-pearl-100 backdrop-blur">
                <p className="text-[0.58rem] uppercase tracking-[0.28em] text-champagne-200">
                  {dict.attractions.items["museu-de-minerais"].badge}
                </p>
                <p className="mt-1 font-display text-2xl">
                  {dict.attractions.items["museu-de-minerais"].name}
                </p>
              </div>
            </div>

            {cards.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.k}
                  className="relative overflow-hidden rounded-[28px] border border-pearl-300 bg-pearl-50 p-6 shadow-luxe transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne-300 hover:shadow-luxe-lift"
                >
                  <div className="inline-flex size-10 items-center justify-center rounded-full border border-champagne-400/40 bg-obsidian-900 text-champagne-200">
                    <Icon className="size-4" />
                  </div>
                  <p className="mt-5 text-[0.58rem] uppercase tracking-[0.28em] text-champagne-700">
                    {item.k}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-pearl-700">
                    {item.val}
                  </p>
                </div>
              );
            })}
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
