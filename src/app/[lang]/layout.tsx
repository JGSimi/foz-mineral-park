import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";

import { site } from "@/lib/site";
import {
  htmlLang,
  isLocale,
  locales,
  ogLocale,
  type Locale,
} from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { LocaleProvider } from "@/i18n/provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CookieBanner } from "@/components/cookie-banner";
import { WhatsAppFloating } from "@/components/whatsapp-floating";
import { PageTransition } from "@/components/page-transition";

type LangParams = { lang: string };

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<LangParams>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  const title = `${site.name} — ${dict.meta.tagline}`;
  const url = `${site.url}/${lang}`;
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [htmlLang[l], `${site.url}/${l}`]),
  );

  return {
    title: { default: title, template: `%s · ${site.name}` },
    description: dict.meta.shortDescription,
    keywords: dict.meta.keywords as string[],
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      url,
      siteName: site.name,
      title,
      description: dict.meta.shortDescription,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: site.name,
      description: dict.meta.shortDescription,
      images: ["/og.jpg"],
    },
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": `${site.url}/${locales[0]}` },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LangParams>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristAttraction",
        "@id": `${site.url}/${locale}#attraction`,
        name: site.name,
        description: dict.meta.longDescription,
        url: `${site.url}/${locale}`,
        telephone: site.contact.phone,
        image: `${site.url}/og.jpg`,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.geo.latitude,
          longitude: site.geo.longitude,
        },
        openingHoursSpecification: site.hours.days.map((d) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: d.open,
          closes: d.close,
        })),
        isAccessibleForFree: false,
        publicAccess: true,
        sameAs: [site.social.instagram, site.social.facebook],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${site.url}/${locale}#localbusiness`,
        name: site.company.legalName,
        url: `${site.url}/${locale}`,
        telephone: site.contact.phone,
        priceRange: "R$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.street,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.postalCode,
          addressCountry: site.address.country,
        },
      },
    ],
  };

  return (
    <LocaleProvider locale={locale} dict={dict}>
      {/* next/html lang já foi setado no root. Aqui só ajustamos no cliente via Navbar/providers. */}
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-imperial-700 focus:px-4 focus:py-2 focus:text-white"
      >
        {dict.common.skipToContent}
      </a>
      <Navbar />
      <main id="conteudo" tabIndex={-1} className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer locale={locale} dict={dict} />
      <WhatsAppFloating />
      <CookieBanner />
      <Script
        id="ld-json"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </LocaleProvider>
  );
}
