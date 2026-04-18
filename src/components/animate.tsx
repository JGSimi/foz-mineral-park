"use client";

import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AnimateInProps {
  children: ReactNode;
  delay?: number;
  /** vertical slide offset in px */
  y?: number;
  once?: boolean;
  as?: "div" | "section" | "article" | "li" | "ul" | "ol" | "figure";
  className?: string;
  id?: string;
}

/**
 * Scroll-triggered fade + subtle slide. Respects prefers-reduced-motion.
 */
export function AnimateIn({
  children,
  delay = 0,
  y = 16,
  once = true,
  className,
  as = "div",
  id,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25, once });
  const reduced = useReducedMotion();

  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      ref={ref}
      id={id}
      initial={reduced ? undefined : { opacity: 0, y }}
      animate={
        reduced
          ? undefined
          : inView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y }
      }
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}

const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  const reduced = useReducedMotion();

  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      ref={ref}
      variants={reduced ? undefined : staggerParent}
      initial={reduced ? undefined : "hidden"}
      animate={reduced ? undefined : inView ? "show" : "hidden"}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "figure";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      variants={reduced ? undefined : staggerChild}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
