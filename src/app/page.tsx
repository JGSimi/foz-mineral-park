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
import { attractionImages, heroPoster } from "@/lib/images";
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

/**
 * Destaca a palavra-chave do nome da atração em italic gilded
 * ("Gruta de *Ametista*", "Museu de *Minerais*", "Loja de *Pedras*").
 */
function renderAttractionTitle(name: string) {
  const words = name.split(" ");
  if (words.length < 2) return name;
  const last = words[words.length - 1];
  const head = words.slice(0, -1).join(" ");
  return (
    <>
      {head}{" "}
      <em className="italic text-imperial-700">{last}</em>
    </>
  );
}

function Hero() {
  return (
    <section className="relative -mt-16 overflow-hidden pb-32 pt-40 sm:-mt-20 sm:pt-52">
      {/* Camada 1: vídeo (desktop) + foto (sempre) */}
      <div className="absolute inset-0 -z-20" aria-hidden="true">
        <HeroVideo
          src={site.hero.video}
          poster={heroPoster}
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
            Atravesse uma gruta de ametista, percorra um acervo de minerais e
            leve para casa peças lapidadas à mão por artesãos da região.
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
                Atrações
              </dt>
              <dd className="mt-2 font-display text-3xl text-pearl-100">3</dd>
              <dd className="text-xs text-pearl-200/70">
                num só roteiro
              </dd>
            </div>
            <div>
              <dt className="text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300">
                Visita
              </dt>
              <dd className="mt-2 font-display text-3xl text-pearl-100">
                ~1h
              </dd>
              <dd className="text-xs text-pearl-200/70">
                sem pressa, sem fila
              </dd>
            </div>
            <div>
              <dt className="text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300">
                Aberto
              </dt>
              <dd className="mt-2 font-display text-3xl text-pearl-100">
                9–18h
              </dd>
              <dd className="text-xs text-pearl-200/70">
                todos os dias
              </dd>
            </div>
          </dl>
        </AnimateIn>

        <AnimateIn className="relative isolate" y={30} delay={0.12}>
          <div className="absolute -inset-12 -z-10 rounded-[48px] bg-gradient-to-br from-imperial-400/25 via-transparent to-champagne-400/25 blur-3xl" />
          <div className="float-a frame-gold relative overflow-hidden rounded-[32px] shadow-luxe-dark">
            <Image
              src={attractionImages["gruta-de-ametista"]}
              alt="Gruta de Ametista — formações de cristais violetas iluminadas"
              sizes="(max-width: 768px) 90vw, 480px"
              placeholder="blur"
              className="h-auto w-full object-cover"
              priority
            />
            <div
              className="card-media-overlay absolute inset-0"
              aria-hidden="true"
            />
          </div>
          <div className="float-b absolute -bottom-8 -left-6 hidden sm:block">
            <div className="w-52 -rotate-[4deg] rounded-2xl border border-champagne-300/20 bg-obsidian-900/85 p-4 shadow-luxe-dark backdrop-blur">
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300">
                Destaque
              </p>
              <p className="mt-1 font-display text-lg italic text-pearl-100">
                Gruta de Ametista
              </p>
              <p className="text-xs text-pearl-200/70">
                Experiência sensorial
              </p>
            </div>
          </div>
          <div className="float-c absolute -top-6 right-6 hidden sm:block">
            <div className="rotate-[3deg] rounded-full border border-champagne-300/30 bg-obsidian-900/80 px-4 py-2 text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300 backdrop-blur">
              Foz do Iguaçu · PR
            </div>
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
        <Stagger className="relative grid gap-0 rounded-[22px] border border-champagne-400/22 bg-pearl-50 p-1 sm:grid-cols-3">
          {/* hairline vertical dividers */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-5 left-1/3 hidden w-px bg-gradient-to-b from-transparent via-champagne-400/22 to-transparent sm:block"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-5 left-2/3 hidden w-px bg-gradient-to-b from-transparent via-champagne-400/22 to-transparent sm:block"
          />
          {facts.map((f) => (
            <StaggerItem
              key={f.label}
              className="flex items-start gap-3.5 px-5 py-4"
            >
              <div className="mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-champagne-400/30 bg-obsidian-950 text-champagne-300">
                <f.icon className="size-4" />
              </div>
              <div className="min-w-0">
                <p className="text-[0.6rem] font-medium uppercase tracking-[0.28em] text-champagne-700">
                  {f.label}
                </p>
                <p className="mt-1 font-display text-xl leading-tight text-obsidian-900">
                  {f.value}
                </p>
                <p className="mt-0.5 text-[0.8rem] text-pearl-700">
                  {f.detail}
                </p>
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
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-pearl-300 bg-pearl-50 transition-all duration-500 hover:-translate-y-1.5 hover:border-champagne-300 hover:shadow-luxe-lift"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-5 z-10 inline-flex size-9 items-center justify-center rounded-full border border-champagne-300/70 bg-obsidian-950/85 font-display italic text-[0.85rem] tracking-[0.12em] text-champagne-200 shadow-lg backdrop-blur"
                >
                  {["I", "II", "III"][i] ?? ""}
                </span>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={attractionImages[a.slug as keyof typeof attractionImages]}
                    alt={`${a.name} — ${a.tagline}`}
                    fill
                    sizes="(max-width: 768px) 90vw, 33vw"
                    placeholder="blur"
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
                  <h3 className="font-display text-2xl leading-tight text-obsidian-900">
                    {renderAttractionTitle(a.name)}
                  </h3>
                  <p className="flex-1 text-sm leading-relaxed text-pearl-700">
                    {a.short}
                  </p>
                  <div className="mt-3 flex items-center justify-between border-t border-dashed border-champagne-400/30 pt-3">
                    <span className="inline-flex items-center gap-1.5 text-[0.65rem] text-pearl-600">
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-jade-500"
                      />
                      <span>Acessível</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[0.7rem] font-medium uppercase tracking-[0.18em] text-imperial-700 transition-all duration-500 group-hover:gap-3 group-hover:text-champagne-700">
                      Saiba mais
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
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
      title: "Minerais para ver de perto",
      body: "Acervo com peças de diferentes origens, apresentadas em circuito curto que conecta geologia, química e estética.",
    },
    {
      icon: Sparkles,
      title: "Feito para encantar crianças",
      body: "A gruta e a bancada de lapidação costumam virar assunto dos pequenos por dias. Roteiro curto, sem cansar.",
    },
    {
      icon: Camera,
      title: "A foto que rende no feed",
      body: "A iluminação da gruta foi pensada para destacar cor e estrutura das pedras — rende as melhores fotos do dia.",
    },
    {
      icon: Accessibility,
      title: "Pensado para todo mundo",
      body: "Queremos que todo visitante tenha uma visita tranquila. Se houver necessidade específica, avise ao nosso time no momento da reserva.",
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
  return (
    <section className="py-28 sm:py-36">
      <Container size="md" className="text-center">
        <AnimateIn>
          <span className="ornament font-display text-[0.65rem] uppercase tracking-[0.3em] text-champagne-700">
            Quem visita, volta
          </span>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance font-display text-4xl leading-tight sm:text-5xl">
            Depoimentos de verdade,{" "}
            <em className="italic text-champagne-600">escritos por quem foi</em>.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-pearl-700">
            Acreditamos em prova social honesta. Prefira avaliar a visita nas
            plataformas oficiais — leia o que outros viajantes dizem e deixe
            seu relato depois que voltar para casa.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="md" variant="gold">
              <a
                href={site.social.googleMaps}
                target="_blank"
                rel="noreferrer"
              >
                <Star className="size-4" />
                Avaliar no Google
              </a>
            </Button>
            <Button asChild size="md" variant="outline">
              <a
                href="https://www.tripadvisor.com.br/Search?q=Foz+Mineral+Park"
                target="_blank"
                rel="noreferrer"
              >
                Ver no TripAdvisor
              </a>
            </Button>
          </div>
        </AnimateIn>
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
                    v: "Na Av. das Cataratas, em frente ao parque.",
                  },
                  {
                    k: "Acessibilidade",
                    v: "Fale com a equipe para confirmar o que se aplica à sua visita.",
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
                src={attractionImages["museu-de-minerais"]}
                alt="Acervo do Museu de Minerais"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                placeholder="blur"
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
