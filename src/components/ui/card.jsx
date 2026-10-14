import { cn } from "@/utils";

export function Card({ className, ...props }) {
  return (
    <div className={cn("shadcn-card", className)} {...props} />
  );
}

export function CardHeader({ className, ...props }) {
  return <div className={cn("flex flex-col gap-2 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }) {
  return (
    <h3 className={cn("font-display text-xl font-semibold tracking-[-0.04em]", className)} {...props} />
  );
}

export function CardDescription({ className, ...props }) {
  return <p className={cn("text-sm leading-6 text-[var(--muted)]", className)} {...props} />;
}

export function CardContent({ className, ...props }) {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
}
