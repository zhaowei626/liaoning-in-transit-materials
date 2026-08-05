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
  agingRecords,
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
import { useEffect, useState, useRef } from "react";

function AgingScrollingList({ records }: { records: any[] }) {
  const [scrollOffset, setScrollOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setScrollOffset((prev) => {
        const next = prev + 1;
        if (containerRef.current && next >= containerRef.current.scrollHeight / 2) {
          return 0;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 overflow-hidden relative mt-2 px-2">
      <div 
        ref={containerRef}
        className="flex flex-col gap-2"
        style={{ transform: `translateY(-${scrollOffset}px)` }}
      >
        {[...records, ...records].map((record, idx) => (
          <div 
            key={`${record.id}-${idx}`} 
            className="flex items-center justify-center gap-3 bg-cyanCore/5 border border-cyanLine/20 rounded px-4 py-2 text-sm text-slate-200"
          >
            <span className="text-cyanCore font-bold w-40 text-center">{record.warehouse}</span>
            <span className="text-slate-400">|</span>
            <span className="w-16 text-center">{record.city}</span>
            <span className="text-slate-400">|</span>
            <div className="flex-1 text-center">
              有<span className="text-amberCore font-bold mx-1">{record.count}</span>条物资记录的库龄已超14天
            </div>
          </div>
        ))}
      </div>
      {/* 渐变遮罩 */}
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-panelStrong to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-panelStrong to-transparent pointer-events-none z-10" />
    </div>
  );
}

export default function VirtualWarehousePage() {
  const clock = useClock();

  return (
    <div className="dashboard-shell min-h-screen w-full overflow-x-hidden p-dashboard text-slate-100 dark:text-slate-100 flex flex-col">
      <MainHeader clock={clock} title={dashboardTitle} />
      
      <main className="flex-1 flex flex-col gap-4 mt-8">
        {/* Header meta info */}
        <div className="flex justify-end px-1 mb-2">
          <span className="text-sm font-medium text-cyanCore/80 bg-cyanCore/10 px-3 py-1 rounded-full border border-cyanCore/20">
            更新日期：2026-08-02
          </span>
        </div>

        {/* First Row: KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {virtualKpis
            .filter(kpi => !['v9700', 'v9800', 'alert'].includes(kpi.id))
            .map((kpi) => (
              <VirtualKpiCard key={kpi.id} card={kpi} />
            ))
          }
        </section>

        {/* Second Row: Detailed Charts and Data */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[260px]">
          {/* Area 2: City Distribution Bar + Line Chart */}
          <div className="flex flex-col overflow-hidden">
            <ChartPanel panel={cityDistributionPanel} />
          </div>

          {/* Area 1: 9100/9500物资库龄超14天情况 (Scrolling List) */}
          <TechPanel className="col-span-1 lg:col-span-1 flex flex-col overflow-hidden p-4">
            <SectionTitle title="9100/9500物资库龄超14天情况" />
            <AgingScrollingList records={agingRecords} />
          </TechPanel>
        </section>

        {/* Third Row: 9300 Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[260px]">
          {/* Area 5: 9300 City Distribution */}
          <div className="flex flex-col overflow-hidden">
            <ChartPanel panel={city9300DistributionPanel} />
          </div>

          {/* Area 6: 9300 Borrowed Over 180 Days */}
          <div className="flex flex-col overflow-hidden">
            <ChartPanel panel={borrowedOver180DaysPanel} />
          </div>
        </section>

      </main>

      <FooterRail />
    </div>
  );
}
