"use client";

import MainHeader from "../../../components/MainHeader";
import { FooterRail } from "../../../components/FooterRail";
import { dashboardTitle } from "@/data/mockData";
import { useClock } from "@/hooks/useClock";
import Link from "next/link";
import { 
  virtualKpis, 
  virtualDataChangePanel,
  borrowedOver180DaysPanel,
} from "@/data/virtualData";
import { VirtualKpiCard } from "../../../components/VirtualKpiCard";
import { ChartPanel } from "../../../components/ChartPanel";
import { Calendar, ChevronDown, Filter } from "lucide-react";
import type { ChartDataSet, ChartPanelData } from "@/types/dashboard";

function ChartFilters() {
  return (
    <div className="flex items-center gap-4 bg-slate-800/40 px-4 py-2 rounded-lg border border-slate-700/50">
      <div className="flex items-center gap-2">
        <Filter className="w-3.5 h-3.5 text-cyanCore" />
        <span className="text-xs text-slate-400 font-medium">筛选条件:</span>
      </div>
      <div className="flex items-center gap-2 group cursor-pointer">
        <Calendar className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyanCore transition-colors" />
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 leading-none">统计日期范围</span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-xs text-slate-200">2026-07-01 ~ 2026-08-01</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VirtualWarehouseCityPage() {
  const clock = useClock();

  // 沈阳地市 KPI 数据模拟
  const shenyangKpis = virtualKpis.map(kpi => {
    let newValue = kpi.metrics[0].value;
    let newUnit = kpi.metrics[0].unit;

    if (kpi.id === 'overall') { newValue = 1300; newUnit = "万元"; }
    else if (kpi.id === 'v9100') { newValue = 470; newUnit = "万元"; }
    else if (kpi.id === 'v9300') { newValue = 300; newUnit = "万元"; }
    else if (kpi.id === 'v9400') { newValue = 320; newUnit = "万元"; }
    else if (kpi.id === 'v9500') { newValue = 210; newUnit = "万元"; }
    else if (kpi.id === 'v9700') newValue = 1250;
    else if (kpi.id === 'v9800') newValue = 850;

    return {
      ...kpi,
      metrics: kpi.metrics.map(m => ({
        ...m,
        value: newValue,
        unit: newUnit,
        trend: m.trend ? m.trend * 0.1 : undefined
      }))
    };
  });

  // 第三行：库龄分布卡片
  const filteredBorrowedOver180DaysPanel: ChartPanelData = {
    ...borrowedOver180DaysPanel,
    className: "h-full",
    tabs: undefined,
    metricCards: [
      { id: "age-total", label: "借用总数", value: "13", unit: "条", tone: "cyan" },
      { id: "age-1-90", label: "库龄1-90天", value: "5", unit: "条", tone: "cyan" },
      { id: "age-91-180", label: "库龄91-180天", value: "4", unit: "条", tone: "amber" },
      { id: "age-181-360", label: "库龄181-360天", value: "3", unit: "条", tone: "orange" },
      { id: "age-361-plus", label: "库龄361天以上", value: "1", unit: "条", tone: "red" },
    ]
  };

  // 第二行：混合图表数据
  const mixedChartData: ChartDataSet = {
    labels: ['9100', '9300', '9400', '9500', '9700', '9800'],
    unit: "万元",
    secondaryUnit: "条",
    datasets: [
      { label: "入库金额", data: [470, 300, 320, 210, 0, 0], tone: "cyan", type: "bar" },
      { label: "出库金额", data: [250, 180, 200, 120, 0, 0], tone: "amber", type: "bar" },
      { label: "入库条目", data: [0, 0, 0, 0, 156, 42], tone: "emerald", type: "bar", yAxisID: "y1" },
      { label: "出库条目", data: [0, 0, 0, 0, 85, 28], tone: "indigo", type: "bar", yAxisID: "y1" }
    ]
  };
  
  const dynamicChangePanel = {
    ...virtualDataChangePanel,
    className: "h-full",
    chart: mixedChartData,
    summary: [
      { label: "总入库金额", value: "1300.00", unit: "万元", tone: 'cyan' as const },
      { label: "总出库金额", value: "750.00", unit: "万元", tone: 'amber' as const }
    ]
  };

  return (
    <div className="dashboard-shell min-h-screen w-full overflow-x-hidden p-dashboard text-slate-100 flex flex-col">
      <MainHeader clock={clock} title={dashboardTitle} />
      
      <main className="flex-1 flex flex-col gap-4 mt-8">
        <div className="flex justify-end px-1 mb-2">
          <Link href="/virtual" className="text-sm font-medium text-cyanCore/80 bg-cyanCore/10 px-3 py-1 rounded-full border border-cyanCore/20 hover:bg-cyanCore/20 transition-colors">
            数据更新日期：2026-08-02
          </Link>
        </div>

        {/* 第一行：KPI */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {shenyangKpis
            .filter(kpi => !['alert'].includes(kpi.id))
            .map((kpi) => (
              <VirtualKpiCard key={kpi.id} card={kpi} />
            ))
          }
        </section>

        {/* 第二行：核心图表 */}
        <section className="h-[400px]">
          <ChartPanel 
            panel={dynamicChangePanel} 
            extra={<ChartFilters />}
          />
        </section>

        {/* 第三行：明细卡片 */}
        <section className="h-[180px]">
          <ChartPanel panel={filteredBorrowedOver180DaysPanel} />
        </section>
      </main>

      <FooterRail />
    </div>
  );
}
