"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Gem,
  Home,
  Languages,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  Ticket,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { localeLabel, locales, type Locale } from "@/i18n/config";
import { useLocale } from "@/i18n/provider";
import { localePath, stripLocale } from "@/i18n/routing";
import { Button } from "./button";
import { Logo } from "./logo";

function WhatsAppGlyph(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.272-.099-.47-.148-.67.15-.197.297-.767.966-.94 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function AsideNavigation() {
  const { locale, dict } = useLocale();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <motion.button
        ref={triggerRef}
        type="button"
        aria-label={open ? dict.navbar.menuClose : dict.navbar.menuOpen}
        aria-expanded={open}
        aria-controls="navigation-aside"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "fixed left-4 top-4 z-50 inline-flex size-11 items-center justify-center rounded-full border border-obsidian-900/10 bg-pearl-50/60 text-obsidian-800 shadow-luxe backdrop-blur-md transition-colors hover:border-champagne-500/35 hover:bg-pearl-50/85 sm:left-6 sm:top-6",
          open &&
            "border-champagne-300/35 bg-obsidian-950/80 text-pearl-100 shadow-luxe-dark",
        )}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? (
          <X className="size-[1.125rem]" />
        ) : (
          <Menu className="size-[1.125rem]" />
        )}
      </motion.button>

      <NavigationAside
        open={open}
        onClose={() => setOpen(false)}
        returnFocusTo={triggerRef}
        locale={locale}
        dict={dict}
      />
    </>
  );
}

function NavigationAside({
  open,
  onClose,
  returnFocusTo,
  locale,
  dict,
}: {
  open: boolean;
  onClose: () => void;
  returnFocusTo: React.RefObject<HTMLButtonElement | null>;
  locale: Locale;
  dict: ReturnType<typeof useLocale>["dict"];
}) {
  const [mounted, setMounted] = useState(false);
  const [basePath, setBasePath] = useState("/");
  const panelRef = useRef<HTMLElement>(null);
  const ticketsPath = localePath(locale, "/ingressos");
  const phoneClean = site.contact.phone.replace(/\s|\(|\)|-/g, "");

  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      setBasePath(stripLocale(window.location.pathname));
    }, 0);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    panel.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        returnFocusTo.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose, returnFocusTo]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="nav-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24 }}
            className="fixed inset-0 z-[58] bg-obsidian-950/35 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.aside
            ref={panelRef}
            id="navigation-aside"
            key="navigation-aside"
            role="dialog"
            aria-modal="true"
            aria-label={dict.navbar.menuOpen}
            tabIndex={-1}
            initial={{ opacity: 0, x: -32, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -28, scale: 0.985 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-y-3 left-3 z-[59] flex w-[calc(100vw-1.5rem)] max-w-[25rem] flex-col overflow-hidden rounded-[30px] border border-champagne-400/35 bg-[linear-gradient(180deg,rgba(250,246,239,0.94),rgba(245,239,228,0.9))] text-obsidian-900 shadow-[0_28px_90px_-40px_rgba(16,14,22,0.65)] backdrop-blur-2xl focus:outline-none sm:inset-y-5 sm:left-5"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-champagne-500/50 to-transparent"
            />

            <div className="flex items-center justify-between gap-4 border-b border-champagne-500/15 px-5 py-5">
              <Link href={localePath(locale, "/")} onClick={onClose}>
                <Logo />
              </Link>
              <button
                type="button"
                aria-label={dict.navbar.menuClose}
                className="inline-flex size-10 items-center justify-center rounded-full border border-obsidian-900/10 bg-pearl-50/60 text-obsidian-700 shadow-luxe transition-colors hover:border-champagne-500/35 hover:text-obsidian-950"
                onClick={onClose}
              >
                <X className="size-[1.125rem]" />
              </button>
            </div>

            <div className="menu-panel-scroll flex-1 overflow-y-auto px-5 py-5">
              <a
                href={site.social.googleMaps}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                className="group flex items-start gap-3 px-1 py-2 text-sm text-pearl-700 transition-colors hover:text-obsidian-900"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-champagne-700" />
                <span>
                  <span className="block text-[0.58rem] uppercase tracking-[0.26em] text-champagne-700">
                    {dict.utility.addressLabel}
                  </span>
                  <span className="mt-1 block leading-relaxed text-obsidian-800">
                    {site.address.street}, {site.address.city}
                  </span>
                </span>
              </a>

              <nav className="mt-7" aria-label="Navegação principal">
                <motion.ul
                  className="border-y border-champagne-500/15"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: { staggerChildren: 0.045, delayChildren: 0.08 },
                    },
                  }}
                >
                  <NavItem
                    href={localePath(locale, "/")}
                    label={site.name}
                    icon={<Home className="size-4" />}
                    onClose={onClose}
                  />
                  {dict.navbar.links.map((link) => (
                    <NavItem
                      key={link.href}
                      href={localePath(locale, link.href)}
                      label={link.label}
                      icon={iconForHref(link.href)}
                      onClose={onClose}
                    />
                  ))}
                </motion.ul>
              </nav>

              <div className="mt-7">
                <Button asChild className="w-full shadow-luxe" size="lg" variant="primary">
                  <Link href={ticketsPath} onClick={onClose}>
                    <Ticket className="size-4" />
                    {dict.navbar.ctaBuy}
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2">
                <QuickAction
                  href={`https://wa.me/${site.contact.whatsapp.replace("+", "")}`}
                  label="WhatsApp"
                  icon={<WhatsAppGlyph className="size-4" />}
                  tint="jade"
                  onClose={onClose}
                />
                <QuickAction
                  href={`tel:${phoneClean}`}
                  label="Telefone"
                  icon={<Phone className="size-4" />}
                  tint="imperial"
                  onClose={onClose}
                />
                <QuickAction
                  href={site.social.googleMaps}
                  label={dict.utility.mapLabel}
                  icon={<Navigation className="size-4" />}
                  tint="champagne"
                  onClose={onClose}
                />
              </div>

              <div className="mt-7 border-t border-champagne-500/15 pt-5">
                <div className="flex items-center gap-2 text-[0.58rem] uppercase tracking-[0.26em] text-champagne-700">
                  <Languages className="size-3.5" />
                  Idioma
                </div>
                <div
                  role="group"
                  aria-label="Idioma"
                  className="mt-3 grid grid-cols-3 gap-2"
                >
                  {locales.map((item) => (
                    <LocaleChip
                      key={item}
                      locale={item}
                      active={item === locale}
                      basePath={basePath}
                      onClose={onClose}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function NavItem({
  href,
  label,
  icon,
  onClose,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.li
      variants={{
        hidden: { opacity: 0, x: -12 },
        show: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      <Link
        href={href}
        onClick={onClose}
        className="group flex items-center justify-between gap-4 border-b border-champagne-500/15 px-1 py-4 text-obsidian-800 transition-colors last:border-b-0 hover:text-obsidian-950"
      >
        <span className="inline-flex min-w-0 items-center gap-3">
          <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-champagne-500/25 bg-pearl-50/45 text-champagne-700 transition-colors group-hover:border-champagne-500/55 group-hover:bg-champagne-50/70">
            {icon}
          </span>
          <span className="truncate font-display text-[1.25rem] leading-none">
            {label}
          </span>
        </span>
        <ArrowRight className="size-4 shrink-0 text-champagne-700/55 transition-transform group-hover:translate-x-1 group-hover:text-champagne-700" />
      </Link>
    </motion.li>
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
  tint: "jade" | "imperial" | "champagne";
  onClose: () => void;
}) {
  const tone =
    tint === "jade"
      ? "border-jade-500/25 bg-jade-500/[0.06] text-jade-600 hover:border-jade-500/45"
      : tint === "imperial"
        ? "border-imperial-500/20 bg-imperial-500/[0.05] text-imperial-700 hover:border-imperial-500/40"
        : "border-champagne-500/25 bg-champagne-400/[0.07] text-champagne-700 hover:border-champagne-500/45";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={onClose}
      className={cn(
        "flex min-h-20 flex-col items-center justify-center gap-2 rounded-2xl border p-3 text-center transition-all hover:bg-pearl-50/70 active:scale-[0.98]",
        tone,
      )}
    >
      {icon}
      <span className="max-w-full truncate text-[0.58rem] font-medium uppercase tracking-[0.18em]">
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
        "flex h-10 items-center justify-center rounded-full border text-sm font-medium tracking-[0.18em] transition-all duration-300 active:scale-[0.97]",
        active
          ? "border-champagne-500/55 bg-champagne-400/12 text-champagne-800"
          : "border-champagne-500/18 bg-pearl-50/35 text-pearl-700 hover:border-champagne-500/40 hover:text-obsidian-900",
      )}
    >
      {localeLabel[locale]}
    </Link>
  );
}

function iconForHref(href: string) {
  if (href.includes("ingressos")) return <Ticket className="size-4" />;
  if (href.includes("como-chegar")) return <Navigation className="size-4" />;
  if (href.includes("contato")) return <MessageCircle className="size-4" />;
  return <Gem className="size-4" />;
}
