import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

import { site } from "@/lib/site";
import { Container } from "./container";
import { Logo } from "./logo";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.6l.4-3H13.5V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3z" />
    </svg>
  );
}

const columns = [
  {
    title: "O parque",
    items: [
      { href: "/#atracoes", label: "Atrações" },
      { href: "/sobre", label: "Sobre nós" },
      { href: "/faq", label: "Perguntas frequentes" },
      { href: "/ingressos", label: "Ingressos" },
    ],
  },
  {
    title: "Visita",
    items: [
      { href: "/como-chegar", label: "Como chegar" },
      { href: "/contato", label: "Fale conosco" },
      {
        href: site.social.googleMaps,
        label: "Abrir no Google Maps",
        external: true,
      },
    ],
  },
  {
    title: "Institucional",
    items: [
      { href: "/politica-de-privacidade", label: "Política de Privacidade" },
      { href: "/termos-de-uso", label: "Termos de Uso" },
      { href: "/.well-known/security.txt", label: "Segurança", external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-28 border-t border-champagne-400/15 bg-obsidian-950 text-pearl-200">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-400/60 to-transparent"
        aria-hidden="true"
      />
      <div className="grain absolute inset-0 opacity-50" aria-hidden="true" />
      <Container className="relative py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <Logo tone="dark" />
            <p className="max-w-sm text-sm leading-relaxed text-pearl-200/75">
              {site.shortDescription}
            </p>
            <div className="flex gap-3 pt-2">
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="inline-flex size-10 items-center justify-center rounded-full border border-champagne-300/20 text-pearl-200 transition-all hover:border-champagne-300/60 hover:bg-white/5 hover:text-champagne-300"
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="inline-flex size-10 items-center justify-center rounded-full border border-champagne-300/20 text-pearl-200 transition-all hover:border-champagne-300/60 hover:bg-white/5 hover:text-champagne-300"
              >
                <FacebookIcon className="size-4" />
              </a>
            </div>
          </div>

          {columns.map((c) => (
            <div key={c.title}>
              <h3 className="font-display text-[0.65rem] uppercase tracking-[0.3em] text-champagne-300">
                {c.title}
              </h3>
              <ul className="mt-5 space-y-2.5 text-sm">
                {c.items.map((item) => (
                  <li key={item.href}>
                    {"external" in item && item.external ? (
                      <a
                        href={item.href}
                        className="text-pearl-200/75 transition-colors hover:text-champagne-300"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-pearl-200/75 transition-colors hover:text-champagne-300"
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-6 border-t border-champagne-300/15 pt-10 sm:grid-cols-2 md:grid-cols-4">
          <InfoBlock
            icon={MapPin}
            label="Endereço"
            value={site.address.full}
          />
          <InfoBlock
            icon={Clock}
            label="Horário"
            value={site.hours.summary}
            detail={`Última entrada às ${site.hours.lastEntry}`}
          />
          <InfoBlock
            icon={Phone}
            label="Telefone"
            value={site.contact.phoneDisplay}
            href={`tel:${site.contact.phone.replace(/\s|\(|\)|-/g, "")}`}
          />
          <InfoBlock
            icon={Mail}
            label="E-mail"
            value={site.contact.email}
            href={`mailto:${site.contact.email}`}
          />
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-champagne-300/10 pt-6 text-xs text-pearl-200/60 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.company.legalName} — CNPJ{" "}
            {site.company.cnpj}. Todos os direitos reservados.
          </p>
          <p>
            Site próprio. Dados tratados segundo a LGPD — consulte nossa{" "}
            <Link
              href="/politica-de-privacidade"
              className="underline decoration-champagne-400/60 underline-offset-4 hover:text-champagne-300"
            >
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </Container>
    </footer>
  );
}

function InfoBlock({
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
  const content = (
    <>
      <p className="text-[0.6rem] uppercase tracking-[0.3em] text-champagne-300">
        {label}
      </p>
      <p className="mt-1.5 font-display text-sm text-pearl-100">{value}</p>
      {detail && (
        <p className="text-xs text-pearl-200/60">{detail}</p>
      )}
    </>
  );
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-champagne-300" />
      <div>
        {href ? (
          <a href={href} className="hover:text-champagne-300">
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </div>
  );
}
