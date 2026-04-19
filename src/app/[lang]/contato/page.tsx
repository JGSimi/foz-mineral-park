import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

import { site } from "@/lib/site";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";

type Params = { lang: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.contact.pageTitle };
}

export default async function ContatoPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const c = dict.contact;

  return (
    <>
      <PageHero
        accent="jade"
        eyebrow={c.pageTitle}
        title={
          <>
            {c.heroTitleLead}{" "}
            <em className="italic text-champagne-300">{c.heroTitleEm}</em>
            {c.heroTitleTail}
          </>
        }
        description={c.heroDescription}
      />

      <section className="py-20 sm:py-24">
        <Container className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-start">
          <ContactForm />

          <aside className="space-y-5 rounded-3xl border border-pearl-300 bg-pearl-50 p-8 shadow-luxe">
            <SectionHeading
              eyebrow={c.aside.eyebrow}
              title={
                <>
                  {c.aside.titleLead}{" "}
                  <em className="italic text-champagne-600">
                    {c.aside.titleEm}
                  </em>
                </>
              }
            />
            <ul className="space-y-4 pt-2 text-sm text-obsidian-800">
              <InfoItem
                icon={Phone}
                label={c.aside.labels.whatsapp}
                value={site.contact.phoneDisplay}
                href={`https://wa.me/${site.contact.whatsapp.replace("+", "")}`}
              />
              <InfoItem
                icon={Mail}
                label={c.aside.labels.email}
                value={site.contact.email}
                href={`mailto:${site.contact.email}`}
              />
              <InfoItem
                icon={MapPin}
                label={c.aside.labels.address}
                value={site.address.full}
              />
              <InfoItem
                icon={Clock}
                label={c.aside.labels.hours}
                value={site.hours.summary}
                detail={`${dict.footer.info.hoursDetail}`}
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
