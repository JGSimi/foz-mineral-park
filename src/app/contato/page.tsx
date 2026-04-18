import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com o Foz Mineral Park. WhatsApp, telefone, e-mail e formulário. Atendemos agências, grupos escolares e visitantes individuais.",
};

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title={
          <>
            A gente adora saber que{" "}
            <em className="italic text-champagne-300">você está vindo</em>.
          </>
        }
        description="Responde em minutos pelo WhatsApp nos horários comerciais. Para agências e grupos escolares, temos equipe dedicada."
      />

      <section className="py-16">
        <Container className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-start">
          <ContactForm />

          <aside className="space-y-5 rounded-3xl border border-pearl-300 bg-pearl-50 p-8 shadow-luxe">
            <SectionHeading
              eyebrow="Canais diretos"
              title={
                <>
                  Se preferir,{" "}
                  <em className="italic text-champagne-600">fale agora</em>
                </>
              }
            />
            <ul className="space-y-4 pt-2 text-sm text-obsidian-800">
              <InfoItem
                icon={Phone}
                label="WhatsApp · Telefone"
                value={site.contact.phoneDisplay}
                href={`https://wa.me/${site.contact.whatsapp.replace("+", "")}`}
              />
              <InfoItem
                icon={Mail}
                label="E-mail"
                value={site.contact.email}
                href={`mailto:${site.contact.email}`}
              />
              <InfoItem
                icon={MapPin}
                label="Endereço"
                value={site.address.full}
              />
              <InfoItem
                icon={Clock}
                label="Horário"
                value={site.hours.summary}
                detail={`Última entrada às ${site.hours.lastEntry}`}
              />
            </ul>
          </aside>
        </Container>
      </section>
    </>
  );
}

function InfoItem({
  icon: Icon,
  label,
  value,
  detail,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  detail?: string;
  href?: string;
}) {
  const body = (
    <>
      <p className="text-[0.6rem] uppercase tracking-[0.28em] text-champagne-700">
        {label}
      </p>
      <p className="mt-1 font-display text-base text-obsidian-900">{value}</p>
      {detail && <p className="text-xs text-pearl-600">{detail}</p>}
    </>
  );
  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 size-5 shrink-0 text-champagne-700" />
      <div>
        {href ? (
          <a href={href} className="hover:text-champagne-700">
            {body}
          </a>
        ) : (
          body
        )}
      </div>
    </li>
  );
}
