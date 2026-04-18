"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroVideoProps {
  src: string;
  poster: string | StaticImageData;
  className?: string;
  posterAlt?: string;
  /** Minimum viewport width (px) before the video element is mounted. */
  minWidth?: number;
}

/**
 * Background mídia que:
 * - sempre renderiza a foto como primeiro frame (sem flash escuro);
 * - só monta o <video> em viewports >= `minWidth` (padrão 768 px), porque em
 *   mobile 4G o custo do vídeo raramente compensa;
 * - respeita prefers-reduced-motion (não inicia playback);
 * - toca só quando visível (IntersectionObserver).
 */
export function HeroVideo({
  src,
  poster,
  className,
  posterAlt = "",
  minWidth = 768,
}: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => setShouldMount(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [minWidth]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !shouldMount) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            v.play().catch(() => {
              /* autoplay bloqueado; foto fica como fallback */
            });
          } else {
            v.pause();
          }
        }
      },
      { threshold: 0.1 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [shouldMount]);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <Image
        src={poster}
        alt={posterAlt}
        fill
        priority
        sizes="100vw"
        placeholder={typeof poster === "string" ? "empty" : "blur"}
        className="object-cover"
      />
      {shouldMount && (
        <video
          ref={ref}
          src={src}
          poster={typeof poster === "string" ? poster : poster.src}
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setReady(true)}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            ready ? "opacity-100" : "opacity-0",
          )}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
