"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroVideoProps {
  src: string;
  poster: string;
  className?: string;
  posterAlt?: string;
}

/**
 * Background video that fades in over a static poster once ready.
 * - Always renders the poster first so there's never a blank/dark flash.
 * - Plays only when element is in view (saves mobile data).
 * - Honors prefers-reduced-motion by never starting playback.
 */
export function HeroVideo({
  src,
  poster,
  className,
  posterAlt = "",
}: HeroVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            v.play().catch(() => {
              /* autoplay blocked by browser; poster stays */
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
  }, []);

  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
      <Image
        src={poster}
        alt={posterAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <video
        ref={ref}
        src={src}
        poster={poster}
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
    </div>
  );
}
