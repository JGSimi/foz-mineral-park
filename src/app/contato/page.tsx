import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com o Foz Mineral Park. WhatsApp, telefone, e-mail e formulário. Atendemos agências, grupos escolares e visitantes individuais.",
};

export default function ContatoPage() {
  return (
    <>
      <section className="pt-24 pb-10 sm:pt-32">
        <Container className="max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-amethyst-700">
            Contato
          </p>
          <h1 className="mt-3 text-balance text-5xl sm:text-6xl">
            A gente adora saber que você está vindo.
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-quartz-600">
            Responde em minutos pelo WhatsApp nos horários comerciais. Para
            agências e grupos escolares, temos equipe dedicada.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-start">
          <ContactForm />

          <aside className="space-y-4 rounded-3xl border border-border bg-quartz-50 p-8">
            <SectionHeading
              eyebrow="Canais diretos"
              title="Se preferir, fale agora mesmo"
            />
            <ul className="space-y-4 pt-2 text-sm text-quartz-700">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-5 shrink-0 text-amethyst-700" />
                <div>
                  <p className="font-medium text-foreground">WhatsApp / Telefone</p>
                  <a
                    href={`https://wa.me/${site.contact.whatsapp.replace("+", "")}`}
                    className="hover:underline"
                  >
                    {site.contact.phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-5 shrink-0 text-amethyst-700" />
                <div>
                  <p className="font-medium text-foreground">E-mail</p>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="hover:underline"
                  >
                    {site.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-amethyst-700" />
                <div>
                  <p className="font-medium text-foreground">Endereço</p>
                  <p>{site.address.full}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 size-5 shrink-0 text-amethyst-700" />
                <div>
                  <p className="font-medium text-foreground">Horário</p>
                  <p>{site.hours.summary}</p>
                </div>
              </li>
            </ul>
          </aside>
        </Container>
      </section>
    </>
  );
}
