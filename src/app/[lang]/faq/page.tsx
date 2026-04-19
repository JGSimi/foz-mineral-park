import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";

import { site } from "@/lib/site";
import { isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { localePath } from "@/i18n/routing";
import { Container } from "@/components/container";
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
  return { title: dict.faq.pageTitle };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);
  const f = dict.faq;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: f.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <PageHero
        accent="imperial"
        eyebrow={f.pageTitle}
        title={
          <>
            {f.heroTitleLead}{" "}
            <em className="italic text-champagne-300">{f.heroTitleEm}</em>
            {f.heroTitleTail}
          </>
        }
        description={f.heroDescription}
      />

      <section className="py-20 sm:py-24">
        <Container size="md">
          <dl className="divide-y divide-pearl-300 overflow-hidden rounded-3xl border border-pearl-300 bg-pearl-50 shadow-luxe">
            {f.items.map((item, i) => (
              <div
                key={item.q}
                className="flex gap-5 p-7 transition-colors hover:bg-pearl-100"
              >
                <span className="pt-1 font-display text-sm italic text-champagne-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <dt className="font-display text-lg text-obsidian-900">
                    {item.q}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-pearl-700">
                    {item.a}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="gold" size="lg">
              <Link href={localePath(locale, "/contato")}>{f.ctaStill}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href={`https://wa.me/${site.contact.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noreferrer"
              >
                {f.ctaWhatsapp}
              </a>
            </Button>
          </div>
        </Container>
      </section>

      <Script
        id="faq-ld-json"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
