"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeroVideoProps {
  src: string;
  poster: string | StaticImageData;
  className?: string;
  posterAlt?: string;
  /** Minimum viewport width (px) before the motion layer is mounted. */
  minWidth?: number;
  /** Quando true, o vídeo responde ao progresso de rolagem da seção. */
  scrollInteractive?: boolean;
  children?: ReactNode;
}

/**
 * Mídia hero com dois modos:
 * - vídeo normal para background autoplay em seções não interativas;
 * - seção sticky em que o MP4 acompanha o scroll via currentTime.
 *
 * O modo interativo deve receber um MP4 próprio para scrub, com keyframes
 * densos/all-intra. MP4 comum salta porque cada mudança de currentTime é seek.
 */
export function HeroVideo({
  src,
  poster,
  className,
  posterAlt = "",
  minWidth = 768,
  scrollInteractive = false,
  children,
}: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const targetTimeRef = useRef(0);
  const displayedTimeRef = useRef(0);
  const [shouldMount, setShouldMount] = useState(false);
  const [ready, setReady] = useState(false);
  const [duration, setDuration] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => {
      setReducedMotion(reduced.matches);
      setShouldMount(mq.matches && !reduced.matches);
    };
    update();
    mq.addEventListener("change", update);
    reduced.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      reduced.removeEventListener("change", update);
    };
  }, [minWidth]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !shouldMount || !scrollInteractive || !ready) return;

    const prime = () => {
      v.muted = true;
      v.playsInline = true;
      v.play()
        .then(() => {
          v.pause();
          if (v.currentTime === 0) v.currentTime = 0.001;
        })
        .catch(() => {
          /* Safari pode exigir primeiro toque; o listener abaixo tenta de novo. */
        });
    };

    prime();
    document.addEventListener("touchstart", prime, {
      once: true,
      passive: true,
    });
    return () => document.removeEventListener("touchstart", prime);
  }, [ready, scrollInteractive, shouldMount]);

  useEffect(() => {
    const v = videoRef.current;
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
    const v = videoRef.current;
    if (!v || !shouldMount || !scrollInteractive || !ready || !duration) return;

    let raf = 0;
    const safeDuration = Math.max(0, duration - 0.08);

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
      const target = readTargetTime();
      const current = displayedTimeRef.current;
      const diff = target - current;
      const nextTime =
        Math.abs(diff) < 0.006
          ? target
          : current +
            Math.sign(diff) * Math.min(Math.abs(diff) * 0.22, 0.12);

      displayedTimeRef.current = nextTime;
      if (Math.abs(v.currentTime - nextTime) > 0.006) {
        v.currentTime = nextTime;
      }
      if (!v.paused) v.pause();

      raf = requestAnimationFrame(tick);
    };

    displayedTimeRef.current = readTargetTime();
    v.currentTime = displayedTimeRef.current;
    raf = requestAnimationFrame(tick);

    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [duration, ready, scrollInteractive, shouldMount]);

  const posterImage = (
    <Image
      src={poster}
      alt={posterAlt}
      fill
      priority
      sizes="100vw"
      placeholder={typeof poster === "string" ? "empty" : "blur"}
      className="object-cover"
    />
  );

  if (scrollInteractive) {
    return (
      <div
        ref={containerRef}
        className={cn("relative h-[320svh] bg-obsidian-950", className)}
      >
        <div className="sticky top-0 h-screen overflow-hidden bg-obsidian-950">
          <div className="relative h-full w-full">
            {posterImage}
            {shouldMount && (
              <video
                ref={videoRef}
                src={src}
                poster={typeof poster === "string" ? poster : poster.src}
                muted
                playsInline
                preload="auto"
                onLoadedMetadata={(event) => {
                  setDuration(event.currentTarget.duration || 0);
                  setReady(true);
                }}
                onCanPlay={() => setReady(true)}
                className={cn(
                  "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
                  ready ? "opacity-100" : "opacity-0",
                )}
                aria-hidden="true"
              />
            )}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,8,0.78),rgba(5,5,8,0.18)_48%,rgba(5,5,8,0.7))]"
            />
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative h-full w-full overflow-hidden", className)}
    >
      {posterImage}
      {shouldMount && (
        <video
          ref={videoRef}
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
      {reducedMotion && children}
    </div>
  );
}
