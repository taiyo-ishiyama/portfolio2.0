import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type TypographyProps = {
  children: ReactNode;
  className?: string;
};

export function H1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-5xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2
      className={cn(
        "font-heading text-3xl font-semibold leading-tight tracking-tight sm:text-4xl",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3
      className={cn("font-heading text-xl font-semibold tracking-tight", className)}
    >
      {children}
    </h3>
  );
}

export function Lead({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-lg text-muted-foreground", className)}>{children}</p>
  );
}

export function Text({ children, className }: TypographyProps) {
  return <p className={cn("text-base leading-relaxed", className)}>{children}</p>;
}

export function Small({ children, className }: TypographyProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}
