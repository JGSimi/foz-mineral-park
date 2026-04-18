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
    "Dúvidas comuns sobre visita, ingressos, horários, acessibilidade, acompanhantes e formas de pagamento no Foz Mineral Park.",
};

const faqs = [
  {
    q: "Quanto tempo dura a visita?",
    a: "Em média uma hora, com calma. Dá para estender na loja e na área de descanso conforme o ritmo da família.",
  },
  {
    q: "Crianças pagam?",
    a: "Crianças até 5 anos não pagam. De 6 a 12 anos pagam meia-entrada. Estudantes com documento, idosos e PcD também têm direito a meia.",
  },
  {
    q: "Quais as formas de pagamento?",
    a: "PIX, cartão de crédito, cartão de débito e boleto bancário. Em breve também compra 100% online com voucher no e-mail.",
  },
  {
    q: "O parque é acessível?",
    a: "Sim. Piso plano, rampas em todo o percurso, sinalização tátil e banheiros adaptados. Cão-guia é bem-vindo.",
  },
  {
    q: "Tem lugar para comer?",
    a: "Temos café, lanches e suvenires na entrada. Para refeições completas, há restaurantes vizinhos na Av. das Cataratas.",
  },
  {
    q: "Posso levar meu pet?",
    a: "Aceitamos animais pequenos em caixas de transporte. Cães-guia são sempre bem-vindos, sem restrição.",
  },
  {
    q: "Vocês atendem agências e grupos escolares?",
    a: "Sim. Temos equipe comercial dedicada, voucher, comissão e agenda protegida. Chame no WhatsApp ou use o formulário de contato.",
  },
  {
    q: "Posso cancelar um ingresso já comprado?",
    a: "Sim. Reembolso integral com até 7 dias de antecedência da data escolhida. Após esse prazo, oferecemos remarcação gratuita.",
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
        description="Não achou o que procura? Fale com a gente — respondemos em minutos no WhatsApp."
      />

      <section className="py-16">
        <Container size="md">
          <dl className="divide-y divide-pearl-300 overflow-hidden rounded-3xl border border-pearl-300 bg-pearl-50 shadow-luxe">
            {faqs.map((f, i) => (
              <div
                key={f.q}
                className="flex gap-5 p-7 transition-colors hover:bg-pearl-100"
              >
                <span className="font-display text-sm italic text-champagne-500 pt-1">
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
