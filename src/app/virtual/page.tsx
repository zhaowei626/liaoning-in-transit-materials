"use client";

import { MainHeader } from "@/components/MainHeader";
import { FooterRail } from "@/components/FooterRail";
import { dashboardTitle } from "@/data/mockData";
import { useClock } from "@/hooks/useClock";
import { 
  virtualKpis, 
  reasonDistribution, 
  cityDistributionPanel, 
  dataChangeRecords,
  city9300DistributionPanel,
  borrowedOver90DaysPanel,
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
import { VirtualReasonDonut } from "@/components/VirtualReasonDonut";
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
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {virtualKpis.map((kpi) => (
            <VirtualKpiCard key={kpi.id} card={kpi} />
          ))}
        </section>

        {/* Second Row: Detailed Charts and Data */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-[350px]">
          {/* Area 2: City Distribution Bar + Line Chart (2/5 cols) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col overflow-hidden">
            <ChartPanel panel={cityDistributionPanel} />
          </div>

          {/* Area 1: Reason Distribution Donut (2/5 cols) */}
          <TechPanel className="col-span-1 lg:col-span-2 p-4 flex flex-col overflow-hidden">
            <SectionTitle title="9100库存按积压原因分布情况" />
            <div className="flex-1 mt-2 overflow-hidden">
              <VirtualReasonDonut data={reasonDistribution} />
            </div>
          </TechPanel>

          {/* Area 3: Data Changes List (1/5 col) */}
          <TechPanel className="col-span-1 p-4 flex flex-col overflow-hidden">
            <SectionTitle title="9100数据增减情况" />
            <div className="flex-1 mt-4 overflow-hidden">
              <VirtualDataChanges records={dataChangeRecords} />
            </div>
          </TechPanel>
        </section>

        {/* Third Row: 9300 Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-5 gap-4 h-[350px]">
          {/* Area 4: 9300 City Distribution (2/5 cols) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col overflow-hidden">
            <ChartPanel panel={city9300DistributionPanel} />
          </div>

          {/* Area 5: 9300 Borrowed Over 90 Days (2/5 cols) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col overflow-hidden">
            <ChartPanel panel={borrowedOver90DaysPanel} />
          </div>

          {/* Area 6: 9300 Data Changes (1/5 col) */}
          <TechPanel className="col-span-1 p-4 flex flex-col overflow-hidden">
            <SectionTitle title="9300数据增减情况" />
            <div className="flex-1 mt-4 overflow-hidden">
              <Virtual9300DataChanges records={dataChange9300Records} />
            </div>
          </TechPanel>
        </section>

        {/* Fourth Row: 9400 and 9500 Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-6 gap-4 h-[350px]">
          {/* Area 7: 9400 City Distribution (2/6 cols) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col overflow-hidden">
            <ChartPanel panel={city9400DistributionPanel} />
          </div>

          {/* Area 8: 9400 Data Changes (1/6 col) */}
          <TechPanel className="col-span-1 p-4 flex flex-col overflow-hidden">
            <SectionTitle title="9400数据增减情况" />
            <div className="flex-1 mt-4 overflow-hidden">
              <Virtual9300DataChanges records={dataChange9400Records} />
            </div>
          </TechPanel>

          {/* Area 9: 9500 City Distribution (2/6 cols) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col overflow-hidden">
            <ChartPanel panel={city9500DistributionPanel} />
          </div>

          {/* Area 10: 9500 Data Changes (1/6 col) */}
          <TechPanel className="col-span-1 p-4 flex flex-col overflow-hidden">
            <SectionTitle title="9500数据增减情况" />
            <div className="flex-1 mt-4 overflow-hidden">
              <Virtual9300DataChanges records={dataChange9500Records} />
            </div>
          </TechPanel>
        </section>

        {/* Fifth Row: 9700 and 9800 Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-6 gap-4 h-[350px]">
          {/* Area 11: 9700 City Distribution (2/6 cols) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col overflow-hidden">
            <ChartPanel panel={city9700DistributionPanel} />
          </div>

          {/* Area 12: 9700 Data Changes (1/6 col) */}
          <TechPanel className="col-span-1 p-4 flex flex-col overflow-hidden">
            <SectionTitle title="9700数据增减情况" />
            <div className="flex-1 mt-4 overflow-hidden">
              <Virtual9300DataChanges records={dataChange9700Records} />
            </div>
          </TechPanel>

          {/* Area 13: 9800 City Distribution (2/6 cols) */}
          <div className="col-span-1 lg:col-span-2 flex flex-col overflow-hidden">
            <ChartPanel panel={city9800DistributionPanel} />
          </div>

          {/* Area 14: 9800 Data Changes (1/6 col) */}
          <TechPanel className="col-span-1 p-4 flex flex-col overflow-hidden">
            <SectionTitle title="9800数据增减情况" />
            <div className="flex-1 mt-4 overflow-hidden">
              <Virtual9300DataChanges records={dataChange9800Records} />
            </div>
          </TechPanel>
        </section>
      </main>

      <FooterRail />
    </div>
  );
}
