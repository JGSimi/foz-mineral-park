"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Navigation } from "lucide-react";

import { site } from "@/lib/site";
import { localeLabel, locales, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/provider";
import { localePath, stripLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Faixa fina acima da navbar (desktop-only).
 * Endereço · Link para Google Maps · Seletor de idioma.
 */
export function UtilityStrip() {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const basePath = stripLocale(pathname);

  return (
    <div className="hidden h-[30px] items-center gap-5 border-b border-champagne-400/10 bg-obsidian-950 px-7 text-[0.6rem] uppercase tracking-[0.22em] text-pearl-100/55 md:flex">
      <span className="inline-flex items-center gap-1.5">
        <MapPin className="size-2.5 text-champagne-300" strokeWidth={1.4} />
        <span>{dict.utility.addressLabel}</span>
      </span>
      <a
        href={site.social.googleMaps}
        target="_blank"
        rel="noreferrer"
        aria-label={dict.common.openInMaps}
        className="inline-flex items-center gap-1.5 transition-colors hover:text-champagne-300 focus-visible:text-champagne-300"
      >
        <Navigation className="size-2.5 text-champagne-300" strokeWidth={1.4} />
        <span>{dict.utility.mapLabel}</span>
      </a>
      <span className="ml-auto inline-flex items-center gap-3">
        {locales.map((l, i) => (
          <LocaleLink
            key={l}
            locale={l}
            active={locale === l}
            basePath={basePath}
            showDivider={i < locales.length - 1}
          />
        ))}
      </span>
    </div>
  );
}

function LocaleLink({
  locale,
  active,
  basePath,
  showDivider,
}: {
  locale: Locale;
  active: boolean;
  basePath: string;
  showDivider: boolean;
}) {
  const href = localePath(locale, basePath);
  return (
    <>
      <Link
        href={href}
        aria-current={active ? "true" : undefined}
        hrefLang={locale}
        className={cn(
          "transition-colors duration-300",
          active
            ? "text-champagne-300"
            : "text-pearl-100/40 hover:text-pearl-100/70",
        )}
      >
        {localeLabel[locale]}
      </Link>
      {showDivider && (
        <span aria-hidden="true" className="opacity-30">
          ·
        </span>
      )}
    </>
  );
}
