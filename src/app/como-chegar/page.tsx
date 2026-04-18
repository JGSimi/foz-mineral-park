import type { Metadata } from "next";
import { Car, Bus, Plane, MapPin, Clock, Accessibility } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Como chegar",
  description:
    "Endereço, rotas e estacionamento do Foz Mineral Park. No caminho das Cataratas do Iguaçu. Acessível, gratuito e sinalizado.",
};

const routes = [
  {
    icon: Car,
    title: "De carro",
    body: "Av. das Cataratas — principal via do turismo. Estacionamento gratuito e monitorado na porta.",
  },
  {
    icon: Bus,
    title: "De ônibus",
    body: "Linha Cataratas (TTU → Cataratas). Peça para descer no Mineral Park.",
  },
  {
    icon: Plane,
    title: "Do aeroporto (IGU)",
    body: "15 minutos pela BR-469. Táxis, Uber e transfer turístico funcionam o dia inteiro.",
  },
];

const info = [
  { icon: MapPin, label: "Endereço", value: site.address.full },
  { icon: Clock, label: "Horário", value: site.hours.summary + ` (última entrada ${site.hours.lastEntry})` },
  { icon: Accessibility, label: "Acessibilidade", value: "Piso plano, rampas, sinalização tátil e banheiros adaptados." },
];

export default function ComoChegarPage() {
  return (
    <>
      <section className="pt-24 pb-12 sm:pt-32">
        <Container className="max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-amethyst-700">
            Como chegar
          </p>
          <h1 className="mt-3 text-balance text-5xl sm:text-6xl">
            No caminho das Cataratas, do Marco e do Parque das Aves.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-quartz-600">
            Nosso endereço é fácil: {site.address.street}, Foz do Iguaçu. Aberto
            todos os dias.
          </p>
        </Container>
      </section>

      <section className="py-10">
        <Container className="grid gap-5 md:grid-cols-3">
          {routes.map((r) => (
            <div
              key={r.title}
              className="rounded-3xl border border-border bg-background p-8"
            >
              <div className="inline-flex size-11 items-center justify-center rounded-full bg-amethyst-100 text-amethyst-700">
                <r.icon className="size-5" />
              </div>
              <h2 className="mt-4 font-display text-xl text-foreground">
                {r.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-quartz-600">
                {r.body}
              </p>
            </div>
          ))}
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-border bg-background">
            <iframe
              title="Mapa do Foz Mineral Park no Google Maps"
              src="https://www.google.com/maps?q=Av.+das+Cataratas+6025+Foz+do+Iguacu&output=embed"
              className="aspect-[16/9] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="grid gap-4 p-6 sm:grid-cols-3">
              {info.map((i) => (
                <div key={i.label} className="flex items-start gap-3">
                  <i.icon className="mt-0.5 size-5 shrink-0 text-amethyst-700" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.16em] text-quartz-500">
                      {i.label}
                    </p>
                    <p className="text-sm text-foreground">{i.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container size="md" className="text-center">
          <SectionHeading
            align="center"
            eyebrow="Pronto para vir"
            title="Confirme data e horário em minutos"
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" variant="primary">
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
