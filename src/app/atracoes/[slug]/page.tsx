import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Ticket, Sparkles } from "lucide-react";
import type { Metadata } from "next";

import { site } from "@/lib/site";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { AnimateIn, Stagger, StaggerItem } from "@/components/animate";

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
      images: [a.image],
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
      <section className="relative -mt-16 overflow-hidden pb-20 pt-36 sm:-mt-20 sm:pt-52">
        {/* Imagem de fundo */}
        <div className="absolute inset-0 -z-20" aria-hidden="true">
          <Image
            src={attraction.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover scale-105"
          />
        </div>
        <div
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(5,5,8,0.88)_0%,rgba(10,9,16,0.8)_50%,rgba(23,14,26,0.92)_100%)]"
          aria-hidden="true"
        />
        <div className="grain absolute inset-0 -z-10" aria-hidden="true" />

        <Container className="grid items-center gap-14 md:grid-cols-[1fr_1.05fr]">
          <AnimateIn className="space-y-7 text-pearl-100" y={24}>
            <Link
              href="/#atracoes"
              className="inline-flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.28em] text-champagne-300 transition-colors hover:text-champagne-200"
            >
              <ArrowLeft className="size-3.5" />
              Todas as atrações
            </Link>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-champagne-300">
              {attraction.tagline}
            </p>
            <h1 className="text-balance font-display text-5xl leading-[0.98] sm:text-6xl md:text-[4rem]">
              {attraction.name}
            </h1>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-pearl-200/85 sm:text-lg">
              {attraction.long}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-champagne-300/30 bg-white/5 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.22em] text-champagne-200 backdrop-blur">
                <Sparkles className="size-3.5 text-champagne-300" />
                {attraction.badge}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-champagne-300/30 bg-white/5 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.22em] text-champagne-200 backdrop-blur">
                <Clock className="size-3.5 text-champagne-300" />
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
          </AnimateIn>
          <AnimateIn className="relative isolate" y={30} delay={0.12}>
            <div className="absolute -inset-10 -z-10 rounded-[48px] bg-gradient-to-br from-imperial-400/30 via-transparent to-champagne-400/30 blur-3xl" />
            <div className="frame-gold overflow-hidden rounded-[32px] shadow-luxe-dark">
              <Image
                src={attraction.image}
                alt={`${attraction.name} — ${attraction.tagline}`}
                width={900}
                height={1100}
                sizes="(max-width: 768px) 90vw, 500px"
                className="h-auto w-full object-cover"
              />
            </div>
          </AnimateIn>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <Stagger className="grid gap-6 md:grid-cols-3">
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
              <StaggerItem
                key={i.k}
                className="rounded-3xl border border-pearl-300 bg-pearl-50 p-8 transition-all duration-500 hover:border-champagne-300 hover:shadow-luxe"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-champagne-700">
                  {i.k}
                </p>
                <p className="mt-3 font-display text-2xl text-obsidian-900">
                  {i.v}
                </p>
                <p className="mt-2 text-sm text-pearl-700">{i.d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <AnimateIn>
            <p className="ornament font-display text-[0.65rem] uppercase tracking-[0.28em] text-champagne-700">
              Continue explorando
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl text-obsidian-900">
              Outras atrações{" "}
              <em className="italic text-champagne-600">do parque</em>
            </h2>
          </AnimateIn>
          <Stagger className="mt-10 grid gap-5 md:grid-cols-2">
            {otherAttractions.map((a) => (
              <StaggerItem key={a.slug}>
                <Link
                  href={`/atracoes/${a.slug}`}
                  className="group flex items-center gap-5 rounded-2xl border border-pearl-300 bg-pearl-50 p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne-300 hover:shadow-luxe"
                >
                  <div className="frame-gold relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl">
                    <Image
                      src={a.image}
                      alt={a.name}
                      fill
                      sizes="112px"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-[0.65rem] uppercase tracking-[0.24em] text-champagne-700">
                      {a.tagline}
                    </p>
                    <p className="mt-1 font-display text-xl text-obsidian-900">
                      {a.name}
                    </p>
                    <p className="mt-1 text-sm text-pearl-700">{a.short}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
