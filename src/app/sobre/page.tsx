import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/lib/site";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "Sobre nós",
  description:
    "A história do Foz Mineral Park: uma família, décadas de paixão por minerais e a vontade de mostrar a beleza da Terra para quem visita Foz do Iguaçu.",
};

const milestones = [
  {
    year: "Décadas atrás",
    title: "Uma coleção vira família",
    body: "A família Colla começa a reunir peças raras de minerais, fascinada pelas formações do sul do Brasil e pela história geológica da região.",
  },
  {
    year: "Chegada em Foz",
    title: "Uma nova casa para as pedras",
    body: "O acervo encontra seu lar em um terreno na Avenida das Cataratas — o caminho por onde passam milhões de turistas todo ano.",
  },
  {
    year: "Hoje",
    title: "Três atrações, uma só missão",
    body: "Além do acervo, uma gruta construída com ametistas reais e uma bancada de lapidação ativa. Tudo aberto ao público, o ano inteiro.",
  },
];

export default function SobrePage() {
  return (
    <>
      <section className="pt-24 pb-12 sm:pt-32">
        <Container className="max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-amethyst-700">
            Sobre
          </p>
          <h1 className="mt-3 text-balance text-5xl sm:text-6xl">
            Uma família, um acervo, um convite.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-quartz-600">
            {site.longDescription}
          </p>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-6 md:grid-cols-3">
          {milestones.map((m) => (
            <div
              key={m.title}
              className="rounded-3xl border border-border bg-background p-8"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-citrine-700">
                {m.year}
              </p>
              <h2 className="mt-3 font-display text-2xl text-foreground">
                {m.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-quartz-600">
                {m.body}
              </p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-10 rounded-3xl border border-border bg-amethyst-50 p-10 sm:p-14 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="O que nos move"
              title="Celebrar a beleza da Terra, um cristal de cada vez"
            />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-quartz-700">
            <p>
              Gosto de minerais é assunto afetivo. Cada pedra tem uma história
              contada em camadas que levaram milhões de anos para se formar. A
              gente gosta de traduzir isso numa visita curta, clara e bonita.
            </p>
            <p>
              Nosso time é formado por guias, geólogos e artesãos locais. Todo
              mineral exposto foi extraído legalmente; todas as peças da loja
              são lapidadas aqui mesmo, em Foz do Iguaçu.
            </p>
            <p>
              Acreditamos em turismo responsável, em salários justos para quem
              recebe o visitante e em um site honesto — que fala o que entrega.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container size="md" className="text-center">
          <SectionHeading
            align="center"
            eyebrow="Venha conhecer"
            title="A gente separa o café, vocês trazem a curiosidade."
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="primary" size="lg">
              <Link href="/ingressos">Comprar ingresso</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/como-chegar">Como chegar</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
