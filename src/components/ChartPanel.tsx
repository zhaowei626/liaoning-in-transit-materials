import Link from "next/link";
import { DashboardChart } from "@/components/DashboardChart";
import { SectionTitle } from "@/components/SectionTitle";
import { TechPanel } from "@/components/TechPanel";
import type { ChartPanelData, PanelMetricCard } from "@/types/dashboard";

export interface ChartPanelProps
  extends Readonly<{
    panel: ChartPanelData;
  }> {}

export function ChartPanel({ panel }: ChartPanelProps) {
  const hasMetricCards = Boolean(panel.metricCards?.length);

  return (
    <TechPanel className="flex min-h-[16rem] flex-col p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-6">
          <SectionTitle className="min-w-0" title={panel.title} />
          {panel.summary ? (
            <div className="flex gap-4">
              {panel.summary.map((item, idx) => (
                <div key={idx} className="flex items-baseline gap-1.5">
                  <span className="text-xs text-inkMuted">{item.label}:</span>
                  <span className="font-display text-lg font-bold text-cyanCore">{item.value}</span>
                  <span className="text-xs text-inkMuted">{item.unit}</span>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {panel.tabs && !hasMetricCards ? (
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
        ) : null}
      </div>
      {hasMetricCards ? (
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
        const toneClass = card.tone === "amber" ? "text-amberCore" : "text-cyanCore";
        const borderClass = card.tone === "amber" ? "border-amberCore/45 bg-amberCore/10" : "border-cyanLine bg-cyanCore/10";
        const comparisonClass = isComparison ? "min-h-[8.5rem] items-center text-center" : "min-h-[5.75rem]";

        return (
          <div className={`flex flex-col justify-between rounded-dashboard border px-4 py-3 ${borderClass} ${comparisonClass}`} key={card.id}>
            <div className="text-sm font-semibold leading-5 text-inkMuted">{card.label}</div>
            <div className={`whitespace-nowrap font-display ${isComparison ? "text-4xl" : "text-2xl"} font-bold ${toneClass}`}>
              {card.value} <span className="text-sm font-semibold text-inkMuted">{card.unit}</span>
            </div>
            {isComparison ? (
              <div className={`h-1 w-16 rounded-full ${card.tone === "amber" ? "bg-amberCore/80" : "bg-cyanCore/80"}`} />
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
