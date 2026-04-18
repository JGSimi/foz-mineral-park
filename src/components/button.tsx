import { Slot } from "@/components/slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap overflow-hidden rounded-full text-sm font-medium tracking-wide transition-all duration-500 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-obsidian-900 text-pearl-100 shadow-[0_10px_24px_-12px_rgba(10,9,16,0.45)] hover:bg-obsidian-800 hover:shadow-[0_18px_40px_-12px_rgba(10,9,16,0.55)] active:scale-[0.985]",
        gold:
          "text-obsidian-950 shadow-[0_10px_28px_-10px_rgba(180,119,48,0.55)] hover:shadow-[0_20px_50px_-12px_rgba(180,119,48,0.8)] active:scale-[0.985] [background:linear-gradient(145deg,#f4ead1,#dbb46e_40%,#c89347_60%,#915a25)]",
        outline:
          "border border-pearl-400 bg-transparent text-foreground hover:border-champagne-400 hover:text-obsidian-950 active:scale-[0.985]",
        ghost:
          "text-foreground hover:bg-pearl-200 active:scale-[0.985]",
        link: "text-imperial-700 underline-offset-4 hover:underline",
        onDark:
          "border border-champagne-300/30 bg-white/5 text-pearl-100 backdrop-blur hover:border-champagne-300/60 hover:bg-white/10 active:scale-[0.985]",
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

export function Button({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  const showShine = variant === "gold" || variant === "onDark";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <>
        {children}
        {showShine && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[1100ms] ease-out group-hover/btn:translate-x-full"
          />
        )}
      </>
    </Comp>
  );
}

export { buttonVariants };
