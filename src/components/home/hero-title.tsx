"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  type PointerEvent,
} from "react";

type HeroTitleProps = {
  titleLead: string;
  titleEm: string;
  titleTail: string;
  compact: boolean;
};

export function HeroTitle({
  titleLead,
  titleEm,
  titleTail,
  compact,
}: HeroTitleProps) {
  const rootRef = useRef<HTMLHeadingElement>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const frameRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  const { fullTitle, words } = useMemo(() => {
    const leadWords = titleLead.split(/\s+/).filter(Boolean);
    const accentWords = titleEm.split(/\s+/).filter(Boolean);
    const titleWords = [
      ...leadWords.map((text) => ({ text, accent: false })),
      ...accentWords.map((text) => ({ text, accent: true })),
    ];

    if (titleTail && titleWords.length) {
      titleWords[titleWords.length - 1] = {
        ...titleWords[titleWords.length - 1],
        text: `${titleWords[titleWords.length - 1].text}${titleTail}`,
      };
    }

    return {
      fullTitle: `${titleLead}${titleEm ? ` ${titleEm}` : ""}${titleTail}`
        .replace(/\s+/g, " ")
        .trim(),
      words: titleWords,
    };
  }, [titleEm, titleLead, titleTail]);

  const resetLetters = useCallback(() => {
    if (frameRef.current !== null) {
      window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    pointerRef.current = null;

    rootRef.current
      ?.querySelectorAll<HTMLElement>("[data-hero-letter]")
      .forEach((letter) => {
        letter.style.setProperty("--repel-x", "0px");
        letter.style.setProperty("--repel-y", "0px");
        letter.style.setProperty("--repel-rotate", "0deg");
        letter.style.setProperty("--repel-scale", "1");
      });
  }, []);

  const moveLetters = useCallback(() => {
    frameRef.current = null;

    const root = rootRef.current;
    const pointer = pointerRef.current;
    if (!root || !pointer || reducedMotionRef.current) return;

    const rootRect = root.getBoundingClientRect();
    const radius = Math.min(150, Math.max(86, rootRect.width * 0.12));
    const letters = root.querySelectorAll<HTMLElement>("[data-hero-letter]");

    letters.forEach((letter) => {
      const rect = letter.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = cx - pointer.x;
      const dy = cy - pointer.y;
      const distance = Math.max(1, Math.hypot(dx, dy));
      const rawForce = Math.max(0, 1 - distance / radius);

      if (rawForce <= 0.015) {
        letter.style.setProperty("--repel-x", "0px");
        letter.style.setProperty("--repel-y", "0px");
        letter.style.setProperty("--repel-rotate", "0deg");
        letter.style.setProperty("--repel-scale", "1");
        return;
      }

      const force = rawForce * rawForce * (3 - 2 * rawForce);
      const nx = dx / distance;
      const ny = dy / distance;
      const travel = 26 * force;
      const rotate = (nx * 15 - ny * 6) * force;

      letter.style.setProperty("--repel-x", `${(nx * travel).toFixed(2)}px`);
      letter.style.setProperty(
        "--repel-y",
        `${(ny * travel - force * 3).toFixed(2)}px`,
      );
      letter.style.setProperty("--repel-rotate", `${rotate.toFixed(2)}deg`);
      letter.style.setProperty("--repel-scale", `${(1 + force * 0.045).toFixed(3)}`);
    });
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLHeadingElement>) => {
      if (
        reducedMotionRef.current ||
        (event.pointerType !== "mouse" && event.pointerType !== "pen")
      ) {
        return;
      }

      pointerRef.current = { x: event.clientX, y: event.clientY };
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(moveLetters);
      }
    },
    [moveLetters],
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => {
      reducedMotionRef.current = media.matches;
      if (media.matches) resetLetters();
    };

    syncReducedMotion();
    media.addEventListener("change", syncReducedMotion);

    return () => {
      media.removeEventListener("change", syncReducedMotion);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [resetLetters]);

  return (
    <h1
      aria-label={fullTitle}
      className={`hero-title mx-auto mt-7 max-w-6xl text-balance font-display leading-[0.9] text-obsidian-900 ${
        compact
          ? "text-[3.3rem] sm:text-[6rem] md:text-[7.75rem] lg:text-[8.35rem]"
          : "text-[2.75rem] sm:text-[4.8rem] md:text-[6rem]"
      }`}
      onMouseLeave={resetLetters}
      onPointerLeave={resetLetters}
      onPointerMove={handlePointerMove}
      ref={rootRef}
    >
      <span
        aria-hidden="true"
        className="hero-title-words inline-flex flex-wrap items-baseline justify-center gap-x-[0.18em] gap-y-1.5"
      >
        {words.map((word, wordIndex) => (
          <span
            className={`hero-title-word ${
              word.accent ? "hero-title-word-accent" : ""
            }`}
            key={`${word.text}-${wordIndex}`}
          >
            {Array.from(word.text).map((letter, letterIndex) => (
              <span
                className="hero-title-letter"
                data-hero-letter="true"
                key={`${letter}-${wordIndex}-${letterIndex}`}
              >
                {letter}
              </span>
            ))}
          </span>
        ))}
      </span>
    </h1>
  );
}
