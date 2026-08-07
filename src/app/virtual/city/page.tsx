"use client";

import MainHeader from "../../../components/MainHeader";
import { FooterRail } from "../../../components/FooterRail";
import { dashboardTitle } from "@/data/mockData";
import { useClock } from "@/hooks/useClock";
import Link from "next/link";
import { 
  virtualKpis, 
  virtualDataChangePanel,
  virtualAmountChangeChart,
  virtualQuantityChangeChart,
  borrowedOver180DaysPanel,
} from "@/data/virtualData";
import { VirtualKpiCard } from "../../../components/VirtualKpiCard";
import { ChartPanel } from "../../../components/ChartPanel";
import { useEffect, useState, useRef } from "react";
import { Calendar, ChevronDown, Filter, Check } from "lucide-react";
import type { ChartDataSet, ChartPanelData } from "@/types/dashboard";

const VIRTUAL_WAREHOUSE_TYPES = [
  { id: 'all', label: '全部' },
  { id: '9100', label: '项目直发现场虚拟库 (9100)' },
  { id: '9300', label: '物资借用虚拟库 (9300)' },
  { id: '9400', label: '中转虚拟库 (9400)' },
  { id: '9500', label: '非项目直发虚拟库 (9500)' },
  { id: '9700', label: '废旧物资现场虚拟库 (9700)' },
  { id: '9800', label: '废旧物资拆解暂存库 (9800)' },
];

function ChartFilters() {
  return (
    <div className="flex items-center gap-4 bg-slate-800/40 px-4 py-2 rounded-lg border border-slate-700/50">
      <div className="flex items-center gap-2">
        <Filter className="w-3.5 h-3.5 text-cyanCore" />
        <span className="text-xs text-slate-400 font-medium">筛选条件:</span>
      </div>
      
      {/* 统计日期范围 */}
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

// 辅助函数：过滤 ChartDataSet 仅保留沈阳数据
const filterForShenyang = (chart: ChartDataSet): ChartDataSet => {
  const shenyangIndex = chart.labels.indexOf("沈阳");
  if (shenyangIndex === -1) return chart;

  return {
    ...chart,
    labels: ["沈阳"],
    datasets: chart.datasets.map(ds => ({
      ...ds,
      data: [ds.data[shenyangIndex]]
    }))
  };
};

// 辅助函数：过滤 ChartPanelData
const filterPanelForShenyang = (panel: ChartPanelData): ChartPanelData => {
  return {
    ...panel,
    chart: filterForShenyang(panel.chart)
  };
};

export default function VirtualWarehouseCityPage() {
  const clock = useClock();

  // 第一行 KPI 卡片数据模拟 (基于沈阳数据)
  // 沈阳数据来源 (转换为万元):
  // 9100: 470 万元
  // 9300: 300 万元
  // 9400: 320 万元
  // 9500: 210 万元
  // 9700: 1250 条
  // 9800: 850 条
  const shenyangKpis = virtualKpis.map(kpi => {
    let newValue = kpi.metrics[0].value;
    let newUnit = kpi.metrics[0].unit;

    if (kpi.id === 'overall') {
      newValue = 470 + 300 + 320 + 210; // 合计万元
      newUnit = "万元";
    }
    else if (kpi.id === 'v9100') {
      newValue = 470;
      newUnit = "万元";
    }
    else if (kpi.id === 'v9300') {
      newValue = 300;
      newUnit = "万元";
    }
    else if (kpi.id === 'v9400') {
      newValue = 320;
      newUnit = "万元";
    }
    else if (kpi.id === 'v9500') {
      newValue = 210;
      newUnit = "万元";
    }
    else if (kpi.id === 'v9700') newValue = 1250;
    else if (kpi.id === 'v9800') newValue = 850;

    return {
      ...kpi,
      metrics: kpi.metrics.map(m => ({
        ...m,
        value: newValue,
        unit: newUnit,
        trend: m.trend ? m.trend * 0.1 : undefined // 模拟趋势也缩小
      }))
    };
  });

  // 过滤图表数据
  const filteredBorrowedOver180DaysPanel: ChartPanelData = {
    ...borrowedOver180DaysPanel,
    tabs: undefined, // 移除标签
    metricCards: [
      { id: "age-1-90", label: "库龄1天-90天", value: "5", unit: "条", tone: "cyan" },
      { id: "age-91-180", label: "库龄91天-180天", value: "4", unit: "条", tone: "amber" },
      { id: "age-181-360", label: "库龄181天-360天", value: "3", unit: "条", tone: "orange" },
      { id: "age-361-plus", label: "库龄361天以上", value: "1", unit: "条", tone: "red" },
    ]
  };

  // 第二行图表逻辑 (4:3 比例)
  // X轴: 9100, 9300, 9400, 9500, 9700, 9800
  // 金额指标 (左Y轴): 9100-9500
  // 条目指标 (右Y轴): 9700-9800
  const mixedChartData: ChartDataSet = {
    labels: ['9100', '9300', '9400', '9500', '9700', '9800'],
    unit: "万元",
    secondaryUnit: "条",
    datasets: [
      { 
        label: "入库金额", 
        data: [470, 300, 320, 210, 0, 0], 
        tone: "cyan", 
        type: "bar" 
      },
      { 
        label: "出库金额", 
        data: [250, 180, 200, 120, 0, 0], 
        tone: "amber", 
        type: "bar" 
      },
      { 
        label: "入库条目", 
        data: [0, 0, 0, 0, 156, 42], 
        tone: "emerald", 
        type: "bar",
        yAxisID: "y1"
      },
      { 
        label: "出库条目", 
        data: [0, 0, 0, 0, 85, 28], 
        tone: "indigo", 
        type: "bar",
        yAxisID: "y1"
      }
    ]
  };
  
  const totalInAmount = 470 + 300 + 320 + 210;
  const totalOutAmount = 250 + 180 + 200 + 120;

  const dynamicChangePanel = {
    ...virtualDataChangePanel,
    chart: mixedChartData,
    summary: [
      { label: "总入库金额", value: totalInAmount.toFixed(2), unit: "万元", tone: 'cyan' as const },
      { label: "总出库金额", value: totalOutAmount.toFixed(2), unit: "万元", tone: 'amber' as const }
    ]
  };

  return (
    <div className="dashboard-shell min-h-screen w-full overflow-x-hidden p-dashboard text-slate-100 dark:text-slate-100 flex flex-col">
      <MainHeader clock={clock} title={dashboardTitle} />
      
      <main className="flex-1 flex flex-col gap-4 mt-8">
        {/* Header meta info */}
        <div className="flex justify-end px-1 mb-2">
          <Link 
            href="/virtual"
            className="text-sm font-medium text-cyanCore/80 bg-cyanCore/10 px-3 py-1 rounded-full border border-cyanCore/20 hover:bg-cyanCore/20 transition-colors cursor-pointer"
          >
            更新日期：2026-08-02
          </Link>
        </div>

        {/* First Row: KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {shenyangKpis
            .filter(kpi => !['alert'].includes(kpi.id))
            .map((kpi) => (
              <VirtualKpiCard key={kpi.id} card={kpi} />
            ))
          }
        </section>

        {/* Second Row: Detailed Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-7 gap-4 h-[300px]">
          {/* Area 4: Virtual Data Change (4/7 Row) */}
          <div className="flex flex-col overflow-hidden lg:col-span-4">
            <ChartPanel 
              panel={dynamicChangePanel} 
              extra={<ChartFilters />}
            />
          </div>

          {/* Area 6: 9300 Borrowed Over 180 Days (3/7 Row) */}
          <div className="flex flex-col overflow-hidden lg:col-span-3">
            <ChartPanel panel={filteredBorrowedOver180DaysPanel} />
          </div>
        </section>
      </main>


      <FooterRail />
    </div>
  );
}
