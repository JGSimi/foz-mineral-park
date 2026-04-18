import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import { site } from "@/lib/site";
import { Container } from "@/components/container";
import { Button } from "@/components/button";

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
      <section className="pt-24 pb-10 sm:pt-32">
        <Container className="max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-amethyst-700">
            FAQ
          </p>
          <h1 className="mt-3 text-balance text-5xl sm:text-6xl">
            Perguntas que a gente recebe todo dia.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-quartz-600">
            Não achou o que procura? Fale com a gente — respondemos em minutos
            no WhatsApp.
          </p>
        </Container>
      </section>

      <section className="py-10">
        <Container size="md">
          <dl className="divide-y divide-border rounded-3xl border border-border bg-background">
            {faqs.map((f) => (
              <div key={f.q} className="p-6">
                <dt className="font-display text-lg text-foreground">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-quartz-600">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="primary" size="lg">
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
