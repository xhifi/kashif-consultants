import { cn } from "@/utils";

export function Input({ className, type = "text", ...props }) {
  return (
    <input
      className={cn("shadcn-input", className)}
      type={type}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }) {
  return (
    <textarea
      className={cn("shadcn-input min-h-28 resize-y", className)}
      {...props}
    />
  );
}

export function Label({ className, ...props }) {
  return (
    <label className={cn("shadcn-label", className)} {...props} />
  );
}
