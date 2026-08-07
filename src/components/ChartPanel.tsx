import Link from "next/link";
import dynamic from "next/dynamic";
import { SectionTitle } from "@/components/SectionTitle";
import { TechPanel } from "@/components/TechPanel";
import type { ChartPanelData, PanelMetricCard } from "@/types/dashboard";

import { HorizontalBarStat } from "@/components/HorizontalBarStat";
import { SupplierTopList } from "@/components/SupplierTopList";

// 禁用 SSR 以避免 Chart.js 的水和问题
const DashboardChart = dynamic(
  () => import("@/components/DashboardChart").then((mod) => mod.DashboardChart),
  { ssr: false }
);

export interface ChartPanelProps
  extends Readonly<{
    panel: ChartPanelData;
    extra?: React.ReactNode;
  }> {}

export function ChartPanel({ panel, extra }: ChartPanelProps) {
  const hasMetricCards = Boolean(panel.metricCards?.length);
  const isHorizontalBar = panel.layout === "horizontal-bar";
  const isSupplierTop = panel.layout === "supplier-top";

  return (
    <TechPanel className={`flex ${panel.className ? "min-h-full" : "min-h-[16rem]"} flex-col p-4`}>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-6">
          <SectionTitle className="min-w-0" title={panel.title} />
          {panel.summary ? (
            <div className="flex gap-4">
              {panel.summary.map((item, idx) => {
                const toneClass = item.tone === "amber" ? "text-amberCore" : "text-cyanCore";
                return (
                  <div key={idx} className="flex items-baseline gap-1.5">
                    <span className="text-xs text-inkMuted">{item.label}:</span>
                    <span className={`font-display text-lg font-bold ${toneClass}`}>{item.value}</span>
                    <span className="text-xs text-inkMuted">{item.unit}</span>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
        {panel.tabs && !hasMetricCards && !isHorizontalBar && !isSupplierTop ? (
          <div className="flex shrink-0 gap-2">
            {panel.tabs.map((tab) => (
              <Link
                className={`rounded-dashboard border px-3 py-0.5 text-xs font-semibold transition-colors ${
                  tab.active
                    ? "border-cyanLine bg-cyanCore/15 text-slate-100 dark:border-cyanLine dark:bg-cyanCore/15 dark:text-slate-100"
                    : "border-slate-600 bg-slateGlass text-inkMuted hover:text-slate-100 dark:border-slate-600 dark:bg-slateGlass dark:text-inkMuted"
                }`}
                href={tab.href}
                key={tab.id}
              >
                {tab.label}
              </Link>
            ))}
          </div>
        ) : extra ? (
          <div className="flex shrink-0">{extra}</div>
        ) : null}
      </div>
      {isSupplierTop ? (
        <SupplierTopList suppliers={panel.suppliers ?? []} />
      ) : isHorizontalBar ? (
        <div className="flex flex-1 flex-col justify-center">
          <HorizontalBarStat metrics={panel.metrics ?? []} />
        </div>
      ) : hasMetricCards ? (
        <PanelMetricGrid cards={panel.metricCards ?? []} />
      ) : (
        <div className="relative min-h-0 flex-1">
          <DashboardChart chart={panel.chart} type={panel.type} stacked={panel.stacked} />
        </div>
      )}
    </TechPanel>
  );
}

interface PanelMetricGridProps
  extends Readonly<{
    cards: PanelMetricCard[];
  }> {}

function PanelMetricGrid({ cards }: PanelMetricGridProps) {
  const isComparison = cards.length === 2;

  return (
    <div className={`grid flex-1 grid-cols-1 ${isComparison ? "items-stretch gap-4 sm:grid-cols-2" : "gap-3 sm:grid-cols-2 2xl:grid-cols-5"}`}>
      {cards.map((card) => {
        let toneClass = "text-cyanCore";
        let borderClass = "border-cyanLine bg-cyanCore/20";
        let barClass = "bg-cyanCore/80";

        if (card.tone === "amber") {
          toneClass = "text-amberCore";
          borderClass = "border-amberCore/45 bg-amberCore/20";
          barClass = "bg-amberCore/80";
        } else if (card.tone === "orange") {
          toneClass = "text-orangeCore";
          borderClass = "border-orangeCore/45 bg-orangeCore/20";
          barClass = "bg-orangeCore/80";
        } else if (card.tone === "red") {
          toneClass = "text-redCore";
          borderClass = "border-redCore/45 bg-redCore/20";
          barClass = "bg-redCore/80";
        }

        const comparisonClass = isComparison ? "min-h-[8.5rem] items-center text-center" : "min-h-[5.75rem]";

        return (
          <div className={`flex flex-col justify-between rounded-dashboard border px-4 py-3 ${borderClass} ${comparisonClass}`} key={card.id}>
            <div className="text-sm font-semibold leading-5 text-inkMuted">{card.label}</div>
            <div className={`whitespace-nowrap font-display ${isComparison ? "text-4xl" : "text-2xl"} font-bold ${toneClass}`}>
              {card.value} <span className="text-sm font-semibold text-inkMuted">{card.unit}</span>
            </div>
            {isComparison ? (
              <div className={`h-1 w-16 rounded-full ${barClass}`} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
