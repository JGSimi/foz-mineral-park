import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Ticket, Sparkles } from "lucide-react";
import type { Metadata } from "next";

import { site } from "@/lib/site";
import { attractionImages, type AttractionSlug } from "@/lib/images";
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
  const index = site.attractions.findIndex((a) => a.slug === slug);
  const attraction = site.attractions[index];
  if (!attraction) notFound();

  const total = site.attractions.length;
  const prev = site.attractions[(index - 1 + total) % total];
  const next = site.attractions[(index + 1) % total];
  const image = attractionImages[attraction.slug as AttractionSlug];

  return (
    <>
      <section className="relative -mt-16 overflow-hidden pb-20 pt-36 sm:-mt-20 sm:pt-52">
        {/* Imagem de fundo */}
        <div className="absolute inset-0 -z-20" aria-hidden="true">
          <Image
            src={image}
            alt=""
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="scale-105 object-cover"
          />
        </div>
        <div
          className="attraction-hero-overlay absolute inset-0 -z-10"
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
                src={image}
                alt={`${attraction.name} — ${attraction.tagline}`}
                sizes="(max-width: 768px) 90vw, 500px"
                placeholder="blur"
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
                d: "Famílias, agências receptivas e grupos escolares.",
              },
              {
                k: "No mesmo ingresso",
                v: "3 atrações",
                d: "Gruta, museu e loja em um só circuito.",
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

      <section className="py-20 sm:py-24">
        <Container>
          <AnimateIn>
            <p className="ornament font-display text-[0.65rem] uppercase tracking-[0.28em] text-champagne-700">
              Continue explorando
            </p>
            <h2 className="mt-5 max-w-2xl font-display text-3xl text-obsidian-900">
              Próxima parada{" "}
              <em className="italic text-champagne-600">do circuito</em>
            </h2>
          </AnimateIn>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <Link
              href={`/atracoes/${prev.slug}`}
              className="group flex items-stretch gap-5 rounded-2xl border border-pearl-300 bg-pearl-50 p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne-300 hover:shadow-luxe"
            >
              <div className="frame-gold relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={attractionImages[prev.slug as AttractionSlug]}
                  alt={prev.name}
                  fill
                  sizes="112px"
                  placeholder="blur"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <p className="inline-flex items-center gap-1.5 text-[0.65rem] uppercase tracking-[0.24em] text-champagne-700">
                  <ArrowLeft className="size-3" />
                  Anterior
                </p>
                <div>
                  <p className="font-display text-xl text-obsidian-900">
                    {prev.name}
                  </p>
                  <p className="mt-0.5 text-sm text-pearl-700">{prev.tagline}</p>
                </div>
              </div>
            </Link>
            <Link
              href={`/atracoes/${next.slug}`}
              className="group flex items-stretch gap-5 rounded-2xl border border-pearl-300 bg-pearl-50 p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne-300 hover:shadow-luxe"
            >
              <div className="flex flex-1 flex-col justify-between text-right">
                <p className="inline-flex items-center justify-end gap-1.5 text-[0.65rem] uppercase tracking-[0.24em] text-champagne-700">
                  Próxima
                  <ArrowRight className="size-3" />
                </p>
                <div>
                  <p className="font-display text-xl text-obsidian-900">
                    {next.name}
                  </p>
                  <p className="mt-0.5 text-sm text-pearl-700">{next.tagline}</p>
                </div>
              </div>
              <div className="frame-gold relative aspect-square w-28 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={attractionImages[next.slug as AttractionSlug]}
                  alt={next.name}
                  fill
                  sizes="112px"
                  placeholder="blur"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                />
              </div>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
