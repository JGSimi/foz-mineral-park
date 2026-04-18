import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  MapPin,
  Accessibility,
  Ticket,
  Sparkles,
  Star,
  Map as MapIcon,
  Camera,
  Gem,
} from "lucide-react";

import { site } from "@/lib/site";
import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { HeroVideo } from "@/components/hero-video";
import { AnimateIn, Stagger, StaggerItem } from "@/components/animate";

export default function Home() {
  return (
    <>
      <Hero />
      <QuickFacts />
      <Attractions />
      <WhyVisit />
      <Testimonials />
      <VisitPlan />
      <FinalCta />
    </>
  );
}

function Hero() {
  return (
    <section className="relative -mt-16 overflow-hidden pb-32 pt-40 sm:-mt-20 sm:pt-52">
      {/* Camada 1: vídeo */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <HeroVideo
          src={site.hero.video}
          poster={site.hero.poster}
          className="scale-105"
        />
      </div>
      {/* Camada 2: overlay de cor para legibilidade + paleta imperial */}
      <div
        className="hero-overlay-main absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div
        className="hero-overlay-glow absolute inset-0 -z-10"
        aria-hidden="true"
      />
      <div className="grain absolute inset-0 -z-10" aria-hidden="true" />

      <Container className="grid items-center gap-16 md:grid-cols-[1.05fr_1fr]">
        <AnimateIn className="space-y-8 text-pearl-100" y={24}>
          <p className="inline-flex items-center gap-2 rounded-full border border-champagne-300/30 bg-white/5 px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.28em] text-champagne-300 backdrop-blur">
            <Sparkles className="size-3.5" />
            Av. das Cataratas, 6025 — Foz do Iguaçu/PR
          </p>
          <h1 className="text-balance font-display text-5xl leading-[0.98] sm:text-6xl md:text-[4.4rem]">
            Onde a Terra guarda seus{" "}
            <em className="italic text-gilded">tesouros mais antigos</em>.
          </h1>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-pearl-200/90 sm:text-lg">
            Três experiências em um só lugar, no caminho das Cataratas.
            Atravesse uma gruta gigante de ametista, percorra um acervo com mais
            de mil minerais e leve para casa peças lapidadas à mão por artesãos
            de Foz do Iguaçu.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="gold">
              <Link href="/ingressos">
                <Ticket className="size-4" />
                Comprar ingresso
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="onDark">
              <Link href="/como-chegar">
                <MapIcon className="size-4" />
                Como chegar
              </Link>
            </Button>
          </div>
          <dl className="grid max-w-xl grid-cols-3 gap-6 border-t border-champagne-300/15 pt-8 text-sm text-pearl-200">
            <div>
              <dt className="text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300">
                Acervo
              </dt>
              <dd className="mt-2 font-display text-3xl text-pearl-100">
                1.000<span className="text-champagne-400">+</span>
              </dd>
              <dd className="text-xs text-pearl-200/70">
                minerais catalogados
              </dd>
            </div>
            <div>
              <dt className="text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300">
                Gruta
              </dt>
              <dd className="mt-2 font-display text-3xl text-pearl-100">
                +2&thinsp;m
              </dd>
              <dd className="text-xs text-pearl-200/70">de ametista real</dd>
            </div>
            <div>
              <dt className="text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300">
                Visita
              </dt>
              <dd className="mt-2 font-display text-3xl text-pearl-100">
                ~1h
              </dd>
              <dd className="text-xs text-pearl-200/70">
                para todas as idades
              </dd>
            </div>
          </dl>
        </AnimateIn>

        <AnimateIn className="relative isolate" y={30} delay={0.12}>
          <div className="absolute -inset-12 -z-10 rounded-[48px] bg-gradient-to-br from-imperial-400/25 via-transparent to-champagne-400/25 blur-3xl" />
          <div className="frame-gold relative overflow-hidden rounded-[32px] shadow-luxe-dark">
            <Image
              src={site.attractions[0].image}
              alt="Gruta de Ametista — formações naturais de cristais violetas iluminadas"
              width={900}
              height={1100}
              sizes="(max-width: 768px) 90vw, 480px"
              className="h-auto w-full object-cover"
              priority
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-obsidian-950/70 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
          <div className="absolute -bottom-8 -left-6 hidden w-52 rotate-[-4deg] rounded-2xl border border-champagne-300/20 bg-obsidian-900/80 p-4 shadow-luxe-dark backdrop-blur sm:block">
            <p className="text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300">
              Destaque
            </p>
            <p className="mt-1 font-display text-lg italic text-pearl-100">
              Gruta de Ametista
            </p>
            <p className="text-xs text-pearl-200/70">Experiência sensorial</p>
          </div>
          <div className="absolute -top-6 right-6 hidden rotate-[3deg] rounded-full border border-champagne-300/30 bg-obsidian-900/70 px-4 py-2 text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300 backdrop-blur sm:block">
            Desde&nbsp;2008
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}

function QuickFacts() {
  const facts = [
    {
      icon: Clock,
      label: "Aberto todos os dias",
      value: "09h às 18h",
      detail: `Última entrada às ${site.hours.lastEntry}`,
    },
    {
      icon: MapPin,
      label: "No caminho das Cataratas",
      value: site.address.street,
      detail: site.address.neighborhood + ", " + site.address.city,
    },
    {
      icon: Accessibility,
      label: "Totalmente acessível",
      value: "Para todas as idades",
      detail: "Piso plano, sinalização tátil",
    },
  ];
  return (
    <section className="relative">
      <Container className="-mt-16">
        <Stagger className="frame-gold grid gap-3 rounded-3xl border border-transparent bg-pearl-50 p-3 shadow-luxe sm:grid-cols-3 sm:p-4">
          {facts.map((f) => (
            <StaggerItem
              key={f.label}
              className="flex items-start gap-4 rounded-2xl bg-pearl-100 p-5"
            >
              <div className="mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-obsidian-900 text-champagne-300">
                <f.icon className="size-5" />
              </div>
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.22em] text-pearl-700">
                  {f.label}
                </p>
                <p className="mt-1 font-display text-lg text-obsidian-900">
                  {f.value}
                </p>
                <p className="text-sm text-pearl-700">{f.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function Attractions() {
  return (
    <section id="atracoes" className="py-28 sm:py-36">
      <Container>
        <AnimateIn>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Três experiências · uma só visita"
              title={
                <>
                  O que vocês{" "}
                  <em className="italic text-champagne-600">vão viver</em>{" "}
                  dentro do parque
                </>
              }
              description="Um roteiro pensado para durar cerca de uma hora, que cabe no mesmo dia das Cataratas e do Parque das Aves — e rende as melhores fotos."
            />
            <span className="ornament hidden text-[0.65rem] uppercase tracking-[0.3em] md:inline-flex">
              Selecione uma experiência
            </span>
          </div>
        </AnimateIn>

        <Stagger className="mt-16 grid gap-6 md:grid-cols-3">
          {site.attractions.map((a, i) => (
            <StaggerItem key={a.slug} as="article">
              <Link
                href={`/atracoes/${a.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-pearl-300 bg-pearl-50 transition-all duration-500 hover:-translate-y-1.5 hover:border-champagne-300 hover:shadow-luxe"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-5 z-10 inline-flex size-9 items-center justify-center rounded-full border border-champagne-300/70 bg-obsidian-950/85 font-display text-[0.75rem] uppercase tracking-[0.16em] text-champagne-200 shadow-lg backdrop-blur"
                >
                  {["I", "II", "III"][i] ?? ""}
                </span>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={a.image}
                    alt={`${a.name} — ${a.tagline}`}
                    fill
                    sizes="(max-width: 768px) 90vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                  />
                  <div
                    className="card-media-overlay absolute inset-0"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-champagne-400/40 bg-obsidian-900/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.22em] text-champagne-200 backdrop-blur">
                    <Gem className="size-3" />
                    {a.badge}
                  </div>
                  <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-obsidian-950/70 px-3 py-1 text-xs text-pearl-200 backdrop-blur">
                    <Clock className="size-3" />
                    {a.duration}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-7">
                  <p className="text-[0.65rem] uppercase tracking-[0.28em] text-champagne-700">
                    {a.tagline}
                  </p>
                  <h3 className="font-display text-2xl text-obsidian-900">
                    {a.name}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-pearl-700">
                    {a.short}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-imperial-700 transition-all duration-500 group-hover:gap-3 group-hover:text-champagne-700">
                    Saiba mais
                    <ArrowRight className="size-4" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function WhyVisit() {
  const points = [
    {
      icon: Gem,
      title: "Acervo raro de verdade",
      body: "Espécimes de todos os continentes, alguns com mais de cinquenta anos de coleção, curados por quem entende de geologia e lapidação.",
    },
    {
      icon: Sparkles,
      title: "Feito para encantar crianças",
      body: "As crianças saem falando sobre cristais por dias. A gruta e a bancada de lapidação viram lembrança para a vida toda.",
    },
    {
      icon: Camera,
      title: "A foto que rende no feed",
      body: "A iluminação da gruta foi desenhada em parceria com cinegrafistas para entregar cenas que ficam lindas no celular.",
    },
    {
      icon: Accessibility,
      title: "Todo mundo entra",
      body: "Piso plano sem degraus, rotas acessíveis, descrição tátil de peças e materiais explicativos em três idiomas.",
    },
  ];

  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div
        className="absolute inset-0 -z-10 bg-parchment-grid opacity-60"
        aria-hidden="true"
      />
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-start">
          <AnimateIn>
            <SectionHeading
              eyebrow="Por que vale a visita"
              title={
                <>
                  Uma parada que os turistas{" "}
                  <em className="italic text-champagne-600">contam em casa</em>
                </>
              }
              description="Foz do Iguaçu é uma das cidades mais visitadas do Brasil. A gente existe para entregar a memória que falta entre a Cataratas e o jantar."
            />
          </AnimateIn>
          <Stagger
            as="ol"
            className="grid gap-5 sm:grid-cols-2"
          >
            {points.map((p, i) => (
              <StaggerItem
                key={p.title}
                as="li"
                className="relative overflow-hidden rounded-2xl border border-pearl-300 bg-pearl-50 p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne-300 hover:shadow-luxe"
              >
                <span className="absolute right-5 top-5 font-display text-3xl italic text-champagne-400/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="inline-flex size-11 items-center justify-center rounded-full border border-champagne-400/40 bg-obsidian-900 text-champagne-300">
                  <p.icon className="size-5" />
                </div>
                <h3 className="mt-5 font-display text-xl text-obsidian-900">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-pearl-700">
                  {p.body}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    {
      name: "Família Menezes",
      origin: "São Paulo, SP",
      text: "Paramos entre a visita às Cataratas e o hotel. Acabamos ficando mais do que planejamos. As crianças adoraram a gruta, e a loja tem peças a preços honestos.",
      rating: 5,
    },
    {
      name: "Laura Bauer",
      origin: "Buenos Aires, AR",
      text: "Una experiencia muy distinta a las Cataratas. Muy bonito, limpio, y los guías explican todo con mucho cariño. Compramos una amatista preciosa.",
      rating: 5,
    },
    {
      name: "Carlos Tavares",
      origin: "Porto, PT",
      text: "Surpreendentemente bom. Num dia de chuva valeu cada minuto. Fotografia incrível, equipe simpática, café gostoso.",
      rating: 5,
    },
  ];

  return (
    <section className="py-28 sm:py-36">
      <Container>
        <AnimateIn>
          <SectionHeading
            eyebrow="Quem visita, volta"
            title={
              <>
                O que viajantes dizem{" "}
                <em className="italic text-champagne-600">sobre a gente</em>
              </>
            }
            align="center"
          />
        </AnimateIn>
        <Stagger className="mt-16 grid gap-6 md:grid-cols-3">
          {quotes.map((q) => (
            <StaggerItem key={q.name} as="figure">
              <div className="relative flex h-full flex-col gap-6 overflow-hidden rounded-3xl border border-pearl-300 bg-pearl-50 p-8 transition-shadow duration-500 hover:shadow-luxe">
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-6 font-display text-[7rem] italic text-champagne-300/40"
                >
                  &ldquo;
                </span>
                <div className="relative flex gap-0.5 text-champagne-500">
                  {Array.from({ length: q.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="relative flex-1 text-pretty text-[0.95rem] leading-relaxed text-obsidian-700">
                  {q.text}
                </blockquote>
                <figcaption className="relative flex items-center gap-3 border-t border-pearl-300 pt-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-obsidian-900 font-display text-sm text-champagne-300">
                    {q.name
                      .split(" ")
                      .map((x) => x[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-obsidian-900">
                      {q.name}
                    </p>
                    <p className="text-xs uppercase tracking-[0.18em] text-pearl-600">
                      {q.origin}
                    </p>
                  </div>
                </figcaption>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function VisitPlan() {
  return (
    <section className="py-28 sm:py-36">
      <Container>
        <AnimateIn>
          <div className="relative grid overflow-hidden rounded-3xl border border-champagne-400/15 bg-aurora text-pearl-100 md:grid-cols-[1.1fr_1fr]">
            <div className="grain absolute inset-0" aria-hidden="true" />
            <div className="relative space-y-8 p-10 sm:p-16">
              <SectionHeading
                eyebrow="Planeje sua visita"
                title={
                  <>
                    Entre as Cataratas, o{" "}
                    <em className="italic text-champagne-300">Marco</em> e o
                    Parque das Aves.
                  </>
                }
                description="A parada ideal para turistas que querem aproveitar o dia por completo. Recebemos agências, famílias e grupos escolares mediante agendamento."
                tone="dark"
              />
              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  { k: "Endereço", v: site.address.full },
                  {
                    k: "Horário",
                    v: `${site.hours.summary}. Última entrada às ${site.hours.lastEntry}.`,
                  },
                  {
                    k: "Estacionamento",
                    v: "Gratuito e sinalizado, no próprio parque.",
                  },
                  {
                    k: "Acessibilidade",
                    v: "Piso plano, rampas e rota adaptada.",
                  },
                ].map((item) => (
                  <div
                    key={item.k}
                    className="border-l border-champagne-300/40 pl-4"
                  >
                    <p className="text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300">
                      {item.k}
                    </p>
                    <p className="mt-1.5 text-sm text-pearl-200/90">{item.v}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3 pt-3 sm:flex-row">
                <Button asChild variant="gold">
                  <Link href="/ingressos">
                    <Ticket className="size-4" />
                    Comprar ingresso
                  </Link>
                </Button>
                <Button asChild variant="onDark">
                  <a
                    href={site.social.googleMaps}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <MapIcon className="size-4" />
                    Abrir no Google Maps
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden">
              <Image
                src={site.attractions[1].image}
                alt="Acervo do Museu de Minerais"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
              <div
                className="image-split-overlay absolute inset-0"
                aria-hidden="true"
              />
            </div>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="py-28 sm:py-36">
      <Container size="md" className="text-center">
        <AnimateIn>
          <span className="ornament font-display text-[0.65rem] uppercase tracking-[0.3em]">
            Próxima parada, a gente
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl leading-tight sm:text-5xl md:text-[3.2rem]">
            A lembrança mais{" "}
            <em className="italic text-champagne-600">brilhante</em> da viagem
            pode começar aqui.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-pearl-700 sm:text-lg">
            Garanta seu ingresso online e evite filas na recepção. Pagamento via
            PIX, cartão ou boleto.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="gold">
              <Link href="/ingressos">
                Comprar ingresso
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contato">Falar com a equipe</Link>
            </Button>
          </div>
        </AnimateIn>
      </Container>
    </section>
  );
}
