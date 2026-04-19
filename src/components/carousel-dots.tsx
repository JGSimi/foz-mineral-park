"use client";

import { useEffect, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";

interface CarouselDotsProps {
  containerRef: RefObject<HTMLElement | null>;
  total: number;
  className?: string;
}

/**
 * Indicador de posição para um carrossel horizontal com scroll-snap.
 * Ouve o scroll do container e calcula qual item está mais centralizado.
 * Só aparece em mobile (md:hidden controla no parent).
 */
export function CarouselDots({ containerRef, total, className }: CarouselDotsProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const compute = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      const children = Array.from(el.children) as HTMLElement[];
      let nearest = 0;
      let minDist = Infinity;
      for (let i = 0; i < children.length; i++) {
        const c = children[i];
        const cCenter = c.offsetLeft + c.offsetWidth / 2;
        const dist = Math.abs(cCenter - center);
        if (dist < minDist) {
          minDist = dist;
          nearest = i;
        }
      }
      setActive(nearest);
    };

    compute();
    let frame: number | null = null;
    const onScroll = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(compute);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [containerRef]);

  return (
    <div
      role="tablist"
      aria-label="Progresso do carrossel"
      className={cn("flex items-center justify-center gap-1.5", className)}
    >
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={cn(
            "h-1 rounded-full transition-all duration-500 ease-out",
            i === active
              ? "w-6 bg-champagne-500"
              : "w-1 bg-pearl-400",
          )}
        />
      ))}
    </div>
  );
}
