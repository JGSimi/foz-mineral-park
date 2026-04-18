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
    "Reserve seu ingresso para o Foz Mineral Park. Confirmação por WhatsApp com atendimento humano. Pacotes para agências e grupos escolares.",
};

const includes = [
  "Acesso à Gruta de Ametista",
  "Entrada no Museu de Minerais",
  "Visita à Loja de Pedras",
  "Estacionamento na porta do parque",
];

const considerations = [
  "Meia-entrada e gratuidades conforme legislação vigente.",
  "Combos para famílias, agências receptivas e grupos escolares são negociados diretamente com o comercial.",
  "Dias de maior movimento, chegue com folga para aproveitar sem pressa.",
];

export default function IngressosPage() {
  return (
    <>
      <PageHero
        eyebrow="Ingressos"
        title={
          <>
            Agende sua visita em{" "}
            <em className="italic text-champagne-300">poucos minutos</em>.
          </>
        }
        description="Nosso time confirma dia, horário e pacote pelo WhatsApp. Em breve, compra online com voucher automático no e-mail."
      />

      <section className="py-16">
        <Container size="md">
          <div className="frame-gold relative overflow-hidden rounded-3xl border border-transparent bg-pearl-50 p-10 shadow-luxe sm:p-14">
            <p className="text-[0.65rem] uppercase tracking-[0.28em] text-champagne-700">
              Reserva por WhatsApp
            </p>
            <h2 className="mt-4 font-display text-3xl text-obsidian-900 sm:text-4xl">
              Fale com a equipe e{" "}
              <em className="italic text-champagne-600">
                receba a confirmação
              </em>{" "}
              em minutos.
            </h2>
            <p className="mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-pearl-700">
              Valores atualizados e disponibilidade de dia e horário são
              confirmados caso a caso pela nossa equipe. Quando a compra 100%
              online estiver no ar, você poderá finalizar direto por aqui, com
              PIX, cartão ou boleto.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="gold">
                <Link href="/contato">
                  <Ticket className="size-4" />
                  Reservar agora
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a
                  href={`https://wa.me/${site.contact.whatsapp.replace("+", "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp direto
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="O que está incluso"
              title={
                <>
                  Um único ingresso,{" "}
                  <em className="italic text-champagne-600">três atrações</em>
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
              eyebrow="Antes de vir"
              title={
                <>
                  Informações que{" "}
                  <em className="italic text-champagne-600">é bom saber</em>
                </>
              }
            />
            <ul className="mt-8 space-y-3.5 text-[0.95rem] text-obsidian-800">
              {considerations.map((i) => (
                <li key={i} className="flex items-start gap-3">
                  <Info className="mt-0.5 size-5 shrink-0 text-imperial-700" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
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
                Voucher, comissionamento e agenda protegida são combinados
                caso a caso. Atendimento em português, espanhol e inglês.
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
