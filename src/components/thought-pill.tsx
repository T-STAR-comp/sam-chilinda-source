import type { ReactNode } from "react";

type ThoughtPillProps = {
  children: ReactNode;
  className?: string;
};

export function ThoughtPill({ children, className = "" }: ThoughtPillProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border bg-secondary/40 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground ${className}`}
    >
      {children}
    </span>
  );
}
