import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Car, Bus, Plane, MapPin, Clock, Accessibility } from "lucide-react";

import { site } from "@/lib/site";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
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
  return { title: dict.howTo.pageTitle };
}

export default async function ComoChegarPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const h = dict.howTo;
  const routeIcons = [Car, Bus, Plane];

  return (
    <>
      <PageHero
        accent="imperial"
        eyebrow={h.pageTitle}
        title={
          <>
            {h.heroTitleLead}{" "}
            <em className="italic text-champagne-300">{h.heroTitleEm}</em>{" "}
            {h.heroTitleTail}
          </>
        }
        description={h.heroDescription}
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-6 md:grid-cols-3">
          {h.routes.map((r, i) => {
            const Icon = routeIcons[i] ?? Car;
            return (
              <div
                key={r.title}
                className="rounded-3xl border border-pearl-300 bg-pearl-50 p-8 transition-all duration-500 hover:border-champagne-300 hover:shadow-luxe-lift"
              >
                <div className="inline-flex size-11 items-center justify-center rounded-full border border-champagne-400/40 bg-obsidian-900 text-champagne-300">
                  <Icon className="size-5" />
                </div>
                <h2 className="mt-5 font-display text-xl text-obsidian-900">
                  {r.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-pearl-700">
                  {r.body}
                </p>
              </div>
            );
          })}
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="frame-gold overflow-hidden rounded-3xl border border-transparent bg-pearl-50 shadow-luxe">
            <iframe
              title={`${site.name} — ${h.infoLabels.address}`}
              src="https://www.google.com/maps?q=Av.+das+Cataratas+6025+Foz+do+Iguacu&output=embed"
              className="aspect-[16/9] w-full border-0 grayscale-[20%] transition-all hover:grayscale-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="grid gap-4 p-8 sm:grid-cols-3">
              <InfoLine
                icon={MapPin}
                label={h.infoLabels.address}
                value={site.address.full}
              />
              <InfoLine
                icon={Clock}
                label={h.infoLabels.hours}
                value={`${site.hours.summary} · ${site.hours.lastEntry}`}
              />
              <InfoLine
                icon={Accessibility}
                label={h.infoLabels.accessibility}
                value={h.accessibility}
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container size="md" className="text-center">
          <SectionHeading
            align="center"
            eyebrow={h.ctaEyebrow}
            title={
              <>
                {h.ctaTitleLead}{" "}
                <em className="italic text-champagne-600">{h.ctaTitleEm}</em>
              </>
            }
          />
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="gold">
              <a
                href={site.social.googleMaps}
                target="_blank"
                rel="noreferrer"
              >
                {h.ctaMaps}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={`https://wa.me/${site.contact.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noreferrer"
              >
                {h.ctaWhatsapp}
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}

function InfoLine({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-5 shrink-0 text-champagne-700" />
      <div>
        <p className="text-[0.6rem] uppercase tracking-[0.28em] text-pearl-600">
          {label}
        </p>
        <p className="mt-1 text-sm text-obsidian-900">{value}</p>
      </div>
    </div>
  );
}
