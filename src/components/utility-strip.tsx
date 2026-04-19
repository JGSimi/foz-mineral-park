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
 *
 * A paleta troca quando a página é scrollada: no topo fica clara
 * (sobre o hero pearl) e vira dark ao descer pro conteúdo escuro.
 */
export function UtilityStrip({ scrolled = false }: { scrolled?: boolean }) {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const basePath = stripLocale(pathname);

  const iconTint = scrolled ? "text-champagne-300" : "text-champagne-700";

  return (
    <div
      className={cn(
        "hidden h-[30px] items-center gap-5 border-b px-7 text-[0.6rem] uppercase tracking-[0.22em] transition-colors duration-500 md:flex",
        scrolled
          ? "border-champagne-400/10 bg-obsidian-950 text-pearl-100/55"
          : "border-champagne-700/15 bg-pearl-50/40 text-obsidian-900/65 backdrop-blur-sm",
      )}
    >
      <span className="inline-flex items-center gap-1.5">
        <MapPin className={cn("size-2.5", iconTint)} strokeWidth={1.4} />
        <span>{dict.utility.addressLabel}</span>
      </span>
      <a
        href={site.social.googleMaps}
        target="_blank"
        rel="noreferrer"
        aria-label={dict.common.openInMaps}
        className={cn(
          "inline-flex items-center gap-1.5 transition-colors",
          scrolled
            ? "hover:text-champagne-300 focus-visible:text-champagne-300"
            : "hover:text-champagne-700 focus-visible:text-champagne-700",
        )}
      >
        <Navigation className={cn("size-2.5", iconTint)} strokeWidth={1.4} />
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
            scrolled={scrolled}
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
  scrolled,
}: {
  locale: Locale;
  active: boolean;
  basePath: string;
  showDivider: boolean;
  scrolled: boolean;
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
            ? scrolled
              ? "text-champagne-300"
              : "text-champagne-700"
            : scrolled
              ? "text-pearl-100/40 hover:text-pearl-100/70"
              : "text-obsidian-900/45 hover:text-obsidian-900/75",
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
