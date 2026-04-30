"use client";

import Link from "next/link";
import { MapPin, Phone, Ticket } from "lucide-react";

import { localePath } from "@/i18n/routing";
import { useLocale } from "@/i18n/provider";
import { site } from "@/lib/site";

const phoneHref = `tel:${site.contact.phone.replace(/\s|\(|\)|-/g, "")}`;

export function MobileQuickActions() {
  const { locale, dict } = useLocale();
  const ticketsPath = localePath(locale, "/ingressos");

  return (
    <nav
      aria-label="Atalhos rápidos para celular"
      className="safe-bottom safe-pl safe-pr fixed inset-x-0 bottom-0 z-40 border-t border-champagne-300/20 bg-obsidian-950/95 px-2 pb-2 pt-2 backdrop-blur-md md:hidden"
    >
      <ul className="grid grid-cols-3 gap-2">
        <li>
          <Link
            href={ticketsPath}
            className="flex min-h-14 flex-col items-center justify-center rounded-2xl bg-champagne-400/20 px-2 py-1.5 text-center text-[0.66rem] font-semibold tracking-[0.12em] text-champagne-200 uppercase active:scale-[0.98]"
          >
            <Ticket className="mb-1 size-4" aria-hidden="true" />
            {dict.navbar.ctaBuy}
          </Link>
        </li>
        <li>
          <a
            href={phoneHref}
            className="flex min-h-14 flex-col items-center justify-center rounded-2xl border border-pearl-100/20 px-2 py-1.5 text-center text-[0.66rem] font-semibold tracking-[0.12em] text-pearl-100 uppercase active:scale-[0.98]"
          >
            <Phone className="mb-1 size-4" aria-hidden="true" />
            {dict.common.callNow}
          </a>
        </li>
        <li>
          <a
            href={site.social.googleMaps}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-14 flex-col items-center justify-center rounded-2xl border border-pearl-100/20 px-2 py-1.5 text-center text-[0.66rem] font-semibold tracking-[0.12em] text-pearl-100 uppercase active:scale-[0.98]"
          >
            <MapPin className="mb-1 size-4" aria-hidden="true" />
            {dict.common.mapsShort}
          </a>
        </li>
      </ul>
    </nav>
  );
}
