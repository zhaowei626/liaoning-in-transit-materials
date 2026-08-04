"use client";

import { MainHeader } from "@/components/MainHeader";
import { FooterRail } from "@/components/FooterRail";
import { dashboardTitle } from "@/data/mockData";
import { useClock } from "@/hooks/useClock";
import { 
  virtualKpis, 
  cityDistributionPanel, 
  over14DaysDistributionPanel,
  dataChangeRecords,
  over14Days9500DistributionPanel,
  city9500V2DistributionPanel,
  dataChange9500V2Records,
  city9300DistributionPanel,
  borrowedOver180DaysPanel,
  dataChange9300Records,
  city9400DistributionPanel,
  dataChange9400Records,
  city9500DistributionPanel,
  dataChange9500Records,
  city9700DistributionPanel,
  dataChange9700Records,
  city9800DistributionPanel,
  dataChange9800Records
} from "@/data/virtualData";
import { VirtualKpiCard } from "@/components/VirtualKpiCard";
import { VirtualDataChanges } from "@/components/VirtualDataChanges";
import { Virtual9300DataChanges } from "@/components/Virtual9300DataChanges";
import { ChartPanel } from "@/components/ChartPanel";
import { TechPanel } from "@/components/TechPanel";
import { SectionTitle } from "@/components/SectionTitle";

export default function VirtualWarehousePage() {
  const clock = useClock();

  return (
    <div className="dashboard-shell min-h-screen w-full overflow-x-hidden p-dashboard text-slate-100 dark:text-slate-100 flex flex-col">
      <MainHeader clock={clock} title={dashboardTitle} />
      
      <main className="flex-1 flex flex-col gap-4">
        {/* Header meta info */}
        <div className="flex justify-end px-1">
          <span className="text-sm font-medium text-cyanCore/80 bg-cyanCore/10 px-3 py-1 rounded-full border border-cyanCore/20">
            更新日期：2026-08-02
          </span>
        </div>

        {/* First Row: KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
          {virtualKpis.map((kpi) => (
            <VirtualKpiCard key={kpi.id} card={kpi} />
          ))}
        </section>

        {/* Second Row: Detailed Charts and Data */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-[260px]">
          {/* Area 2: City Distribution Bar + Line Chart (2/5 cols) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col overflow-hidden">
            <ChartPanel panel={cityDistributionPanel} />
          </div>

          {/* Area 1: Over 14 Days Distribution Line Chart (2/5 cols) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col overflow-hidden">
            <ChartPanel panel={over14DaysDistributionPanel} />
          </div>

          {/* Area 3: Data Changes List (1/5 col) */}
          <TechPanel className="col-span-1 p-4 flex flex-col overflow-hidden">
            <SectionTitle title="9100数据增减情况" />
            <div className="flex-1 mt-4 overflow-hidden">
              <VirtualDataChanges records={dataChangeRecords} />
            </div>
          </TechPanel>
        </section>

        {/* Third Row: 9300 Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-[260px]">
          {/* Area 5: 9300 City Distribution (2/6 cols) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col overflow-hidden">
            <ChartPanel panel={city9300DistributionPanel} />
          </div>

          {/* Area 6: 9300 Borrowed Over 180 Days (2/6 cols) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col overflow-hidden">
            <ChartPanel panel={borrowedOver180DaysPanel} />
          </div>

          {/* Area 6: 9300 Data Changes (1/5 col) */}
          <TechPanel className="col-span-1 p-4 flex flex-col overflow-hidden">
            <SectionTitle title="9300数据增减情况" />
            <div className="flex-1 mt-4 overflow-hidden">
              <Virtual9300DataChanges records={dataChange9300Records} />
            </div>
          </TechPanel>
        </section>

        {/* Fourth Row: 9500 Detailed Charts and Data (Cloned from 9100) */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-[260px]">
          {/* Area 2: City Distribution Bar + Line Chart (2/5 cols) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col overflow-hidden">
            <ChartPanel panel={city9500V2DistributionPanel} />
          </div>

          {/* Area 1: Over 14 Days Distribution Line Chart (2/5 cols) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col overflow-hidden">
            <ChartPanel panel={over14Days9500DistributionPanel} />
          </div>

          {/* Area 3: Data Changes List (1/5 col) */}
          <TechPanel className="col-span-1 p-4 flex flex-col overflow-hidden">
            <SectionTitle title="9500数据增减情况" />
            <div className="flex-1 mt-4 overflow-hidden">
              <VirtualDataChanges records={dataChange9500V2Records} />
            </div>
          </TechPanel>
        </section>

        {/* Fifth Row: 9400, 9700 and 9800 Charts (Shifted) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[260px]">
          {/* Area 7: 9400 City Distribution */}
          <div className="flex flex-col overflow-hidden">
            <ChartPanel panel={city9400DistributionPanel} />
          </div>

          {/* Area 11: 9700 City Distribution */}
          <div className="flex flex-col overflow-hidden">
            <ChartPanel panel={city9700DistributionPanel} />
          </div>

          {/* Area 13: 9800 City Distribution */}
          <div className="flex flex-col overflow-hidden">
            <ChartPanel panel={city9800DistributionPanel} />
          </div>
        </section>
      </main>

      <FooterRail />
    </div>
  );
}
