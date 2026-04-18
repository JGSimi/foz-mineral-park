import type { Metadata } from "next";
import { Car, Bus, Plane, MapPin, Clock, Accessibility } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Como chegar",
  description:
    "Endereço, rotas e estacionamento do Foz Mineral Park. No caminho das Cataratas do Iguaçu. Acessível, gratuito e sinalizado.",
};

const routes = [
  {
    icon: Car,
    title: "De carro",
    body: "Av. das Cataratas — principal via do turismo de Foz. Estacionamento em frente ao parque.",
  },
  {
    icon: Bus,
    title: "De ônibus",
    body: "Linha Cataratas (TTU → Cataratas) passa em frente. Peça para descer no Foz Mineral Park.",
  },
  {
    icon: Plane,
    title: "Do aeroporto (IGU)",
    body: "Cerca de 15 minutos pela BR-469. Táxis, Uber e transfer turístico operam o dia inteiro.",
  },
];

const info = [
  { icon: MapPin, label: "Endereço", value: site.address.full },
  {
    icon: Clock,
    label: "Horário",
    value: `${site.hours.summary} · última entrada ${site.hours.lastEntry}`,
  },
  {
    icon: Accessibility,
    label: "Acessibilidade",
    value:
      "Para detalhes específicos, chame no WhatsApp antes da visita.",
  },
];

export default function ComoChegarPage() {
  return (
    <>
      <PageHero
        accent="imperial"
        eyebrow="Como chegar"
        title={
          <>
            No caminho das Cataratas, do{" "}
            <em className="italic text-champagne-300">Marco</em> e do Parque das
            Aves.
          </>
        }
        description={`Nosso endereço é fácil: ${site.address.street}, Foz do Iguaçu. Aberto todos os dias.`}
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-6 md:grid-cols-3">
          {routes.map((r) => (
            <div
              key={r.title}
              className="rounded-3xl border border-pearl-300 bg-pearl-50 p-8 transition-all duration-500 hover:border-champagne-300 hover:shadow-luxe"
            >
              <div className="inline-flex size-11 items-center justify-center rounded-full border border-champagne-400/40 bg-obsidian-900 text-champagne-300">
                <r.icon className="size-5" />
              </div>
              <h2 className="mt-5 font-display text-xl text-obsidian-900">
                {r.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-pearl-700">
                {r.body}
              </p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-20 sm:py-24">
        <Container>
          <div className="frame-gold overflow-hidden rounded-3xl border border-transparent bg-pearl-50 shadow-luxe">
            <iframe
              title="Mapa do Foz Mineral Park no Google Maps"
              src="https://www.google.com/maps?q=Av.+das+Cataratas+6025+Foz+do+Iguacu&output=embed"
              className="aspect-[16/9] w-full border-0 grayscale-[20%] transition-all hover:grayscale-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="grid gap-4 p-8 sm:grid-cols-3">
              {info.map((i) => (
                <div key={i.label} className="flex items-start gap-3">
                  <i.icon className="mt-0.5 size-5 shrink-0 text-champagne-700" />
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.28em] text-pearl-600">
                      {i.label}
                    </p>
                    <p className="mt-1 text-sm text-obsidian-900">{i.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container size="md" className="text-center">
          <SectionHeading
            align="center"
            eyebrow="Pronto para vir"
            title={
              <>
                Confirme data e horário{" "}
                <em className="italic text-champagne-600">em minutos</em>
              </>
            }
          />
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="gold">
              <a
                href={site.social.googleMaps}
                target="_blank"
                rel="noreferrer"
              >
                Abrir no Google Maps
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={`https://wa.me/${site.contact.whatsapp.replace("+", "")}`}
                target="_blank"
                rel="noreferrer"
              >
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
