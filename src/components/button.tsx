import { Slot } from "@/components/slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-amethyst-700 text-white shadow-sm hover:bg-amethyst-800 hover:shadow-md active:scale-[0.98]",
        gold: "bg-citrine-500 text-quartz-900 shadow-sm hover:bg-citrine-400 hover:shadow-md active:scale-[0.98]",
        outline:
          "border border-quartz-400 bg-transparent text-foreground hover:bg-quartz-100 active:scale-[0.98]",
        ghost:
          "text-foreground hover:bg-quartz-100 active:scale-[0.98]",
        link: "text-amethyst-700 underline-offset-4 hover:underline",
        onDark:
          "border border-white/30 bg-white/10 text-white backdrop-blur hover:bg-white/20 active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-14 px-8 text-base",
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
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { buttonVariants };
