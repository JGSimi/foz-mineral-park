"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MotionMediaProps {
  src: StaticImageData;
  alt: string;
  sizes: string;
  children?: ReactNode;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  priority?: boolean;
}

export function MotionMedia({
  src,
  alt,
  sizes,
  children,
  className,
  imageClassName,
  overlayClassName,
  priority = false,
}: MotionMediaProps) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      whileHover={reduced ? undefined : { scale: 1.015 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={cn("relative overflow-hidden", className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        className={cn(
          "object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]",
          imageClassName,
        )}
      />
      <div
        className={cn("absolute inset-0", overlayClassName)}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}
