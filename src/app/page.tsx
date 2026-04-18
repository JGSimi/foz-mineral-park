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
import { GemIllustration } from "@/components/gem-illustration";

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
    <section className="relative -mt-16 overflow-hidden pb-24 pt-36 sm:-mt-20 sm:pt-44">
      <div className="bg-geode absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 -z-10 h-full bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_55%)]" />

      <Container className="grid items-center gap-14 md:grid-cols-[1.1fr_1fr]">
        <div className="space-y-7 text-white">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-citrine-300">
            <Sparkles className="size-3.5" />
            Av. das Cataratas, 6025 — Foz do Iguaçu/PR
          </p>
          <h1 className="text-balance text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
            {site.tagline}
          </h1>
          <p className="max-w-xl text-pretty text-base leading-relaxed text-quartz-200 sm:text-lg">
            Três experiências em um só lugar, no caminho das Cataratas. Caminhe
            por uma gruta gigante de ametista, percorra um acervo com mais de
            mil minerais e leve para casa peças lapidadas à mão por artesãos de
            Foz do Iguaçu.
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
          <dl className="grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-7 text-sm text-quartz-200">
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-citrine-300">
                Acervo
              </dt>
              <dd className="mt-1 font-display text-2xl text-white">1.000+</dd>
              <dd className="text-xs text-quartz-300">minerais catalogados</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-citrine-300">
                Gruta
              </dt>
              <dd className="mt-1 font-display text-2xl text-white">
                +2&thinsp;m
              </dd>
              <dd className="text-xs text-quartz-300">de ametista real</dd>
            </div>
            <div>
              <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-citrine-300">
                Visita
              </dt>
              <dd className="mt-1 font-display text-2xl text-white">~1h</dd>
              <dd className="text-xs text-quartz-300">para todas as idades</dd>
            </div>
          </dl>
        </div>

        <div className="relative isolate">
          <div className="absolute -inset-10 -z-10 rounded-[48px] bg-gradient-to-br from-amethyst-400/20 via-transparent to-citrine-400/20 blur-3xl" />
          <div className="overflow-hidden rounded-[32px] border border-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]">
            <GemIllustration accent="amethyst" title="Drusa de ametista" />
          </div>
          <div className="absolute -bottom-6 -left-4 hidden w-40 rotate-[-4deg] rounded-2xl border border-white/10 bg-white/5 p-3 shadow-xl backdrop-blur sm:block">
            <p className="text-[0.65rem] uppercase tracking-[0.22em] text-citrine-300">
              Destaque
            </p>
            <p className="mt-1 font-display text-base text-white">
              Gruta de Ametista
            </p>
            <p className="text-xs text-quartz-300">Experiência sensorial</p>
          </div>
        </div>
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
      <Container className="-mt-14 grid gap-3 rounded-3xl border border-border bg-background p-3 shadow-lg sm:grid-cols-3 sm:p-4">
        {facts.map((f) => (
          <div
            key={f.label}
            className="flex items-start gap-3 rounded-2xl bg-quartz-50 p-5"
          >
            <div className="mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-amethyst-100 text-amethyst-700">
              <f.icon className="size-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-quartz-500">
                {f.label}
              </p>
              <p className="mt-0.5 font-display text-lg text-foreground">
                {f.value}
              </p>
              <p className="text-sm text-quartz-600">{f.detail}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}

function Attractions() {
  return (
    <section id="atracoes" className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Três experiências em um só lugar"
          title="O que vocês vão viver dentro do parque"
          description="Um roteiro pensado para durar cerca de uma hora, que cabe no mesmo dia das Cataratas e do Parque das Aves — e rende as melhores fotos."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {site.attractions.map((a) => (
            <Link
              key={a.slug}
              href={`/atracoes/${a.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-background transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <GemIllustration
                  accent={a.accent}
                  className="transition-transform duration-700 group-hover:scale-[1.04]"
                  title={`Ilustração: ${a.name}`}
                />
                <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                  <Gem className="size-3 text-amethyst-600" />
                  {a.badge}
                </div>
                <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 text-xs text-white backdrop-blur">
                  <Clock className="size-3" />
                  {a.duration}
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <p className="text-xs uppercase tracking-[0.16em] text-amethyst-700">
                  {a.tagline}
                </p>
                <h3 className="font-display text-2xl text-foreground">
                  {a.name}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-quartz-600">
                  {a.short}
                </p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-amethyst-700 transition-all group-hover:gap-3">
                  Saiba mais
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function WhyVisit() {
  const points = [
    {
      icon: Gem,
      title: "Acervo raro de verdade",
      body: "Espécimes de todos os continentes, alguns com mais de 50 anos de coleção, curados por quem entende de geologia e lapidação.",
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
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="absolute inset-0 -z-10 bg-parchment-grid opacity-60"
        aria-hidden="true"
      />
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-start">
          <SectionHeading
            eyebrow="Por que vale a visita"
            title="Uma parada que os turistas contam em casa"
            description="Foz do Iguaçu é uma das cidades mais visitadas do Brasil. A gente existe para entregar a memória que falta entre a Cataratas e o jantar."
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {points.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-background p-6 transition-shadow hover:shadow-md"
              >
                <div className="inline-flex size-11 items-center justify-center rounded-full bg-citrine-100 text-citrine-700">
                  <p.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-xl text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-quartz-600">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
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
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          eyebrow="Quem visita, volta"
          title="O que viajantes dizem sobre a gente"
          align="center"
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {quotes.map((q) => (
            <figure
              key={q.name}
              className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-background p-7"
            >
              <div className="flex gap-0.5 text-citrine-500">
                {Array.from({ length: q.rating }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="flex-1 text-pretty text-sm leading-relaxed text-quartz-700">
                “{q.text}”
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-border pt-4">
                <div className="flex size-10 items-center justify-center rounded-full bg-amethyst-100 font-display text-amethyst-700">
                  {q.name
                    .split(" ")
                    .map((x) => x[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {q.name}
                  </p>
                  <p className="text-xs text-quartz-500">{q.origin}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

function VisitPlan() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="grid overflow-hidden rounded-3xl border border-border bg-quartz-900 text-white md:grid-cols-[1.1fr_1fr]">
          <div className="space-y-6 p-10 sm:p-14">
            <SectionHeading
              eyebrow="Planeje sua visita"
              title="Entre a Cataratas, o Marco das Três Fronteiras e o Parque das Aves"
              description="A parada ideal para turistas que querem aproveitar o dia por completo. Recebemos agências, famílias e grupos escolares mediante agendamento."
              tone="dark"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  k: "Endereço",
                  v: site.address.full,
                },
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
                <div key={item.k} className="border-l border-white/20 pl-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.22em] text-citrine-300">
                    {item.k}
                  </p>
                  <p className="mt-1 text-sm text-quartz-200">{item.v}</p>
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

          <div className="bg-geode relative min-h-[320px]" aria-hidden="true">
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <GemIllustration accent="citrine" className="opacity-80" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="py-24 sm:py-32">
      <Container size="md" className="text-center">
        <SectionHeading
          align="center"
          eyebrow="Próxima parada, a gente"
          title="A lembrança mais brilhante da viagem pode começar aqui."
          description="Garanta seu ingresso online e evite filas na recepção. Pagamento via PIX, cartão ou boleto."
        />
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" variant="primary">
            <Link href="/ingressos">
              Comprar ingresso
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contato">Falar com a equipe</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
