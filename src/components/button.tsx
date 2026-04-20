import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden rounded-full text-sm font-medium tracking-wide transition-all duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "btn-primary-surface active:scale-[0.985]",
        // Estados do gold vêm todos de .btn-gold-surface (globals.css).
        gold: "btn-gold-surface text-obsidian-950",
        outline:
          "border border-pearl-400 bg-pearl-50/80 text-obsidian-900 backdrop-blur hover:border-champagne-500 hover:bg-pearl-50 hover:text-obsidian-950 active:scale-[0.985]",
        ghost: "text-obsidian-900 hover:bg-pearl-200 active:scale-[0.985]",
        link: "text-imperial-700 underline-offset-4 hover:underline",
        onDark:
          "border border-champagne-300/40 bg-white/5 text-pearl-100 backdrop-blur hover:border-champagne-300/80 hover:bg-white/10 active:scale-[0.985]",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-14 px-8 text-[0.95rem]",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

type AsChildProps = {
  children?: React.ReactNode;
  className?: string;
};

function Shine() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-[1400ms] ease-out group-hover/btn:translate-x-full motion-reduce:hidden"
    />
  );
}

export function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const showShine = variant === "gold" || variant === "onDark";
  const classes = cn(buttonVariants({ variant, size, className }));

  // asChild: clona o elemento (normalmente um <Link>), aplica os
  // estilos do botão nele e reempacota os filhos dentro de um span
  // z-10 — pra ficar acima da camada de brilho absoluta.
  //
  // A versão antiga usava um <Slot> que recebia um Fragment com
  // o content span + shine span. Fragment não aceita className via
  // cloneElement, então o Link ficava sem estilo nenhum. Agora
  // manipulamos o child diretamente.
  if (asChild && React.isValidElement<AsChildProps>(children)) {
    const child = children;
    return React.cloneElement(
      child,
      {
        className: cn(classes, child.props.className),
      } as AsChildProps,
      <>
        <span className="relative z-10 inline-flex items-center gap-2">
          {child.props.children}
        </span>
        {showShine && <Shine />}
      </>,
    );
  }

  return (
    <button className={classes} {...props}>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
      {showShine && <Shine />}
    </button>
  );
}

export { buttonVariants };
