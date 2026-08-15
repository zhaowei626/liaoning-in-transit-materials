import type { ReactNode, HTMLAttributes } from "react";

export interface TechPanelProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
}

export function TechPanel({ children, className = "", ...props }: TechPanelProps) {
  return (
    <section className={`tech-panel ${className}`} {...props}>
      {children}
    </section>
  );
}
