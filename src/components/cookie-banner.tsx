"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/provider";
import { Button } from "./button";

const CONSENT_KEY = "fmp-consent-v1";
export const CONSENT_EVENT = "fmp-consent-resolved";

type Consent = "all" | "essential";

export function CookieBanner() {
  const { dict } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const stored = localStorage.getItem(CONSENT_KEY);
        if (!stored) setVisible(true);
      } catch {
        setVisible(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const save = (value: Consent) => {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ value, ts: new Date().toISOString() }),
      );
    } catch {}
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-body"
      style={{
        marginBottom: "env(safe-area-inset-bottom)",
      }}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-lg overflow-hidden rounded-2xl border border-champagne-300/25 bg-obsidian-950/95 p-4 shadow-luxe-dark backdrop-blur-md sm:inset-x-auto sm:right-5 sm:left-auto sm:bottom-5 sm:p-6"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-400/60 to-transparent"
      />
      <p
        id="cookie-title"
        className="font-display text-sm text-pearl-100 sm:text-base"
      >
        {dict.cookie.title}{" "}
        <em className="italic text-champagne-300">{dict.cookie.titleEm}</em>.
      </p>
      <p id="cookie-body" className="mt-1.5 text-xs text-pearl-200/80 sm:text-sm">
        {dict.cookie.body}{" "}
        <Link
          href="/politica-de-privacidade"
          className="underline decoration-champagne-400/60 underline-offset-4 hover:text-champagne-300"
        >
          {dict.cookie.policyLink}
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col-reverse gap-2 sm:mt-5 sm:flex-row sm:justify-end">
        <Button variant="onDark" size="sm" onClick={() => save("essential")}>
          {dict.cookie.acceptEssential}
        </Button>
        <Button variant="gold" size="sm" onClick={() => save("all")}>
          {dict.cookie.acceptAll}
        </Button>
      </div>
    </div>
  );
}
