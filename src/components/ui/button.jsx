import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold leading-none outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "button-primary",
        outline: "button-outline",
        ghost: "bg-transparent hover:bg-black/5",
        light: "bg-[var(--background)] text-[var(--foreground)]",
      },
      size: {
        default: "min-h-12",
        sm: "min-h-10 px-4 text-xs",
        lg: "min-h-14 px-7 text-base",
        icon: "size-11 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Button({
  asChild = false,
  className,
  size,
  variant,
  ...props
}) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      className={cn(buttonVariants({ className, size, variant }))}
      {...props}
    />
  );
}
