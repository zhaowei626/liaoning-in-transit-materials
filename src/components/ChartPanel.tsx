import Link from "next/link";
import { DashboardChart } from "@/components/DashboardChart";
import { SectionTitle } from "@/components/SectionTitle";
import { TechPanel } from "@/components/TechPanel";
import type { ChartPanelData } from "@/types/dashboard";

export interface ChartPanelProps
  extends Readonly<{
    panel: ChartPanelData;
  }> {}

export function ChartPanel({ panel }: ChartPanelProps) {
  return (
    <TechPanel className="flex min-h-[16rem] flex-col p-4">
      <div className="mb-4 flex items-center justify-between gap-4">
        <SectionTitle className="min-w-0 flex-1" title={panel.title} />
        {panel.tabs ? (
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
      <div className="relative min-h-0 flex-1">
        <DashboardChart chart={panel.chart} type={panel.type} stacked={panel.stacked} />
      </div>
    </TechPanel>
  );
}
