import Link from "next/link";
import { leftNavigation, rightNavigation } from "@/data/mockData";
import { NavigationBar } from "@/components/NavigationBar";

export interface MainHeaderProps
  extends Readonly<{
    title: string;
    clock: string;
  }> {}

export function MainHeader({ title, clock }: MainHeaderProps) {
  return (
    <header className="relative mb-4 flex flex-col items-center">
      <div className="header-shell absolute inset-x-0 top-0 h-20 border-b border-cyanLine dark:border-cyanLine" />
      <div className="relative z-10 grid w-full grid-cols-[1fr_auto_1fr] items-start gap-5 px-7 py-2">
        <NavigationBar items={leftNavigation} />
        <Link
          className="group flex min-w-0 items-center justify-center gap-4 whitespace-nowrap font-display text-dashboardTitle font-bold text-cyanCore outline-none transition-transform hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-cyanCore dark:text-cyanCore"
          href="/"
        >
          <span className="text-cyanCore/55 dark:text-cyanCore/55">◀</span>
          <span className="tracking-[0.1em]">{title}</span>
          <span className="text-cyanCore/55 dark:text-cyanCore/55">▶</span>
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-4">
          <NavigationBar align="right" items={rightNavigation} />
          <time className="font-display text-sm font-bold text-cyanCore dark:text-cyanCore" suppressHydrationWarning>{clock}</time>
        </div>
      </div>
    </header>
  );
}
