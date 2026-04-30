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
  const displayedTimeRef = useRef(0);
  const targetTimeRef = useRef(0);
  const [shouldMount, setShouldMount] = useState(false);
  const [ready, setReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [allowScrollInteractive, setAllowScrollInteractive] = useState(scrollInteractive);

  useEffect(() => {
    const widthMq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopMq = window.matchMedia("(min-width: 1024px)");

    const update = () => {
      setShouldMount(widthMq.matches);
      setReducedMotion(reducedMq.matches);
      setAllowScrollInteractive(
        scrollInteractive && !reducedMq.matches && desktopMq.matches,
      );
    };

    update();
    widthMq.addEventListener("change", update);
    reducedMq.addEventListener("change", update);
    desktopMq.addEventListener("change", update);

    return () => {
      widthMq.removeEventListener("change", update);
      reducedMq.removeEventListener("change", update);
      desktopMq.removeEventListener("change", update);
    };
  }, [minWidth, scrollInteractive]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !shouldMount || allowScrollInteractive || reducedMotion) return;

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
  }, [allowScrollInteractive, reducedMotion, shouldMount]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !shouldMount || !allowScrollInteractive || !duration) return;

    let raf = 0;
    const safeDuration = Math.max(0, duration - 0.05);

    const readTargetTime = () => {
      const wrapper = containerRef.current;
      if (!wrapper) return targetTimeRef.current;

      const rect = wrapper.getBoundingClientRect();
      const viewport = window.innerHeight;
      const scrollDistance = Math.max(1, rect.height - viewport);
      const progress = Math.max(0, Math.min(1, -rect.top / scrollDistance));
      targetTimeRef.current = progress * safeDuration;
      return targetTimeRef.current;
    };

    const tick = () => {
      const targetTime = targetTimeRef.current;
      const currentTime = displayedTimeRef.current;
      const diff = targetTime - currentTime;
      const nextTime =
        Math.abs(diff) < 0.006
          ? targetTime
          : currentTime +
            Math.sign(diff) * Math.min(Math.abs(diff) * 0.22, 0.1);

      displayedTimeRef.current = nextTime;
      if (Math.abs(v.currentTime - nextTime) > 0.006) {
        v.currentTime = nextTime;
      }
      if (!v.paused) v.pause();
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      readTargetTime();
    };

    displayedTimeRef.current = readTargetTime();
    v.currentTime = displayedTimeRef.current;
    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [allowScrollInteractive, duration, shouldMount]);

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
          autoPlay={!allowScrollInteractive && !reducedMotion}
          loop={!allowScrollInteractive}
          playsInline
          preload={allowScrollInteractive ? "auto" : "metadata"}
          onLoadedData={() => setReady(true)}
          onCanPlay={() => setReady(true)}
          onLoadedMetadata={(event) => {
            setDuration(event.currentTarget.duration || 0);
            if (allowScrollInteractive) setReady(true);
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

  if (allowScrollInteractive) {
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
