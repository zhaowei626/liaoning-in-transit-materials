"use client";

import { MainHeader } from "@/components/MainHeader";
import { FooterRail } from "@/components/FooterRail";
import { SectionTitle } from "@/components/SectionTitle";
import { TechPanel } from "@/components/TechPanel";
import { dashboardTitle } from "@/data/mockData";
import { useClock } from "@/hooks/useClock";
import { Search, RotateCcw, FileText, ArrowRight, ArrowDown, Rocket, CheckSquare, Edit3, PenTool, Truck, Home, Box, Recycle, Undo2 } from "lucide-react";
import React from "react";

export default function ProjectMonitoringPage() {
  const clock = useClock();

  return (
    <div className="dashboard-shell min-h-screen w-full overflow-x-hidden p-dashboard text-slate-100 dark:text-slate-100">
      <MainHeader clock={clock} title={dashboardTitle} />
      
      {/* 搜索区域 */}
      <TechPanel className="mb-4 flex items-end justify-between gap-6 p-4">
        <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-3 xl:grid-cols-[15rem_15rem_25rem]">
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs text-inkMuted dark:text-inkMuted" htmlFor="unit-name">单位名称</label>
            <select className="select-input" id="unit-name" defaultValue="沈阳公司">
              <option value="沈阳公司">沈阳公司</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs text-inkMuted dark:text-inkMuted" htmlFor="voltage-level">电压等级</label>
            <select className="select-input" id="voltage-level" defaultValue="66kV">
              <option value="66kV">66kV</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs text-inkMuted dark:text-inkMuted" htmlFor="project-name">项目名称</label>
            <select className="select-input" id="project-name" defaultValue="沈阳李巴彦66kV输变电工程">
              <option value="沈阳李巴彦66kV输变电工程">沈阳李巴彦66kV输变电工程</option>
            </select>
          </div>
        </div>
        <div className="flex shrink-0 items-end gap-3 pb-1">
          <button
            className="inline-flex h-9 min-w-20 items-center justify-center gap-2 rounded-dashboard border border-cyanLine bg-cyanCore/20 px-5 text-sm font-bold text-cyanCore transition-colors hover:bg-cyanCore/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyanCore dark:border-cyanLine dark:bg-cyanCore/20 dark:text-cyanCore"
            type="button"
          >
            <Search className="h-4 w-4" /> 搜索
          </button>
          <button
            className="inline-flex h-9 min-w-20 items-center justify-center gap-2 rounded-dashboard border border-slate-600 bg-slateGlass px-5 text-sm font-bold text-inkMuted transition-colors hover:bg-slate-700/60 hover:text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-400 dark:border-slate-600 dark:bg-slateGlass dark:text-inkMuted"
            type="button"
          >
            <RotateCcw className="h-4 w-4" /> 重置
          </button>
        </div>
      </TechPanel>

      {/* 主体内容 */}
      <main className="flex flex-col gap-6 relative px-4">
        {/* 第一排 */}
        <div className="grid grid-cols-2 gap-6">
          {/* 项目信息 */}
          <TechPanel className="p-5">
            <div className="mb-6 flex items-center justify-between">
              <SectionTitle title="项目信息" />
            </div>
            <div className="flex gap-6 items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-cyanCore/20 to-transparent rounded-lg flex items-center justify-center border border-cyanLine/30 shadow-[inset_0_0_15px_rgba(0,242,255,0.2)]">
                <FileText className="w-12 h-12 text-cyanCore" />
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 flex-1">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-slate-400">项目名称：</span>
                  <span className="text-sm text-slate-100 font-medium">沈阳李巴彦66kV输变电工程</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-slate-400">项目编码：</span>
                  <span className="text-sm text-slate-100 font-medium">1622SY21001L</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-slate-400">单位部门：</span>
                  <span className="text-sm text-slate-100 font-medium">沈阳公司·基建部</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-slate-400">电压等级：</span>
                  <span className="text-sm text-slate-100 font-medium">66kV</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-slate-400">开工时间：</span>
                  <span className="text-sm text-slate-100 font-medium">2025/03/20</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-slate-400">竣工时间：</span>
                  <span className="text-sm text-slate-100 font-medium">2026/03/15</span>
                </div>
              </div>
            </div>
          </TechPanel>

          {/* 项目进度 */}
          <TechPanel className="p-5 flex flex-col">
            <div className="mb-8 flex items-center justify-between">
              <SectionTitle title="项目进度" />
            </div>
            
            <div className="flex-1 flex flex-col justify-center gap-6">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-semibold text-slate-200">物资供货进度</span>
                  <span className="text-xs text-slate-300">1124.24万/1124.24万</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div className="h-full bg-green-500 w-full" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-semibold text-slate-200">施工进度测算</span>
                  <span className="text-xs text-slate-300">524.24万/1124.24万</span>
                </div>
                <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700 relative">
                  <div className="h-full bg-amberCore w-[46.6%] relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_rgba(255,191,0,0.8)] translate-x-2" />
                  </div>
                </div>
              </div>
            </div>
          </TechPanel>
        </div>

        {/* 虚线连接区 */}
        <div className="h-12 w-full relative my-2">
          <div className="absolute top-1/2 left-0 w-full border-t-2 border-dashed border-cyanCore/40 -translate-y-1/2" />
          <div className="absolute top-1/2 left-[12.5%] -translate-y-1/2 -translate-x-1/2"><ArrowRight className="text-cyanCore w-6 h-6" /></div>
          <div className="absolute top-1/2 left-[37.5%] -translate-y-1/2 -translate-x-1/2"><ArrowRight className="text-cyanCore w-6 h-6" /></div>
          <div className="absolute top-1/2 left-[62.5%] -translate-y-1/2 -translate-x-1/2"><ArrowRight className="text-cyanCore w-6 h-6" /></div>
          <div className="absolute top-1/2 left-[87.5%] -translate-y-1/2 -translate-x-1/2"><ArrowRight className="text-cyanCore w-6 h-6" /></div>
          
          {/* 向下的箭头 */}
          <div className="absolute top-1/2 left-[25%] h-16 border-l-2 border-dashed border-cyanCore/40" />
          <div className="absolute top-[3.5rem] left-[25%] -translate-x-1/2"><ArrowDown className="text-cyanCore w-6 h-6" /></div>

          <div className="absolute top-1/2 left-[50%] h-16 border-l-2 border-dashed border-cyanCore/40" />
          <div className="absolute top-[3.5rem] left-[50%] -translate-x-1/2"><ArrowDown className="text-cyanCore w-6 h-6" /></div>

          <div className="absolute top-1/2 left-[75%] h-16 border-l-2 border-dashed border-cyanCore/40" />
          <div className="absolute top-[3.5rem] left-[75%] -translate-x-1/2"><ArrowDown className="text-cyanCore w-6 h-6" /></div>
        </div>

        {/* 第二排 流程节点 */}
        <div className="grid grid-cols-4 gap-6">
          <NodeCard title="计划申报" icon={<Edit3 className="w-8 h-8 text-cyanCore" />} data={[{label: "申报条数", value: 523, unit: "条"}, {label: "申报金额", value: "1,124.24", unit: "万元"}]} />
          <NodeCard title="合同签订" icon={<CheckSquare className="w-8 h-8 text-cyanCore" />} data={[{label: "签订合同", value: 523, unit: "份"}, {label: "合同金额", value: "1,124.24", unit: "万元"}]} />
          <NodeCard title="图纸确认" icon={<PenTool className="w-8 h-8 text-cyanCore" />} data={[{label: "确认图纸", value: 21, unit: "条"}, {label: "涉及金额", value: "1,124.24", unit: "万元"}]} />
          <NodeCard title="履约收货" icon={<Truck className="w-8 h-8 text-cyanCore" />} data={[{label: "收货物资", value: 52123, unit: "条"}, {label: "收货金额", value: "2,124.24", unit: "万元"}]} />
        </div>

        {/* 虚线连接区 (第二排到第三排) */}
        <div className="h-8 w-full relative flex justify-around">
          <div className="w-px h-full border-l-2 border-dashed border-cyanCore/40 relative">
             <ArrowDown className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-cyanCore w-6 h-6" />
          </div>
          <div className="w-px h-full border-l-2 border-dashed border-cyanCore/40 relative">
             <ArrowDown className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-cyanCore w-6 h-6" />
          </div>
          <div className="w-px h-full border-l-2 border-dashed border-cyanCore/40 relative">
             <ArrowDown className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-cyanCore w-6 h-6" />
          </div>
        </div>

        {/* 第三排 库节点 */}
        <div className="grid grid-cols-3 gap-6 px-16">
          <NodeCard title="物资库" icon={<Home className="w-8 h-8 text-cyanCore" />} data={[{label: "在库物资", value: 623, unit: "条"}, {label: "在库金额", value: "24.24", unit: "万元"}]} />
          <NodeCard title="项目现场库" icon={<Box className="w-8 h-8 text-cyanCore" />} data={[{label: "在库物资", value: 43923, unit: "条"}, {label: "在库金额", value: "1,624.24", unit: "万元"}]} />
          <NodeCard title="综合材料库" icon={<Home className="w-8 h-8 text-cyanCore" />} data={[{label: "在库物资", value: 43923, unit: "条"}, {label: "在库金额", value: "1,624.24", unit: "万元"}]} />
        </div>

        {/* 第四排 库节点 */}
        <div className="grid grid-cols-2 gap-6 px-48 mt-4">
          <NodeCard title="退实体库" icon={<Undo2 className="w-8 h-8 text-cyanCore" />} data={[{label: "退实体库物资", value: 21, unit: "个"}, {label: "退实体库金额", value: "0.24", unit: "万元"}]} />
          <NodeCard title="项目间再利用" icon={<Recycle className="w-8 h-8 text-cyanCore" />} data={[{label: "再利用物资", value: 123, unit: "条"}, {label: "周转金额", value: "4.24", unit: "万元"}]} />
        </div>

      </main>
      <div className="h-10"></div>
      <FooterRail />
    </div>
  );
}

function NodeCard({ title, icon, data }: { title: string, icon: React.ReactNode, data: {label: string, value: number|string, unit: string}[] }) {
  return (
    <TechPanel className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title={title} />
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 shrink-0 bg-gradient-to-br from-cyanCore/20 to-transparent rounded-full flex items-center justify-center border border-cyanLine/30">
          {icon}
        </div>
        <div className="flex-1 flex justify-around">
          {data.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-xs text-slate-300 mb-1">{item.label}</span>
              <div className="text-cyanCore font-display font-bold">
                <span className="text-xl">{item.value}</span>
                <span className="text-xs ml-1 text-slate-400">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TechPanel>
  );
}
