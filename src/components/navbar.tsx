"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container } from "./container";
import { Logo } from "./logo";
import { Button } from "./button";

const links = [
  { href: "/#atracoes", label: "Atrações" },
  { href: "/ingressos", label: "Ingressos" },
  { href: "/como-chegar", label: "Como chegar" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-500",
        scrolled
          ? "bg-obsidian-950/88 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.7)] backdrop-blur-md"
          : "bg-obsidian-950/35 backdrop-blur-sm",
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link
          href="/"
          aria-label="Ir para a página inicial"
          className="group"
        >
          <Logo tone="dark" />
        </Link>

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Navegação principal"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative rounded-full px-4 py-2 text-[0.8rem] uppercase tracking-[0.18em] text-pearl-100/80 transition-colors duration-300 hover:text-champagne-300"
            >
              <span className="relative">
                {l.label}
                <span className="absolute left-1/2 -bottom-0.5 h-px w-0 -translate-x-1/2 bg-champagne-300/80 transition-all duration-300 group-[.active]:w-full group-hover:w-full" />
              </span>
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
            <Link href="/ingressos">Comprar ingresso</Link>
          </Button>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="inline-flex size-10 items-center justify-center rounded-full border border-champagne-300/30 text-pearl-100 transition-colors hover:border-champagne-300/60 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {/* filete dourado sutil quando scrollado */}
      <div
        aria-hidden="true"
        className={cn(
          "mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-champagne-400/50 to-transparent transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0",
        )}
      />

      {open && (
        <div className="md:hidden" role="dialog" aria-modal="true">
          <div className="border-t border-champagne-400/20 bg-obsidian-950/95 backdrop-blur-md">
            <Container className="flex flex-col gap-1 py-5">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm uppercase tracking-[0.14em] text-pearl-100/90 transition-colors hover:bg-white/5 hover:text-champagne-300"
                >
                  {l.label}
                </Link>
              ))}
              <Button asChild className="mt-3" variant="gold">
                <Link href="/ingressos" onClick={() => setOpen(false)}>
                  Comprar ingresso
                </Link>
              </Button>
            </Container>
          </div>
        </div>
      )}
    </header>
  );
}
