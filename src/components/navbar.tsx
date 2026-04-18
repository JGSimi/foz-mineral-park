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
    const onScroll = () => setScrolled(window.scrollY > 8);
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
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-16 items-center justify-between sm:h-20">
        <Link href="/" aria-label="Ir para a página inicial">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm text-quartz-700 transition-colors hover:bg-quartz-100 hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            variant="primary"
            className="hidden sm:inline-flex"
          >
            <Link href="/ingressos">Comprar ingresso</Link>
          </Button>
          <button
            type="button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="inline-flex size-10 items-center justify-center rounded-full border border-border md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="md:hidden" role="dialog" aria-modal="true">
          <div className="border-t border-border bg-background">
            <Container className="flex flex-col gap-1 py-4">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-base text-foreground hover:bg-quartz-100"
                >
                  {l.label}
                </Link>
              ))}
              <Button asChild className="mt-2" variant="primary">
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
