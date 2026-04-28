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
  /** Quando true, o vídeo responde ao progresso de rolagem da seção. */
  scrollInteractive?: boolean;
}

/**
 * Background mídia que:
 * - sempre renderiza a foto como primeiro frame (sem flash escuro);
 * - monta o <video> só em viewports >= `minWidth` (padrão 768 px), salvo
 *   quando a página chama com `minWidth={0}`;
 * - respeita prefers-reduced-motion (não inicia playback);
 * - no modo interativo, fixa o vídeo na tela e usa o progresso da seção para
 *   controlar o frame, como uma cena de scroll-scrub.
 */
export function HeroVideo({
  src,
  poster,
  className,
  posterAlt = "",
  minWidth = 768,
  scrollInteractive = true,
}: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);
  const [ready, setReady] = useState(false);
  const [duration, setDuration] = useState(0);

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
    if (!v || !shouldMount || scrollInteractive) return;

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
  }, [scrollInteractive, shouldMount]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !shouldMount || !scrollInteractive || !duration) return;

    let raf = 0;

    const updateByScroll = () => {
      const wrapper = containerRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const viewport = window.innerHeight;
      const scrollDistance = Math.max(1, rect.height - viewport);
      const progress = Math.max(0, Math.min(1, -rect.top / scrollDistance));
      const safeDuration = Math.max(0, duration - 0.05);
      const targetTime = progress * safeDuration;

      if (Math.abs(v.currentTime - targetTime) > 0.033) {
        v.currentTime = targetTime;
      }
      if (!v.paused) v.pause();
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateByScroll);
    };

    updateByScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [duration, scrollInteractive, shouldMount]);

  const media = (
    <>
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
          loop={!scrollInteractive}
          playsInline
          preload={scrollInteractive ? "auto" : "none"}
          onLoadedData={() => setReady(true)}
          onCanPlay={() => setReady(true)}
          onLoadedMetadata={(event) => {
            setDuration(event.currentTarget.duration || 0);
            if (scrollInteractive) setReady(true);
          }}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
            ready ? "opacity-100" : "opacity-0",
          )}
          aria-hidden="true"
        />
      )}
    </>
  );

  if (scrollInteractive) {
    return (
      <div
        ref={containerRef}
        className={cn("relative h-[320svh] bg-obsidian-950", className)}
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-obsidian-950">
          <div className="relative h-full w-full">{media}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
    >
      {media}
    </div>
  );
}
