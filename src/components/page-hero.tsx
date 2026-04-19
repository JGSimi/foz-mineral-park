import type { ReactNode } from "react";
import { Container } from "./container";
import { cn } from "@/lib/utils";

type Accent = "imperial" | "champagne" | "jade";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  actions?: ReactNode;
  accent?: Accent;
}

const accentGlow: Record<Accent, string> = {
  imperial:
    "bg-[radial-gradient(ellipse_at_top_right,rgba(146,77,142,0.35)_0%,transparent_55%)]",
  champagne:
    "bg-[radial-gradient(ellipse_at_top_right,rgba(200,147,71,0.28)_0%,transparent_55%)]",
  jade:
    "bg-[radial-gradient(ellipse_at_top_right,rgba(74,131,114,0.28)_0%,transparent_55%)]",
};

export function PageHero({
  eyebrow,
  title,
  description,
  align = "center",
  actions,
  accent = "imperial",
}: PageHeroProps) {
  return (
    <section className="relative -mt-16 overflow-hidden pb-12 pt-28 sm:-mt-20 sm:pb-16 sm:pt-48">
      <div className="bg-geode absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className={cn("absolute inset-0 -z-10", accentGlow[accent])}
        aria-hidden="true"
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="page-hero-overlay absolute inset-x-0 top-0 -z-10 h-full"
        aria-hidden="true"
      />
      <Container
        size="md"
        className={align === "center" ? "text-center" : undefined}
      >
        {eyebrow && (
          <span
            className={
              align === "center"
                ? "ornament font-display text-[0.65rem] uppercase tracking-[0.3em] text-champagne-300"
                : "inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-champagne-300"
            }
          >
            {eyebrow}
          </span>
        )}
        <h1 className="mt-5 text-balance font-display text-[2.4rem] leading-[1.04] text-pearl-100 sm:mt-6 sm:text-6xl sm:leading-[1.02] md:text-[4.2rem]">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-pearl-200/85 sm:mt-6 sm:text-lg">
            {description}
          </p>
        )}
        {actions && (
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {actions}
          </div>
        )}
      </Container>
    </section>
  );
}

/** Variação clara, para páginas institucionais (política, termos). */
export function LegalHero({
  eyebrow,
  title,
  meta,
}: {
  eyebrow: string;
  title: string;
  meta?: string;
}) {
  return (
    <section className="relative -mt-16 overflow-hidden pb-8 pt-28 sm:-mt-20 sm:pb-10 sm:pt-48">
      <div
        className="absolute inset-0 -z-10 bg-parchment-grid opacity-70"
        aria-hidden="true"
      />
      <Container size="md">
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-champagne-700">
          {eyebrow}
        </p>
        <h1 className="mt-4 font-display text-[2.25rem] leading-tight text-obsidian-900 sm:text-5xl">
          {title}
        </h1>
        {meta && <p className="mt-3 text-sm text-pearl-600">{meta}</p>}
      </Container>
    </section>
  );
}
