import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Ticket, Sparkles } from "lucide-react";
import type { Metadata } from "next";

import { site } from "@/lib/site";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { GemIllustration } from "@/components/gem-illustration";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return site.attractions.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = site.attractions.find((x) => x.slug === slug);
  if (!a) return {};
  return {
    title: a.name,
    description: a.long,
    openGraph: {
      title: `${a.name} — ${site.name}`,
      description: a.long,
    },
  };
}

export default async function AttractionPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const attraction = site.attractions.find((a) => a.slug === slug);
  if (!attraction) notFound();

  const otherAttractions = site.attractions.filter((a) => a.slug !== slug);

  return (
    <>
      <section className="relative -mt-16 overflow-hidden pb-16 pt-36 sm:-mt-20 sm:pt-44">
        <div className="bg-geode absolute inset-0 -z-10" aria-hidden="true" />
        <Container className="grid items-center gap-12 md:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6 text-white">
            <Link
              href="/#atracoes"
              className="inline-flex items-center gap-2 text-sm text-citrine-300 hover:text-citrine-200"
            >
              <ArrowLeft className="size-4" />
              Todas as atrações
            </Link>
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-citrine-300">
              {attraction.tagline}
            </p>
            <h1 className="text-balance text-5xl leading-[1.02] sm:text-6xl">
              {attraction.name}
            </h1>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-quartz-200 sm:text-lg">
              {attraction.long}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-quartz-200">
                <Sparkles className="size-3.5 text-citrine-300" />
                {attraction.badge}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-quartz-200">
                <Clock className="size-3.5 text-citrine-300" />
                Duração {attraction.duration}
              </span>
            </div>
            <div className="flex flex-col gap-3 pt-3 sm:flex-row">
              <Button asChild size="lg" variant="gold">
                <Link href="/ingressos">
                  <Ticket className="size-4" />
                  Comprar ingresso
                </Link>
              </Button>
              <Button asChild size="lg" variant="onDark">
                <Link href="/contato">Falar com a equipe</Link>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-[32px] border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
            <GemIllustration
              accent={attraction.accent}
              title={`${attraction.name}`}
            />
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-10 md:grid-cols-3">
          {[
            {
              k: "Tempo médio",
              v: attraction.duration,
              d: "Entre entrar e terminar com calma.",
            },
            {
              k: "Para quem é",
              v: "Todas as idades",
              d: "Roteiro pensado para famílias, agências e grupos escolares.",
            },
            {
              k: "Inclui",
              v: "Guia impresso",
              d: "Material explicativo bilíngue em PT/ES/EN.",
            },
          ].map((i) => (
            <div
              key={i.k}
              className="rounded-2xl border border-border bg-background p-7"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-amethyst-700">
                {i.k}
              </p>
              <p className="mt-3 font-display text-2xl text-foreground">
                {i.v}
              </p>
              <p className="mt-2 text-sm text-quartz-600">{i.d}</p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <p className="text-xs uppercase tracking-[0.18em] text-amethyst-700">
            Continue explorando
          </p>
          <h2 className="mt-3 font-display text-3xl text-foreground">
            Outras atrações do parque
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {otherAttractions.map((a) => (
              <Link
                key={a.slug}
                href={`/atracoes/${a.slug}`}
                className="group flex items-center gap-5 rounded-2xl border border-border bg-background p-4 transition-shadow hover:shadow-md"
              >
                <div className="aspect-square w-24 overflow-hidden rounded-xl">
                  <GemIllustration accent={a.accent} title={a.name} />
                </div>
                <div className="flex-1">
                  <p className="text-xs uppercase tracking-[0.16em] text-amethyst-700">
                    {a.tagline}
                  </p>
                  <p className="font-display text-xl text-foreground">
                    {a.name}
                  </p>
                  <p className="mt-1 text-sm text-quartz-600">{a.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
