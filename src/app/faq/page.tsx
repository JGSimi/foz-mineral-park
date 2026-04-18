import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { site } from "@/lib/site";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Perguntas frequentes",
  description:
    "Dúvidas comuns sobre horários, visita, ingressos e acesso ao Foz Mineral Park.",
};

const faqs = [
  {
    q: "Onde fica e quais os horários?",
    a: `${site.address.full}. Aberto ${site.hours.summary}, com última entrada às ${site.hours.lastEntry}.`,
  },
  {
    q: "Quanto tempo dura a visita?",
    a: "Cerca de uma hora no ritmo da família. Dá para estender na loja e na área de descanso conforme o interesse.",
  },
  {
    q: "Como funciona a compra de ingresso?",
    a: "Por enquanto, a reserva é feita pelo WhatsApp, com confirmação rápida pela nossa equipe. Em breve vamos disponibilizar a compra 100% online, com voucher no e-mail.",
  },
  {
    q: "Tem meia-entrada e gratuidade?",
    a: "Sim, conforme a legislação vigente (Lei 12.933/13 para estudantes e demais enquadramentos previstos em lei). Fale com nosso time para confirmar qual categoria se aplica à sua visita.",
  },
  {
    q: "O parque é acessível?",
    a: "Sim. Para detalhes específicos (rampas, banheiros adaptados, cadeiras de rodas disponíveis, cão-guia), chame no WhatsApp — a equipe confirma o que se aplica à sua visita.",
  },
  {
    q: "Onde posso estacionar?",
    a: "Há estacionamento na própria Av. das Cataratas, em frente ao parque.",
  },
  {
    q: "Recebem agências e grupos escolares?",
    a: "Sim. Temos atendimento dedicado para agências receptivas e grupos escolares — voucher, comissão e agenda são combinados caso a caso pelo nosso comercial.",
  },
  {
    q: "Quais idiomas a equipe fala?",
    a: "Recebemos visitantes de várias nacionalidades; nosso time conversa em português e, quando possível, em espanhol e inglês. Se você precisar de um atendimento específico, avise no momento da reserva.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Perguntas frequentes"
        title={
          <>
            Perguntas que a gente recebe{" "}
            <em className="italic text-champagne-300">todo dia</em>.
          </>
        }
        description="Não achou o que procura? Fale com a gente — respondemos rapidinho no WhatsApp."
      />

      <section className="py-16">
        <Container size="md">
          <dl className="divide-y divide-pearl-300 overflow-hidden rounded-3xl border border-pearl-300 bg-pearl-50 shadow-luxe">
            {faqs.map((f, i) => (
              <div
                key={f.q}
                className="flex gap-5 p-7 transition-colors hover:bg-pearl-100"
              >
                <span className="pt-1 font-display text-sm italic text-champagne-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <dt className="font-display text-lg text-obsidian-900">
                    {f.q}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-pearl-700">
                    {f.a}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="gold" size="lg">
              <Link href="/contato">Ainda tenho dúvida</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href={`https://wa.me/${site.contact.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noreferrer"
              >
                Conversar no WhatsApp
              </a>
            </Button>
          </div>
        </Container>
      </section>

      <Script
        id="faq-ld-json"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
