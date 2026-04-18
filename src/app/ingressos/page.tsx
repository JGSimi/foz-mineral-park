import Link from "next/link";
import type { Metadata } from "next";
import { Check, Info, ArrowRight, Ticket, Users } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Ingressos",
  description:
    "Compre seu ingresso online para o Foz Mineral Park. PIX, cartão e boleto. Meia-entrada, gratuidades e pacotes para agências.",
};

const tickets = [
  {
    name: "Inteira",
    price: "R$ 40",
    description: "Acesso completo às três atrações. Guia impresso bilíngue.",
    highlight: false,
    cta: "Comprar agora",
  },
  {
    name: "Meia-entrada",
    price: "R$ 20",
    description:
      "Crianças de 6 a 12 anos, estudantes, idosos a partir de 60 anos e pessoas com deficiência (conforme Lei 12.933/13).",
    highlight: true,
    cta: "Comprar com meia",
    badge: "Mais comprado",
  },
  {
    name: "Família (4 pessoas)",
    price: "R$ 130",
    description:
      "Dois adultos e duas crianças. Desconto automático ao finalizar a compra.",
    highlight: false,
    cta: "Comprar pacote",
  },
];

const includes = [
  "Entrada no Museu de Minerais",
  "Acesso à Gruta de Ametista",
  "Visita guiada opcional (sem custo)",
  "Material explicativo em PT / ES / EN",
  "Estacionamento gratuito",
  "Política de reembolso em até 7 dias antes da visita",
];

const free = [
  "Crianças até 5 anos",
  "Moradores de Foz do Iguaçu (mediante comprovante de residência)",
  "Professores em atividade com grupos escolares (1 para cada 10 alunos)",
];

export default function IngressosPage() {
  return (
    <>
      <section className="relative pt-24 pb-12 sm:pt-32">
        <Container className="max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-amethyst-700">
            Ingressos
          </p>
          <h1 className="mt-3 text-balance text-5xl sm:text-6xl">
            Garanta seu dia no parque antes de chegar em Foz.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-quartz-600">
            Compra online com PIX, cartão ou boleto. Ingresso chega por e-mail e
            WhatsApp. Sem fila na recepção.
          </p>
        </Container>
      </section>

      <section className="py-10">
        <Container className="grid gap-5 md:grid-cols-3">
          {tickets.map((t) => (
            <div
              key={t.name}
              className={
                "relative flex flex-col gap-5 rounded-3xl border bg-background p-8 " +
                (t.highlight
                  ? "border-amethyst-500 shadow-xl ring-1 ring-amethyst-300"
                  : "border-border")
              }
            >
              {t.badge && (
                <span className="absolute -top-3 right-6 inline-flex items-center gap-1 rounded-full bg-amethyst-700 px-3 py-1 text-[0.65rem] uppercase tracking-[0.18em] text-white">
                  {t.badge}
                </span>
              )}
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-quartz-500">
                  {t.name}
                </p>
                <p className="mt-2 flex items-baseline gap-1 font-display text-5xl text-foreground">
                  {t.price}
                  <span className="text-base font-normal text-quartz-500">
                    / pessoa
                  </span>
                </p>
              </div>
              <p className="text-sm leading-relaxed text-quartz-600">
                {t.description}
              </p>
              <Button
                asChild
                size="md"
                variant={t.highlight ? "primary" : "outline"}
                className="mt-auto w-full"
              >
                <Link href="/contato">
                  <Ticket className="size-4" />
                  {t.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          ))}
        </Container>
        <Container className="mt-6 max-w-3xl">
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-quartz-50 p-5 text-sm text-quartz-700">
            <Info className="mt-0.5 size-5 shrink-0 text-amethyst-700" />
            <p>
              Em breve: compra 100% online com emissão automática de voucher.
              Por ora, clique em comprar e nosso time confirma pelo WhatsApp em
              minutos. Escolha dia e horário preferidos e garanta já.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-10 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="O que está incluso"
              title="Tudo o que você precisa já está no ingresso"
            />
            <ul className="mt-6 space-y-3 text-sm text-quartz-700">
              {includes.map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-amethyst-700" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading
              eyebrow="Entrada gratuita"
              title="Algumas pessoas não pagam para visitar"
            />
            <ul className="mt-6 space-y-3 text-sm text-quartz-700">
              {free.map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-citrine-600" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl bg-amethyst-50 p-4 text-xs text-amethyst-900">
              Gratuidades e meias-entradas exigem comprovação na recepção no dia
              da visita.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container size="md">
          <div className="grid gap-6 rounded-3xl border border-border bg-amethyst-950 p-10 text-white sm:grid-cols-[1fr_auto] sm:items-center sm:p-14">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-citrine-300">
                Agências e grupos escolares
              </p>
              <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
                Condições comerciais para parceiros
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-quartz-200">
                Oferecemos voucher, comissionamento e agenda protegida para
                agências receptivas e grupos escolares. Atendimento dedicado em
                português, espanhol e inglês.
              </p>
            </div>
            <Button asChild size="lg" variant="gold">
              <Link href="/contato?assunto=agencias">
                <Users className="size-4" />
                Falar com comercial
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
