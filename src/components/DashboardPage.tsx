"use client";

import { ChartPanel } from "@/components/ChartPanel";
import { FooterRail } from "@/components/FooterRail";
import { MainHeader } from "@/components/MainHeader";
import { QueryBar } from "@/components/QueryBar";
import { StatCard } from "@/components/StatCard";
import { chartPanels, dashboardTitle, queryActions, statCards } from "@/data/mockData";
import { useClock } from "@/hooks/useClock";
import { useDashboardFilters } from "@/hooks/useDashboardFilters";
import type { ChartPanelData, StatCardData } from "@/types/dashboard";

export interface DashboardPageProps
  extends Readonly<{
    panels?: ChartPanelData[];
    cards?: StatCardData[];
    backHref?: string;
    backLabel?: string;
  }> {}

export function DashboardPage({ panels = chartPanels, cards = statCards, backHref, backLabel = "返回省公司" }: DashboardPageProps) {
  const clock = useClock();
  const filters = useDashboardFilters();

  return (
    <div className="dashboard-shell min-h-screen w-full overflow-x-hidden p-dashboard text-slate-100 dark:text-slate-100">
      <MainHeader clock={clock} title={dashboardTitle} />
      <QueryBar
        backHref={backHref}
        backLabel={backLabel}
        createDateChangeHandler={filters.createDateChangeHandler}
        createOrderTypeHandler={filters.createOrderTypeHandler}
        dateFilters={filters.dateFilters}
        onReset={filters.handleReset}
        onSearch={filters.handleSubmit}
        orderTypes={filters.orderTypes}
        resetLabel={queryActions.reset}
        searchLabel={queryActions.search}
      />
      <main className="grid auto-rows-[minmax(13.5rem,auto)] grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <StatCard card={card} key={card.id} />
        ))}
        {panels.map((panel) => (
          <div className={`min-h-[17rem] ${panel.span === "full" ? "xl:col-span-4" : "xl:col-span-2"}`} key={panel.id}>
            <ChartPanel panel={panel} />
          </div>
        ))}
      </main>
      <FooterRail />
    </div>
  );
}
