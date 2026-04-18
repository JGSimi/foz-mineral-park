import type { ReactNode } from "react";
import { Container } from "./container";

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  actions?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  align = "center",
  actions,
}: PageHeroProps) {
  return (
    <section className="relative -mt-16 overflow-hidden pb-16 pt-36 sm:-mt-20 sm:pt-48">
      <div className="bg-geode absolute inset-0 -z-10" aria-hidden="true" />
      <div className="grain absolute inset-0 -z-10" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(ellipse_at_top,rgba(244,234,209,0.08),transparent_55%)]"
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
        <h1 className="mt-6 text-balance font-display text-5xl leading-[1.02] text-pearl-100 sm:text-6xl md:text-[4.2rem]">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-pearl-200/85">
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
