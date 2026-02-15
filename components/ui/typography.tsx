import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

type TypographyProps = {
  children: ReactNode;
  className?: string;
};

// =============================================================================
// Sans Font (Geist Sans) - Used for 95% of text
// =============================================================================

export function H1({ children, className }: TypographyProps) {
  return (
    <h1
      className={cn(
        "font-sans text-4xl font-semibold leading-tight tracking-tight sm:text-5xl",
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
        "font-sans text-3xl font-semibold leading-tight tracking-tight sm:text-4xl",
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
      className={cn("font-sans text-xl font-semibold tracking-tight", className)}
    >
      {children}
    </h3>
  );
}

export function Lead({ children, className }: TypographyProps) {
  return (
    <p className={cn("font-sans text-lg text-muted-foreground", className)}>{children}</p>
  );
}

export function Text({ children, className }: TypographyProps) {
  return <p className={cn("font-sans text-base leading-relaxed", className)}>{children}</p>;
}

export function Small({ children, className }: TypographyProps) {
  return (
    <p className={cn("font-sans text-sm text-muted-foreground", className)}>{children}</p>
  );
}

// =============================================================================
// Mono Font (Geist Mono) - Used sparingly for tags, labels, timestamps, code
// =============================================================================

export function Tag({ children, className }: TypographyProps) {
  return (
    <span
      className={cn(
        "font-mono text-sm font-medium",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Label({ children, className }: TypographyProps) {
  return (
    <span
      className={cn(
        "font-mono text-xs uppercase tracking-widest text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Timestamp({ children, className }: TypographyProps) {
  return (
    <span
      className={cn(
        "font-mono text-xs text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}

export function Code({ children, className }: TypographyProps) {
  return (
    <code
      className={cn(
        "font-mono rounded bg-muted px-1.5 py-0.5 text-sm",
        className
      )}
    >
      {children}
    </code>
  );
}
