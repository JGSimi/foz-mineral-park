import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { GemIllustration } from "@/components/gem-illustration";

/**
 * not-found desta rota é client-ignorant ao locale (params não estão
 * disponíveis em error boundaries). Texto em PT por default; quando o
 * user recarregar via link do Navbar, já vai para o locale correto.
 */
export default function NotFound() {
  return (
    <section className="relative -mt-16 overflow-hidden pb-24 pt-36 sm:-mt-20 sm:pt-48">
      <div className="bg-geode absolute inset-0 -z-10" aria-hidden="true" />
      <div className="grain absolute inset-0 -z-10" aria-hidden="true" />
      <Container
        size="md"
        className="grid gap-14 md:grid-cols-[1fr_1fr] md:items-center"
      >
        <div className="text-pearl-100">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-champagne-300">
            Erro 404 · 404 · Error
          </p>
          <h1 className="mt-5 text-balance font-display text-5xl leading-[0.98] sm:text-6xl">
            Essa gema ainda{" "}
            <em className="italic text-champagne-300">não saiu</em> do bruto.
          </h1>
          <p className="mt-6 text-pearl-200/85">
            A página que você procurou não existe, foi movida ou perdeu o
            brilho. Voltemos a algo mais brilhante.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="gold">
              <Link href="/">
                <Home className="size-4" />
                Voltar para a home
              </Link>
            </Button>
            <Button asChild variant="onDark">
              <Link href="/">
                <ArrowLeft className="size-4" />
                Home
              </Link>
            </Button>
          </div>
        </div>
        <div className="frame-gold overflow-hidden rounded-3xl shadow-luxe-dark">
          <GemIllustration accent="pearl" title="Gema em bruto" />
        </div>
      </Container>
    </section>
  );
}
