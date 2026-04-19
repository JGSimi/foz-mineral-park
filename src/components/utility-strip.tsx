"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

import { localeLabel, locales, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/provider";
import { localePath, stripLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * Faixa fina acima da navbar (desktop-only). Endereço + status em tempo
 * real + seletor de idioma funcional. Cada botão de idioma leva à mesma
 * rota no novo locale.
 */
export function UtilityStrip() {
  const { locale, dict } = useLocale();
  const pathname = usePathname();
  const [status, setStatus] = useState<{ open: boolean; label: string }>({
    open: true,
    label: dict.utility.openNow,
  });

  useEffect(() => {
    const compute = () => {
      const now = new Date();
      const hour = now.getHours();
      const open = hour >= 9 && hour < 18;
      setStatus({
        open,
        label: open ? dict.utility.openNow : dict.utility.closedNow,
      });
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, [dict.utility.openNow, dict.utility.closedNow]);

  const basePath = stripLocale(pathname);

  return (
    <div className="hidden h-[30px] items-center gap-5 border-b border-champagne-400/10 bg-obsidian-950 px-7 text-[0.6rem] uppercase tracking-[0.22em] text-pearl-100/55 md:flex">
      <span className="inline-flex items-center gap-1.5">
        <MapPin className="size-2.5 text-champagne-300" strokeWidth={1.4} />
        <span>{dict.utility.addressLabel}</span>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <span
          aria-hidden="true"
          className={cn(
            "inline-block size-[5px] rounded-full",
            status.open
              ? "bg-[#6aa87a] shadow-[0_0_0_3px_rgba(106,168,122,0.18)]"
              : "bg-pearl-600 shadow-[0_0_0_3px_rgba(118,105,84,0.18)]",
          )}
        />
        <span>{status.label}</span>
      </span>
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
