"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLocale } from "@/i18n/provider";
import { localePath } from "@/i18n/routing";
import { Container } from "./container";
import { Logo } from "./logo";
import { Button } from "./button";
import { UtilityStrip } from "./utility-strip";

const HIDE_THRESHOLD = 140;

export function Navbar() {
  const { locale, dict } = useLocale();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 12);

    if (open) {
      setHidden(false);
      return;
    }
    if (latest > previous && latest > HIDE_THRESHOLD) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    }
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Focus trap + keyboard shortcuts para o menu mobile
  useEffect(() => {
    if (!open) return;
    const container = menuRef.current;
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
        setOpen(false);
        triggerRef.current?.focus();
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
  }, [open]);

  const homePath = localePath(locale, "/");
  const ticketsPath = localePath(locale, "/ingressos");

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? "-110%" : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 w-full transition-colors duration-500",
        scrolled
          ? "navbar-shadow bg-obsidian-950/88 backdrop-blur-md"
          : "bg-obsidian-950/35 backdrop-blur-sm",
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
            className="inline-flex size-10 items-center justify-center rounded-full border border-champagne-300/30 text-pearl-100 transition-colors hover:border-champagne-300/60 md:hidden"
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
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      {open && (
        <div
          ref={menuRef}
          id="mobile-menu"
          className="md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={dict.navbar.menuOpen}
        >
          <div className="border-t border-champagne-400/20 bg-obsidian-950/95 backdrop-blur-md">
            <Container className="flex flex-col gap-1 py-5">
              {dict.navbar.links.map((l) => (
                <Link
                  key={l.href}
                  href={localePath(locale, l.href)}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm uppercase tracking-[0.14em] text-pearl-100/90 transition-colors hover:bg-white/5 hover:text-champagne-300"
                >
                  {l.label}
                </Link>
              ))}
              <Button asChild className="mt-3" variant="gold">
                <Link href={ticketsPath} onClick={() => setOpen(false)}>
                  {dict.navbar.ctaBuy}
                </Link>
              </Button>
            </Container>
          </div>
        </div>
      )}
    </motion.header>
  );
}
