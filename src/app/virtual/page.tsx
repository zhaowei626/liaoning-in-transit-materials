"use client";

import MainHeader from "../../components/MainHeader";
import { FooterRail } from "../../components/FooterRail";
import { dashboardTitle } from "@/data/mockData";
import { useClock } from "@/hooks/useClock";
import { 
  virtualKpis, 
  cityDistributionPanel, 
  distribution9700_9800Panel,
  virtualDataChangePanel,
  virtualAmountChangeChart,
  virtualQuantityChangeChart,
  city9300DistributionPanel,
  borrowedOver180DaysPanel,
} from "@/data/virtualData";
import { VirtualKpiCard } from "../../components/VirtualKpiCard";
import { ChartPanel } from "../../components/ChartPanel";
import { useEffect, useState, useRef } from "react";
import { Calendar, ChevronDown, Filter, Check } from "lucide-react";

const VIRTUAL_WAREHOUSE_TYPES = [
  { id: 'all', label: '全部' },
  { id: '9100', label: '项目直发现场虚拟库 (9100)' },
  { id: '9300', label: '物资借用虚拟库 (9300)' },
  { id: '9400', label: '中转虚拟库 (9400)' },
  { id: '9500', label: '非项目直发虚拟库 (9500)' },
  { id: '9700', label: '废旧物资现场虚拟库 (9700)' },
  { id: '9800', label: '废旧物资拆解暂存库 (9800)' },
];

function ChartFilters({ 
  selectedType, 
  onTypeChange 
}: { 
  selectedType: string; 
  onTypeChange: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const currentType = VIRTUAL_WAREHOUSE_TYPES.find(t => t.id === selectedType) || VIRTUAL_WAREHOUSE_TYPES[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

      <div className="w-px h-6 bg-slate-700/50" />

      {/* 虚拟库类型 (交互下拉框) */}
      <div className="relative" ref={dropdownRef}>
        <div 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 leading-none">虚拟库类型</span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-xs text-slate-200">{currentType.label}</span>
              <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="absolute top-full right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 py-1 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {VIRTUAL_WAREHOUSE_TYPES.map((type) => (
              <div
                key={type.id}
                className={`flex items-center justify-between px-3 py-2 text-xs cursor-pointer transition-colors ${
                  selectedType === type.id 
                    ? 'bg-cyanCore/20 text-cyanCore' 
                    : 'text-slate-300 hover:bg-slate-700/50'
                }`}
                onClick={() => {
                  onTypeChange(type.id);
                  setIsOpen(false);
                }}
              >
                <span>{type.label}</span>
                {selectedType === type.id && <Check className="w-3 h-3" />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function VirtualWarehousePage() {
  const clock = useClock();
  const [selectedWarehouseType, setSelectedWarehouseType] = useState('all');

  // 根据选中的类型动态切换图表数据
  const isQuantityType = ['9700', '9800'].includes(selectedWarehouseType);
  const chartData = isQuantityType ? virtualQuantityChangeChart : virtualAmountChangeChart;
  
  const totalIn = chartData.datasets[0].data.reduce((acc, val) => acc + val, 0);
   const totalOut = chartData.datasets[1].data.reduce((acc, val) => acc + val, 0);
  
  const inLabel = isQuantityType ? "总入库条目" : "总入库金额";
  const outLabel = isQuantityType ? "总出库条目" : "总出库金额";
  const unit = chartData.unit || "";

  const dynamicChangePanel = {
    ...virtualDataChangePanel,
    chart: chartData,
    summary: [
      { label: inLabel, value: totalIn.toLocaleString(), unit: unit, tone: 'cyan' as const },
      { label: outLabel, value: totalOut.toLocaleString(), unit: unit, tone: 'amber' as const }
    ]
  };

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
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {virtualKpis
            .filter(kpi => !['alert'].includes(kpi.id))
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

          {/* Area 1: 9700/9800条目分布情况 */}
          <div className="flex flex-col overflow-hidden">
            <ChartPanel panel={distribution9700_9800Panel} />
          </div>
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

        {/* Fourth Row: Virtual Data Change (Double-sided Bar Chart) */}
        <section className="h-[320px]">
          <ChartPanel 
            panel={dynamicChangePanel} 
            extra={
              <ChartFilters 
                selectedType={selectedWarehouseType} 
                onTypeChange={setSelectedWarehouseType} 
              />
            }
          />
        </section>

      </main>

      <FooterRail />
    </div>
  );
}
