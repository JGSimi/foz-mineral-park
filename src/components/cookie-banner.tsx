"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./button";

const CONSENT_KEY = "fmp-consent-v1";

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
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-xl rounded-2xl border border-border bg-background/95 p-5 shadow-xl backdrop-blur sm:inset-x-auto sm:right-5 sm:left-auto"
    >
      <p id="cookie-title" className="font-display text-base text-foreground">
        Sua privacidade importa.
      </p>
      <p className="mt-1 text-sm text-quartz-600">
        Usamos apenas cookies essenciais para o funcionamento do site. Dados
        anônimos de visita ajudam a melhorar a experiência. Você escolhe.{" "}
        <Link
          href="/politica-de-privacidade"
          className="underline hover:text-foreground"
        >
          Leia a Política de Privacidade
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        <Button variant="outline" size="sm" onClick={() => save("essential")}>
          Apenas essenciais
        </Button>
        <Button variant="primary" size="sm" onClick={() => save("all")}>
          Aceitar tudo
        </Button>
      </div>
    </div>
  );
}
