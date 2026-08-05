"use client";

import { ChartPanel } from "@/components/ChartPanel";
import { FooterRail } from "@/components/FooterRail";
import MainHeader from "@/components/MainHeader";
import { QueryBar } from "@/components/QueryBar";
import { StatCard } from "@/components/StatCard";
import { chartPanels, dashboardTitle, queryActions, statCards, getCityDashboardData, unitFilters } from "@/data/mockData";
import { useClock } from "@/hooks/useClock";
import { useDashboardFilters } from "@/hooks/useDashboardFilters";
import type { ChartPanelData, StatCardData } from "@/types/dashboard";
import { useMemo } from "react";

export interface DashboardPageProps
  extends Readonly<{
    panels?: ChartPanelData[];
    cards?: StatCardData[];
    backHref?: string;
    backLabel?: string;
  }> {}

export default function DashboardPage({ panels: initialPanels, cards: initialCards, backHref, backLabel = "返回省公司" }: DashboardPageProps) {
  const clock = useClock();
  const filters = useDashboardFilters();

  const { panels, cards } = useMemo(() => {
    // 如果是地市页面直接传入了数据，则使用传入的数据
    if (initialPanels || initialCards) {
      return { panels: initialPanels ?? chartPanels, cards: initialCards ?? statCards };
    }

    // 根据选择的单位动态切换数据
    if (filters.selectedUnit === "all") {
      return { panels: chartPanels, cards: statCards };
    }

    // 查找选中的单位名称
    const selectedUnitOption = unitFilters.find(u => u.id === filters.selectedUnit);
    const cityName = selectedUnitOption?.label ?? "";
    
    // 获取地市数据
    const cityData = getCityDashboardData(cityName);
    if (cityData) {
      return { panels: cityData.panels, cards: cityData.cards };
    }

    return { panels: chartPanels, cards: statCards };
  }, [filters.selectedUnit, initialPanels, initialCards]);

  return (
    <div className="dashboard-shell min-h-screen w-full overflow-x-hidden p-dashboard text-slate-100 dark:text-slate-100">
      <MainHeader clock={clock} title={dashboardTitle} />
      <QueryBar
        backHref={backHref}
        backLabel={backLabel}
        createDateChangeHandler={filters.createDateChangeHandler}
        dateFilters={filters.dateFilters}
        onOrderTypeChange={filters.handleOrderTypeChange}
        onReset={filters.handleReset}
        onSearch={filters.handleSubmit}
        onUnitChange={filters.handleUnitChange}
        orderTypes={filters.orderTypes}
        resetLabel={queryActions.reset}
        searchLabel={queryActions.search}
        selectedOrderType={filters.selectedOrderType}
        selectedUnit={filters.selectedUnit}
        unitOptions={filters.unitOptions}
      />
      <main className="grid auto-rows-[minmax(13.5rem,auto)] grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <StatCard card={card} key={card.id} />
        ))}
        {panels.map((panel) => (
          <div className={`${panel.className ?? "min-h-[17rem]"} ${panel.span === "full" ? "xl:col-span-4" : "xl:col-span-2"}`} key={panel.id}>
            <ChartPanel panel={panel} />
          </div>
        ))}
      </main>
      <FooterRail />
    </div>
  );
}
