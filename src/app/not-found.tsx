import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";

import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { GemIllustration } from "@/components/gem-illustration";

export default function NotFound() {
  return (
    <section className="relative pt-24 pb-24 sm:pt-32">
      <Container size="md" className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-amethyst-700">
            Erro 404
          </p>
          <h1 className="mt-3 text-balance text-5xl sm:text-6xl">
            Essa gema ainda não saiu do bruto.
          </h1>
          <p className="mt-5 text-quartz-600">
            A página que você procurou não existe, foi movida ou perdeu o
            brilho. Mas temos três lugares muito mais interessantes para
            sugerir.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="primary">
              <Link href="/">
                <Home className="size-4" />
                Voltar para a home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/#atracoes">
                <ArrowLeft className="size-4" />
                Ver atrações
              </Link>
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border">
          <GemIllustration accent="quartz" title="Gema em bruto" />
        </div>
      </Container>
    </section>
  );
}
