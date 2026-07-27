import type { ReactNode } from "react";

export interface TechPanelProps
  extends Readonly<{
    children: ReactNode;
    className?: string;
  }> {}

export function TechPanel({ children, className = "" }: TechPanelProps) {
  return <section className={`tech-panel ${className}`}>{children}</section>;
}
