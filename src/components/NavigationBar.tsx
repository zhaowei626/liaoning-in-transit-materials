"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavigationItem } from "@/types/dashboard";

export interface NavigationBarProps
  extends Readonly<{
    items: NavigationItem[];
    align?: "left" | "right";
  }> {}

export function NavigationBar({ items, align = "left" }: NavigationBarProps) {
  const pathname = usePathname();
  const alignmentClass = align === "right" ? "justify-end" : "justify-start";

  return (
    <nav className={`flex flex-wrap gap-2 ${alignmentClass}`} aria-label={align}>
      {items.map((item) => {
        const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={`nav-chip min-w-20 px-5 py-1 text-center text-sm font-semibold text-slate-200 transition-colors dark:text-slate-200 ${
              isActive
                ? "border-b-2 border-cyanCore bg-cyanCore/20 text-cyanCore shadow-cyanGlow dark:border-cyanCore dark:bg-cyanCore/20 dark:text-cyanCore"
                : "bg-slateGlass text-slate-300 hover:bg-slate-700/60 hover:text-white dark:bg-slateGlass dark:text-slate-300 dark:hover:bg-slate-700/60"
            }`}
            href={item.href}
            key={item.id}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
