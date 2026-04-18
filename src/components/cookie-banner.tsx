"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./button";

const CONSENT_KEY = "fmp-consent-v1";
/** Custom event dispatched after consent (accept or essential-only) */
export const CONSENT_EVENT = "fmp-consent-resolved";

type Consent = "all" | "essential";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (!stored) setVisible(true);
    } catch {
      setVisible(true);
    }
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
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl overflow-hidden rounded-2xl border border-champagne-300/25 bg-obsidian-950/95 p-6 shadow-luxe-dark backdrop-blur-md sm:inset-x-auto sm:right-5 sm:left-auto"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-400/60 to-transparent"
      />
      <p
        id="cookie-title"
        className="font-display text-base text-pearl-100"
      >
        Sua privacidade <em className="italic text-champagne-300">importa</em>.
      </p>
      <p id="cookie-body" className="mt-1.5 text-sm text-pearl-200/80">
        Usamos apenas cookies essenciais para o funcionamento do site. Dados
        anônimos de visita ajudam a melhorar a experiência — você escolhe.{" "}
        <Link
          href="/politica-de-privacidade"
          className="underline decoration-champagne-400/60 underline-offset-4 hover:text-champagne-300"
        >
          Ler a Política
        </Link>
        .
      </p>
      <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="onDark" size="sm" onClick={() => save("essential")}>
          Apenas essenciais
        </Button>
        <Button variant="gold" size="sm" onClick={() => save("all")}>
          Aceitar tudo
        </Button>
      </div>
    </div>
  );
}
