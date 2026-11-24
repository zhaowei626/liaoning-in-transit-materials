"use client";

import { useClock } from "@/hooks/useClock";
import MainHeader from "@/components/MainHeader";
import { FooterRail } from "@/components/FooterRail";
import { TechPanel } from "@/components/TechPanel";
import { SectionTitle } from "@/components/SectionTitle";
import { DashboardChart } from "@/components/DashboardChart";
import { EChartsHeatmap } from "@/components/EChartsHeatmap";
import { EChartsDonut } from "@/components/EChartsDonut";
import { dashboardTitle } from "@/data/mockData";
import { MousePointer2 } from "lucide-react";
import { useState, useEffect } from "react";
import { SpecialMaterialDetailsModal } from "@/components/SpecialMaterialDetailsModal";

// 顶部 5 个卡片的数据类型
interface TopCard {
  title: string;
  value: string;
  unit: string;
  tone: "cyan" | "amber";
}

const topCards: TopCard[] = [
  { title: "在仓物资总金额", value: "89.5", unit: "亿", tone: "amber" },
  { title: "在仓物资总条目", value: "24,531", unit: "条", tone: "cyan" },
  { title: "专业仓数量", value: "156", unit: "个", tone: "cyan" },
  { title: "本年物资入仓总金额", value: "152.3", unit: "亿", tone: "amber" },
  { title: "本年物资出仓总金额", value: "148.6", unit: "亿", tone: "amber" }
];

const distributionChartData = [
  { name: "营销仓", value: 45, percentage: "28.8%" },
  { name: "生产仓", value: 60, percentage: "38.5%" },
  { name: "后勤仓", value: 15, percentage: "9.6%" },
  { name: "安监仓", value: 12, percentage: "7.7%" },
  { name: "调控仓", value: 10, percentage: "6.4%" },
  { name: "共享仓", value: 14, percentage: "9.0%" }
];

const ageDistributionChartData = {
  labels: ["3个月", "3-6个月", "6-9个月", "9-12个月", "1年以上"],
  unit: "万元",
  secondaryUnit: "个",
  datasets: [
    {
      label: "在仓物资金额",
      data: [1200, 850, 600, 450, 300],
      tone: "amber" as const,
      type: "bar" as const
    },
    {
      label: "专业仓数量",
      data: [85, 45, 30, 20, 15],
      tone: "cyan" as const,
      type: "line" as const,
      yAxisID: "y1"
    }
  ]
};

const mapData = [
  { name: "沈阳市", value: 35 },
  { name: "大连市", value: 28 },
  { name: "鞍山市", value: 15 },
  { name: "抚顺市", value: 12 },
  { name: "本溪市", value: 8 },
  { name: "丹东市", value: 10 },
  { name: "锦州市", value: 11 },
  { name: "营口市", value: 9 },
  { name: "阜新市", value: 6 },
  { name: "辽阳市", value: 8 },
  { name: "盘锦市", value: 7 },
  { name: "铁岭市", value: 5 },
  { name: "朝阳市", value: 6 },
  { name: "葫芦岛市", value: 8 }
];

const topCategories = [
  { rank: 1, name: "交流变压器", amount: "520.00", percentage: "15%", type: "生产仓" },
  { rank: 2, name: "电能表", amount: "480.00", percentage: "14%", type: "营销仓" },
  { rank: 3, name: "导、地线", amount: "350.00", percentage: "10%", type: "生产仓" },
  { rank: 4, name: "安全工器具", amount: "210.00", percentage: "6%", type: "安监仓" },
  { rank: 5, name: "办公设备", amount: "150.00", percentage: "4%", type: "后勤仓" }
];

const warehouseStorageChartData = {
  labels: ["生产仓", "营销仓", "安监仓", "后勤仓", "调控仓", "共享仓"],
  unit: "万元",
  secondaryUnit: "个",
  datasets: [
    {
      label: "仓存金额",
      data: [4500, 3200, 800, 500, 450, 600],
      tone: "amber" as const,
      type: "bar" as const
    },
    {
      label: "专业仓数量",
      data: [60, 45, 12, 15, 10, 14],
      tone: "cyan" as const,
      type: "line" as const,
      yAxisID: "y1"
    }
  ]
};

export function SpecialDashboardPage() {
  const clock = useClock();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="dashboard-shell min-h-screen w-full overflow-x-hidden p-dashboard text-slate-100 dark:text-slate-100 flex flex-col">
      <MainHeader clock={clock} title={dashboardTitle} />

      <main className="flex-1 flex flex-col gap-4 mt-8">
        {/* Header meta info */}
        <div className="flex justify-end items-center px-1 mb-2">
          {/* 数据更新日期 */}
          <div className="text-sm font-medium text-cyanCore/80 bg-cyanCore/10 px-3 py-1 rounded-full border border-cyanCore/20 cursor-default">
            数据更新日期：{currentDate}
          </div>
        </div>

        {/* First Row: KPI Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {topCards.map((card, idx) => {
            const toneClass = card.tone === "amber" ? "text-amberCore" : "text-cyanCore";
            const isFirst = idx === 0;
            return (
              <TechPanel 
                key={idx} 
                className={`flex flex-col p-4 min-h-[140px] cursor-pointer hover:bg-slate-800/20 transition-colors group ${
                  isFirst ? "border-cyanCore/40 bg-cyanCore/5" : ""
                }`}
                onClick={isFirst ? () => setIsModalOpen(true) : undefined}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className={`font-bold truncate flex-1 ${
                    isFirst ? "text-slate-300 text-base" : "text-slate-300 text-sm"
                  }`} title={card.title}>
                    {card.title}
                  </h3>
                  <MousePointer2 className="h-3.5 w-3.5 mt-0.5 transition-colors text-inkMuted/50 group-hover:text-cyanCore" />
                </div>
                <div className="flex-1 flex flex-col justify-center gap-3">
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-col items-start gap-1">
                      <div className="mt-1">
                        <span className={`font-display font-bold ${isFirst ? "text-3xl" : "text-2xl"} ${toneClass}`}>
                          {card.value}
                        </span>
                        <span className={`text-slate-500 ml-1 ${isFirst ? "text-sm" : "text-xs"}`}>{card.unit}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TechPanel>
            );
          })}
        </section>

        {/* Second Row: Detailed Charts and Data */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 flex-1">
          
          {/* 左侧 2 个区域 */}
          <div className="flex flex-col gap-4">
            <TechPanel className="flex-1 p-4 flex flex-col min-h-[16rem]">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex flex-1 items-center gap-6">
                  <SectionTitle className="min-w-0" title="专业仓分布情况" />
                </div>
              </div>
              <div className="relative min-h-0 flex-1">
                <EChartsDonut data={distributionChartData} title="总数" total={156} />
              </div>
            </TechPanel>
            <TechPanel className="flex-1 p-4 flex flex-col min-h-[16rem]">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex flex-1 items-center gap-6">
                  <SectionTitle className="min-w-0" title="在仓物资仓龄分布情况" />
                </div>
              </div>
              <div className="relative min-h-0 flex-1">
                <DashboardChart type="bar" chart={ageDistributionChartData} />
              </div>
            </TechPanel>
          </div>

          {/* 中间地图 */}
          <div className="lg:col-span-2">
            <TechPanel className="h-full p-4 flex flex-col min-h-[600px]">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex flex-1 items-center gap-6">
                  <SectionTitle className="min-w-0" title="辽宁省热力地图" />
                </div>
              </div>
              <div className="relative min-h-0 flex-1">
                <EChartsHeatmap data={mapData} />
              </div>
            </TechPanel>
          </div>

          {/* 右侧 2 个区域 */}
          <div className="flex flex-col gap-4">
            <TechPanel className="flex-1 p-4 flex flex-col min-h-[16rem]">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex flex-1 items-center gap-6">
                  <SectionTitle className="min-w-0" title="在仓品类分布Top5" />
                </div>
              </div>
              <div className="relative min-h-0 flex-1 overflow-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="text-inkMuted border-b border-slate-700/50">
                      <th className="pb-2 font-normal">排名</th>
                      <th className="pb-2 font-normal">物料小类</th>
                      <th className="pb-2 font-normal text-right">金额(万)</th>
                      <th className="pb-2 font-normal text-right">占比</th>
                      <th className="pb-2 font-normal text-right">仓类型</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topCategories.map((item) => (
                      <tr key={item.rank} className="border-b border-slate-700/20 hover:bg-slate-800/20">
                        <td className="py-3">
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
                            item.rank <= 3 ? "bg-amberCore/20 text-amberCore" : "bg-slate-700 text-slate-300"
                          }`}>
                            {item.rank}
                          </span>
                        </td>
                        <td className="py-3 text-slate-200">{item.name}</td>
                        <td className="py-3 text-right font-display text-amberCore">{item.amount}</td>
                        <td className="py-3 text-right text-cyanCore">{item.percentage}</td>
                        <td className="py-3 text-right text-slate-300">{item.type}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TechPanel>
            <TechPanel className="flex-1 p-4 flex flex-col min-h-[16rem]">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div className="flex flex-1 items-center gap-6">
                  <SectionTitle className="min-w-0" title="专业仓仓存情况" />
                </div>
              </div>
              <div className="relative min-h-0 flex-1">
                <DashboardChart type="bar" chart={warehouseStorageChartData} />
              </div>
            </TechPanel>
          </div>

        </section>
      </main>

      <FooterRail />

      {/* 在仓物资详情弹窗 */}
      <SpecialMaterialDetailsModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
