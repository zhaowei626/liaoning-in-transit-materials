"use client";

import { ChartPanel } from "@/components/ChartPanel";
import { FooterRail } from "@/components/FooterRail";
import { MainHeader } from "@/components/MainHeader";
import { QueryBar } from "@/components/QueryBar";
import { StatCard } from "@/components/StatCard";
import { chartPanels, dashboardTitle, queryActions, statCards } from "@/data/mockData";
import { useClock } from "@/hooks/useClock";
import { useDashboardFilters } from "@/hooks/useDashboardFilters";

export interface DashboardPageProps extends Readonly<Record<string, never>> {}

export function DashboardPage(_props: DashboardPageProps) {
  const clock = useClock();
  const filters = useDashboardFilters();

  return (
    <div className="dashboard-shell min-h-screen w-full overflow-x-hidden p-dashboard text-slate-100 dark:text-slate-100">
      <MainHeader clock={clock} title={dashboardTitle} />
      <QueryBar
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
        {statCards.map((card) => (
          <StatCard card={card} key={card.id} />
        ))}
        {chartPanels.map((panel) => (
          <div className="min-h-[17rem] xl:col-span-2" key={panel.id}>
            <ChartPanel panel={panel} />
          </div>
        ))}
      </main>
      <FooterRail />
    </div>
  );
}
