import Link from "next/link";
import type { Metadata } from "next";
import { Check, Info, ArrowRight, Ticket, Users } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";

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
    name: "Família · 4 pessoas",
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
      <PageHero
        eyebrow="Ingressos"
        title={
          <>
            Garanta seu dia no parque{" "}
            <em className="italic text-champagne-300">antes de chegar</em> em
            Foz.
          </>
        }
        description="Compra online com PIX, cartão ou boleto. Ingresso chega por e-mail e WhatsApp. Sem fila na recepção."
      />

      <section className="py-16">
        <Container className="grid gap-6 md:grid-cols-3">
          {tickets.map((t) => (
            <div
              key={t.name}
              className={
                "relative flex flex-col gap-5 rounded-3xl border p-8 transition-all duration-500 " +
                (t.highlight
                  ? "border-champagne-400/70 bg-pearl-50 shadow-luxe frame-gold"
                  : "border-pearl-300 bg-pearl-50 hover:shadow-luxe")
              }
            >
              {t.badge && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-obsidian-950 px-3 py-1 text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300">
                  {t.badge}
                </span>
              )}
              <div>
                <p className="text-[0.65rem] uppercase tracking-[0.28em] text-pearl-600">
                  {t.name}
                </p>
                <p className="mt-2 flex items-baseline gap-1 font-display text-5xl text-obsidian-900">
                  {t.price}
                  <span className="text-base font-normal text-pearl-600">
                    / pessoa
                  </span>
                </p>
              </div>
              <p className="text-sm leading-relaxed text-pearl-700">
                {t.description}
              </p>
              <Button
                asChild
                size="md"
                variant={t.highlight ? "gold" : "outline"}
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
        <Container className="mt-8 max-w-3xl">
          <div className="flex items-start gap-3 rounded-2xl border border-champagne-400/30 bg-pearl-100 p-5 text-sm text-pearl-800">
            <Info className="mt-0.5 size-5 shrink-0 text-champagne-700" />
            <p>
              Em breve: compra 100% online com emissão automática de voucher.
              Por ora, clique em comprar e nosso time confirma pelo WhatsApp em
              minutos. Escolha dia e horário preferidos e garanta já.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="O que está incluso"
              title={
                <>
                  Tudo o que você precisa{" "}
                  <em className="italic text-champagne-600">já está</em> no
                  ingresso
                </>
              }
            />
            <ul className="mt-8 space-y-3.5 text-[0.95rem] text-obsidian-800">
              {includes.map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-champagne-600" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading
              eyebrow="Entrada gratuita"
              title={
                <>
                  Algumas pessoas{" "}
                  <em className="italic text-champagne-600">não pagam</em> para
                  visitar
                </>
              }
            />
            <ul className="mt-8 space-y-3.5 text-[0.95rem] text-obsidian-800">
              {free.map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-imperial-700" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 rounded-xl border border-imperial-200 bg-imperial-50 p-4 text-xs text-imperial-900">
              Gratuidades e meias-entradas exigem comprovação na recepção no dia
              da visita.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container size="md">
          <div className="relative grid overflow-hidden rounded-3xl border border-champagne-400/20 bg-aurora p-10 text-pearl-100 sm:grid-cols-[1fr_auto] sm:items-center sm:p-14">
            <div className="grain absolute inset-0" aria-hidden="true" />
            <div className="relative">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-champagne-300">
                Agências e grupos escolares
              </p>
              <h2 className="mt-3 font-display text-3xl text-pearl-100 sm:text-4xl">
                Condições comerciais{" "}
                <em className="italic text-champagne-300">dedicadas</em>
              </h2>
              <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-pearl-200/85">
                Voucher, comissionamento e agenda protegida para agências
                receptivas e grupos escolares. Atendimento em português,
                espanhol e inglês.
              </p>
            </div>
            <Button asChild size="lg" variant="gold" className="relative">
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
