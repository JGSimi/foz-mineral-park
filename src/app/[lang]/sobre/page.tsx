import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localePath } from "@/i18n/routing";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
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
  return { title: dict.about.pageTitle };
}

export default async function SobrePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const a = dict.about;

  return (
    <>
      <PageHero
        accent="imperial"
        eyebrow={a.pageTitle}
        title={
          <>
            {a.heroTitleLead}{" "}
            <em className="italic text-champagne-300">{a.heroTitleEm}</em>
            {a.heroTitleTail}
          </>
        }
        description={dict.meta.longDescription}
      />

      <section className="py-20 sm:py-28">
        <Container className="grid gap-6 md:grid-cols-3">
          {a.milestones.map((m) => (
            <article
              key={m.title}
              className="relative overflow-hidden rounded-3xl border border-pearl-300 bg-pearl-50 p-8 transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne-300 hover:shadow-luxe-lift"
            >
              <span className="absolute right-6 top-6 font-display text-5xl italic text-champagne-400/60">
                {m.numeral}
              </span>
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-champagne-700">
                {m.label}
              </p>
              <h2 className="mt-4 max-w-[14ch] font-display text-2xl text-obsidian-900">
                {m.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-pearl-700">
                {m.body}
              </p>
            </article>
          ))}
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="relative grid gap-12 overflow-hidden rounded-3xl border border-champagne-400/20 bg-aurora p-10 text-pearl-100 sm:p-16 md:grid-cols-2">
            <div className="grain absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <SectionHeading
                eyebrow={a.manifestoEyebrow}
                title={
                  <>
                    {a.manifestoTitleLead}{" "}
                    <em className="italic text-champagne-300">
                      {a.manifestoTitleEm}
                    </em>{" "}
                    {a.manifestoTitleTail}
                  </>
                }
                tone="dark"
              />
            </div>
            <div className="relative space-y-4 text-[0.95rem] leading-relaxed text-pearl-200/90">
              {a.manifesto.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container size="md" className="text-center">
          <SectionHeading
            align="center"
            eyebrow={a.ctaEyebrow}
            title={
              <>
                {a.ctaTitleLead}{" "}
                <em className="italic text-champagne-600">{a.ctaTitleEm}</em>
                {a.ctaTitleTail}
              </>
            }
          />
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="gold" size="lg">
              <Link href={localePath(locale, "/ingressos")}>{a.ctaBuy}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={localePath(locale, "/como-chegar")}>
                {a.ctaHowTo}
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
