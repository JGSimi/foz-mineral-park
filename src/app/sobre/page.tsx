import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/lib/site";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/button";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Sobre nós",
  description:
    "A história do Foz Mineral Park: uma família, décadas de paixão por minerais e a vontade de mostrar a beleza da Terra para quem visita Foz do Iguaçu.",
};

const milestones = [
  {
    numeral: "I",
    year: "Décadas atrás",
    title: "Uma coleção vira família",
    body: "A família Colla começa a reunir peças raras de minerais, fascinada pelas formações do sul do Brasil e pela história geológica da região.",
  },
  {
    numeral: "II",
    year: "Chegada em Foz",
    title: "Uma nova casa para as pedras",
    body: "O acervo encontra seu lar em um terreno na Avenida das Cataratas — o caminho por onde passam milhões de turistas todo ano.",
  },
  {
    numeral: "III",
    year: "Hoje",
    title: "Três atrações, uma só missão",
    body: "Além do acervo, uma gruta construída com ametistas reais e uma bancada de lapidação ativa. Tudo aberto ao público, o ano inteiro.",
  },
];

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre"
        title={
          <>
            Uma família, um acervo,{" "}
            <em className="italic text-champagne-300">um convite</em>.
          </>
        }
        description={site.longDescription}
      />

      <section className="py-20">
        <Container className="grid gap-6 md:grid-cols-3">
          {milestones.map((m) => (
            <article
              key={m.title}
              className="relative overflow-hidden rounded-3xl border border-pearl-300 bg-pearl-50 p-8 transition-all duration-500 hover:-translate-y-0.5 hover:border-champagne-300 hover:shadow-luxe"
            >
              <span className="absolute right-6 top-6 font-display text-5xl italic text-champagne-400/60">
                {m.numeral}
              </span>
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-champagne-700">
                {m.year}
              </p>
              <h2 className="mt-4 max-w-[14ch] font-display text-2xl text-obsidian-900">
                {m.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-pearl-700">
                {m.body}
              </p>
            </article>
          ))}
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="relative grid gap-12 overflow-hidden rounded-3xl border border-champagne-400/20 bg-aurora p-10 text-pearl-100 sm:p-16 md:grid-cols-2">
            <div className="grain absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <SectionHeading
                eyebrow="O que nos move"
                title={
                  <>
                    Celebrar a beleza da Terra,{" "}
                    <em className="italic text-champagne-300">um cristal</em> de
                    cada vez
                  </>
                }
                tone="dark"
              />
            </div>
            <div className="relative space-y-4 text-[0.95rem] leading-relaxed text-pearl-200/90">
              <p>
                Gosto de minerais é assunto afetivo. Cada pedra tem uma história
                contada em camadas que levaram milhões de anos para se formar. A
                gente gosta de traduzir isso numa visita curta, clara e bonita.
              </p>
              <p>
                Nosso time é formado por guias, geólogos e artesãos locais.
                Todo mineral exposto foi extraído legalmente; todas as peças
                da loja são lapidadas aqui mesmo, em Foz do Iguaçu.
              </p>
              <p>
                Acreditamos em turismo responsável, em salários justos para
                quem recebe o visitante e em um site honesto — que fala o que
                entrega.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container size="md" className="text-center">
          <SectionHeading
            align="center"
            eyebrow="Venha conhecer"
            title={
              <>
                A gente separa o café, vocês trazem{" "}
                <em className="italic text-champagne-600">a curiosidade</em>.
              </>
            }
          />
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="gold" size="lg">
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
