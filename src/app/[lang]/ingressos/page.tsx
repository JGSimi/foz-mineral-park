import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, Info, ArrowRight, Ticket, Users } from "lucide-react";

import { site } from "@/lib/site";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localePath } from "@/i18n/routing";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";

type Params = { lang: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return {
    title: dict.tickets.pageTitle,
  };
}

export default async function IngressosPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const t = dict.tickets;

  return (
    <>
      <PageHero
        accent="champagne"
        eyebrow={t.pageTitle}
        title={
          <>
            {t.heroTitleLead}{" "}
            <em className="italic text-champagne-300">{t.heroTitleEm}</em>
            {t.heroTitleTail}
          </>
        }
        description={t.heroDescription}
      />

      <section className="py-20 sm:py-24">
        <Container size="md">
          <div className="frame-gold relative overflow-hidden rounded-3xl border border-transparent bg-pearl-50 p-10 shadow-luxe-lift sm:p-14">
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-champagne-700">
              {t.card.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl text-obsidian-900 sm:text-4xl">
              {t.card.titleLead}{" "}
              <em className="italic text-champagne-600">{t.card.titleEm}</em>{" "}
              {t.card.titleTail}
            </h2>
            <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-pearl-700">
              {t.card.description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="gold">
                <Link href={localePath(locale, "/contato")}>
                  <Ticket className="size-4" />
                  {t.card.ctaReserve}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href={`https://wa.me/${site.contact.whatsapp.replace("+", "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t.card.ctaWhatsapp}
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={t.included.eyebrow}
              title={
                <>
                  {t.included.titleLead}{" "}
                  <em className="italic text-champagne-600">
                    {t.included.titleEm}
                  </em>
                </>
              }
            />
            <ul className="mt-8 space-y-3.5 text-[0.95rem] text-obsidian-800">
              {t.included.items.map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-champagne-600" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading
              eyebrow={t.considerations.eyebrow}
              title={
                <>
                  {t.considerations.titleLead}{" "}
                  <em className="italic text-champagne-600">
                    {t.considerations.titleEm}
                  </em>
                </>
              }
            />
            <ul className="mt-8 space-y-3.5 text-[0.95rem] text-obsidian-800">
              {t.considerations.items.map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <Info className="mt-0.5 size-5 shrink-0 text-imperial-700" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container size="md">
          <div className="relative grid overflow-hidden rounded-3xl border border-champagne-400/20 bg-aurora p-10 text-pearl-100 sm:grid-cols-[1fr_auto] sm:items-center sm:p-14">
            <div className="grain absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-champagne-300">
                {t.agencies.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl text-pearl-100 sm:text-4xl">
                {t.agencies.titleLead}{" "}
                <em className="italic text-champagne-300">
                  {t.agencies.titleEm}
                </em>
              </h2>
              <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-pearl-200/85">
                {t.agencies.description}
              </p>
            </div>
            <Button asChild size="lg" variant="gold" className="relative">
              <Link href={`${localePath(locale, "/contato")}?assunto=agencias`}>
                <Users className="size-4" />
                {t.agencies.cta}
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
