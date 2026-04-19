"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Menu, X, MapPin, Phone, Navigation } from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { localeLabel, locales, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/provider";
import { localePath, stripLocale } from "@/i18n/routing";
import { Container } from "./container";
import { Logo } from "./logo";
import { Button } from "./button";
import { UtilityStrip } from "./utility-strip";

const HIDE_THRESHOLD = 140;

function WhatsAppGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
function InstagramGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
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
function FacebookGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.6l.4-3H13.5V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.5V21h3z" />
    </svg>
  );
}

export function Navbar() {
  const { locale, dict } = useLocale();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 12);
    if (open) {
      setHidden(false);
      return;
    }
    if (latest > previous && latest > HIDE_THRESHOLD) setHidden(true);
    else if (latest < previous) setHidden(false);
  });

  const homePath = localePath(locale, "/");
  const ticketsPath = localePath(locale, "/ingressos");

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-40 w-full transition-colors duration-500",
          scrolled
            ? "navbar-shadow bg-obsidian-950/92 backdrop-blur-md"
            : "bg-obsidian-950/85 backdrop-blur-md",
        )}
      >
        <UtilityStrip />
        <Container className="flex h-16 items-center justify-between sm:h-20">
          <Link
            href={homePath}
            aria-label="Foz Mineral Park"
            className="group"
          >
            <Logo tone="dark" />
          </Link>

          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Navegação principal"
          >
            {dict.navbar.links.map((l) => (
              <Link
                key={l.href}
                href={localePath(locale, l.href)}
                className="relative rounded-full px-4 py-2 text-[0.8rem] uppercase tracking-[0.18em] text-pearl-100/80 transition-colors duration-300 hover:text-champagne-300"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              variant="gold"
              className="hidden sm:inline-flex"
            >
              <Link href={ticketsPath}>{dict.navbar.ctaBuy}</Link>
            </Button>
            <button
              ref={triggerRef}
              type="button"
              aria-label={open ? dict.navbar.menuClose : dict.navbar.menuOpen}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="inline-flex size-11 items-center justify-center rounded-full border border-champagne-300/30 text-pearl-100 transition-colors active:scale-95 hover:border-champagne-300/60 md:hidden"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </Container>

        <div
          aria-hidden="true"
          className={cn(
            "mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-champagne-400/50 to-transparent transition-opacity duration-500",
            scrolled ? "opacity-100" : "opacity-70",
          )}
        />
      </motion.header>

      <MobileSheet
        open={open}
        onClose={() => setOpen(false)}
        returnFocusTo={triggerRef}
        dict={dict}
        locale={locale}
        ticketsPath={ticketsPath}
      />
    </>
  );
}

function MobileSheet({
  open,
  onClose,
  returnFocusTo,
  dict,
  locale,
  ticketsPath,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
  dict: ReturnType<typeof useLocale>["dict"];
  locale: Locale;
  ticketsPath: string;
}) {
  const [mounted, setMounted] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);
  const [basePath, setBasePath] = useState("/");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setBasePath(stripLocale(window.location.pathname));
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const container = sheetRef.current;
    if (!container) return;
    const focusable = container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        returnFocusTo.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, returnFocusTo]);

  if (!mounted) return null;
  const phoneClean = site.contact.phone.replace(/\s|\(|\)|-/g, "");

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="md:hidden">
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-obsidian-950/75 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            ref={sheetRef}
            id="mobile-menu"
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={dict.navbar.menuOpen}
            className="fixed inset-x-0 bottom-0 z-[61] flex max-h-[92dvh] flex-col overflow-hidden rounded-t-[32px] border-t border-champagne-400/20 bg-obsidian-950 text-pearl-100 shadow-luxe-dark"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne-400/70 to-transparent"
            />
            <div className="flex justify-center pt-3">
              <span
                aria-hidden="true"
                className="h-1 w-10 rounded-full bg-pearl-100/20"
              />
            </div>

            <div
              className="flex-1 overflow-y-auto px-6 pt-3"
              style={{
                paddingBottom: "max(env(safe-area-inset-bottom), 1.25rem)",
              }}
            >
              <nav aria-label="Navegação">
                <motion.ul
                  className="flex flex-col"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
                    },
                  }}
                >
                  {dict.navbar.links.map((l) => (
                    <motion.li
                      key={l.href}
                      variants={{
                        hidden: { opacity: 0, x: 16 },
                        show: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.5,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        },
                      }}
                    >
                      <Link
                        href={localePath(locale, l.href)}
                        onClick={onClose}
                        className="flex items-center justify-between gap-4 border-b border-champagne-400/10 py-4 font-display text-xl text-pearl-100 transition-colors active:bg-white/5"
                      >
                        <span>{l.label}</span>
                        <span
                          aria-hidden="true"
                          className="text-champagne-300/60"
                        >
                          →
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>

              <div className="mt-6">
                <Button asChild className="w-full" size="lg" variant="gold">
                  <Link href={ticketsPath} onClick={onClose}>
                    {dict.navbar.ctaBuy}
                  </Link>
                </Button>
              </div>

              <div className="mt-7 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-gradient-to-r from-transparent via-champagne-400/30 to-transparent"
                />
                <span className="font-display text-[0.62rem] uppercase tracking-[0.3em] text-champagne-300">
                  Fale agora
                </span>
                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-gradient-to-l from-transparent via-champagne-400/30 to-transparent"
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <QuickAction
                  href={`https://wa.me/${site.contact.whatsapp.replace("+", "")}`}
                  label="WhatsApp"
                  tint="emerald"
                  icon={<WhatsAppGlyph className="size-5" />}
                  onClose={onClose}
                />
                <QuickAction
                  href={`tel:${phoneClean}`}
                  label={
                    dict.contact.aside.labels.whatsapp
                      .split("·")[1]
                      ?.trim() ?? "Telefone"
                  }
                  tint="imperial"
                  icon={<Phone className="size-5" />}
                  onClose={onClose}
                />
                <QuickAction
                  href={site.social.googleMaps}
                  label={dict.utility.mapLabel}
                  tint="champagne"
                  icon={<Navigation className="size-5" />}
                  onClose={onClose}
                />
              </div>

              <a
                href={site.social.googleMaps}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                className="mt-5 flex items-start gap-3 rounded-2xl border border-champagne-400/15 bg-white/5 p-4 text-sm text-pearl-100/80 transition-colors hover:border-champagne-400/35"
              >
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-champagne-300"
                  strokeWidth={1.4}
                />
                <span>{site.address.full}</span>
              </a>

              <div className="mt-7">
                <p className="text-[0.62rem] uppercase tracking-[0.3em] text-champagne-300/80">
                  Idioma · Language · Idioma
                </p>
                <div
                  role="group"
                  aria-label="Idioma"
                  className="mt-3 grid grid-cols-3 gap-2"
                >
                  {locales.map((l) => (
                    <LocaleChip
                      key={l}
                      locale={l}
                      active={locale === l}
                      basePath={basePath}
                      onClose={onClose}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-7 flex items-center justify-center gap-4 border-t border-champagne-400/10 pt-6">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-champagne-300/20 text-pearl-100 transition-colors active:scale-95 hover:border-champagne-300/60 hover:text-champagne-300"
                >
                  <InstagramGlyph className="size-4" />
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-champagne-300/20 text-pearl-100 transition-colors active:scale-95 hover:border-champagne-300/60 hover:text-champagne-300"
                >
                  <FacebookGlyph className="size-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function QuickAction({
  href,
  label,
  icon,
  tint,
  onClose,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  tint: "emerald" | "imperial" | "champagne";
  onClose: () => void;
}) {
  const tintClass =
    tint === "emerald"
      ? "bg-[#25D366]/12 text-[#25D366] border-[#25D366]/30"
      : tint === "imperial"
        ? "bg-imperial-500/12 text-imperial-300 border-imperial-400/30"
        : "bg-champagne-400/12 text-champagne-300 border-champagne-400/30";
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={onClose}
      className={cn(
        "group flex flex-col items-center gap-2 rounded-2xl border p-4 transition-all duration-300 active:scale-[0.97]",
        tintClass,
      )}
    >
      {icon}
      <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em]">
        {label}
      </span>
    </a>
  );
}

function LocaleChip({
  locale,
  active,
  basePath,
  onClose,
}: {
  locale: Locale;
  active: boolean;
  basePath: string;
  onClose: () => void;
}) {
  return (
    <Link
      href={localePath(locale, basePath)}
      aria-current={active ? "true" : undefined}
      hrefLang={locale}
      onClick={onClose}
      className={cn(
        "flex h-12 items-center justify-center rounded-full border font-medium tracking-[0.18em] transition-all duration-300 active:scale-[0.97]",
        active
          ? "border-champagne-400/70 bg-champagne-400/10 text-champagne-300"
          : "border-champagne-400/15 bg-white/[0.03] text-pearl-100/60 hover:border-champagne-400/40 hover:text-pearl-100",
      )}
    >
      {localeLabel[locale]}
    </Link>
  );
}
