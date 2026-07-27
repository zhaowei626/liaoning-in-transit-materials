import { MetricIcon } from "@/components/MetricIcon";
import { SectionTitle } from "@/components/SectionTitle";
import { TechPanel } from "@/components/TechPanel";
import { DonutStat } from "@/components/DonutStat";
import { HorizontalBarStat } from "@/components/HorizontalBarStat";
import type { MetricItem, StatCardData } from "@/types/dashboard";

export interface StatCardProps
  extends Readonly<{
    card: StatCardData;
  }> {}

export function StatCard({ card }: StatCardProps) {
  return (
    <TechPanel className="flex min-h-[12rem] flex-col justify-between p-4">
      <SectionTitle title={card.title} />
      {card.layout === "donut" ? (
        <DonutStat metrics={card.metrics} cardId={card.id} />
      ) : card.layout === "horizontal-bar" ? (
        <HorizontalBarStat metrics={card.metrics} cardId={card.id} />
      ) : card.layout === "paired" ? (
        <PairedMetrics metrics={card.metrics} />
      ) : (
        <ListMetrics metrics={card.metrics} />
      )}
    </TechPanel>
  );
}

interface PairedMetricsProps
  extends Readonly<{
    metrics: MetricItem[];
  }> {}

function PairedMetrics({ metrics }: PairedMetricsProps) {
  const pairs = [metrics.slice(0, 2), metrics.slice(2, 4)];

  return (
    <div className="mt-4 flex flex-1 flex-col justify-center gap-5">
      {pairs.map((pair) => (
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4" key={pair.map((item) => item.id).join("-")}>
          <MetricSummary metric={pair[0]} />
          <MetricValue metric={pair[1]} />
        </div>
      ))}
    </div>
  );
}

interface ListMetricsProps
  extends Readonly<{
    metrics: MetricItem[];
  }> {}

function ListMetrics({ metrics }: ListMetricsProps) {
  return (
    <div className="mt-5 flex flex-1 flex-col justify-center gap-5 px-3">
      {metrics.map((metric) => (
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4" key={metric.id}>
          <div className="flex min-w-0 items-center gap-3">
            <MetricIcon icon={metric.icon} tone={metric.tone} />
            <span className="truncate text-xs font-semibold text-inkMuted dark:text-inkMuted">{metric.label}</span>
          </div>
          <MetricValue metric={metric} />
        </div>
      ))}
    </div>
  );
}

interface MetricSummaryProps
  extends Readonly<{
    metric: MetricItem;
  }> {}

function MetricSummary({ metric }: MetricSummaryProps) {
  return (
    <div className="flex min-w-0 items-center gap-4">
      <MetricIcon icon={metric.icon} tone={metric.tone} />
      <div className="min-w-0">
        <div className="truncate text-xs font-semibold text-inkMuted dark:text-inkMuted">{metric.label}</div>
        <MetricValue metric={metric} />
      </div>
    </div>
  );
}

interface MetricValueProps
  extends Readonly<{
    metric: MetricItem;
  }> {}

function MetricValue({ metric }: MetricValueProps) {
  const toneClass =
    metric.tone === "amber"
      ? "text-amberCore dark:text-amberCore"
      : "text-cyanCore dark:text-cyanCore";

  return (
    <div className={`whitespace-nowrap font-display text-metric font-bold ${toneClass}`}>
      {metric.value} <span className="text-sm">{metric.unit}</span>
    </div>
  );
}
