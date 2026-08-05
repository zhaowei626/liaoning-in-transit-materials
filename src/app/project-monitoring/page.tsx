"use client";

import { MainHeader } from "@/components/MainHeader";
import { FooterRail } from "@/components/FooterRail";
import { SectionTitle } from "@/components/SectionTitle";
import { TechPanel } from "@/components/TechPanel";
import { dashboardTitle } from "@/data/mockData";
import { useClock } from "@/hooks/useClock";
import { Search, RotateCcw, FileText, ArrowRight, ArrowDown, Rocket, CheckSquare, Edit3, PenTool, Truck, Home, Box, Recycle, Undo2, ChevronDown } from "lucide-react";
import React, { useState, useMemo, useRef, useEffect } from "react";

const PROJECTS = [
  "沈阳李巴彦66kV输变电工程",
  "沈阳苏家屯220kV变电站新建工程",
  "沈阳浑南110kV输电线路工程",
  "大连金州66kV输变电工程",
  "鞍山立山66kV输变电工程"
];

export default function ProjectMonitoringPage() {
  const clock = useClock();
  const [projectSearch, setProjectSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => p.toLowerCase().includes(projectSearch.toLowerCase()));
  }, [projectSearch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dashboard-shell min-h-screen w-full overflow-x-hidden p-dashboard text-slate-100 dark:text-slate-100">
      <MainHeader clock={clock} title={dashboardTitle} />
      
      {/* 搜索区域 */}
      <TechPanel className="mb-2 flex items-end justify-between gap-6 p-3 relative z-30">
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
          <div className="flex flex-col gap-1 relative" ref={dropdownRef}>
            <label className="ml-1 text-xs text-inkMuted dark:text-inkMuted" htmlFor="project-search">项目名称</label>
            <div className="relative">
              <input 
                type="text"
                id="project-search"
                className="select-input w-full pr-8 appearance-none bg-none"
                style={{ backgroundImage: 'none' }}
                placeholder="输入关键字过滤..."
                value={isDropdownOpen ? projectSearch : selectedProject}
                onChange={(e) => {
                  setProjectSearch(e.target.value);
                  setIsDropdownOpen(true);
                }}
                onFocus={() => {
                  setProjectSearch("");
                  setIsDropdownOpen(true);
                }}
              />
              <ChevronDown className={`absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-full mt-1 bg-panelStrong border border-cyanLine/50 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto backdrop-blur-md custom-scrollbar">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project, idx) => (
                    <div 
                      key={idx}
                      className={`px-3 py-2 text-sm cursor-pointer hover:bg-cyanCore/20 hover:text-cyanCore transition-colors ${selectedProject === project ? 'text-cyanCore bg-cyanCore/10' : 'text-slate-100'}`}
                      onClick={() => {
                        setSelectedProject(project);
                        setProjectSearch(project);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {project}
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-slate-500 italic">无匹配项</div>
                )}
              </div>
            )}
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
      <main className="flex flex-col gap-2 relative z-10">
        {/* 第一排 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 项目信息 */}
          <TechPanel className="p-3">
            <div className="mb-3 flex items-center justify-between">
              <SectionTitle title="项目信息" />
            </div>
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyanCore/20 to-transparent rounded-lg flex items-center justify-center border border-cyanLine/30 shadow-[inset_0_0_15px_rgba(0,242,255,0.2)]">
                <FileText className="w-8 h-8 text-cyanCore" />
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 whitespace-nowrap">项目名称：</span>
                  <span className="text-sm text-slate-100 font-medium">沈阳李巴彦66kV输变电工程</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 whitespace-nowrap">项目编码：</span>
                  <span className="text-sm text-slate-100 font-medium">1622SY21001L</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 whitespace-nowrap">单位部门：</span>
                  <span className="text-sm text-slate-100 font-medium">沈阳公司·基建部</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 whitespace-nowrap">电压等级：</span>
                  <span className="text-sm text-slate-100 font-medium">66kV</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 whitespace-nowrap">开工时间：</span>
                  <span className="text-sm text-slate-100 font-medium">2025/03/20</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 whitespace-nowrap">竣工时间：</span>
                  <span className="text-sm text-slate-100 font-medium">2026/03/15</span>
                </div>
              </div>
            </div>
          </TechPanel>

          {/* 项目进度 */}
          <TechPanel className="p-3 flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <SectionTitle title="项目进度" />
            </div>
            
            <div className="flex-1 flex flex-col justify-center gap-4">
              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-semibold text-slate-200">物资供货进度</span>
                  <span className="text-xs text-slate-300">1124.24万/1124.24万</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div className="h-full bg-green-500 w-full" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-semibold text-slate-200">施工进度测算</span>
                  <span className="text-xs text-slate-300">524.24万/1124.24万</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700 relative">
                  <div className="h-full bg-amberCore w-[46.6%] relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,191,0,0.8)] translate-x-1.5" />
                  </div>
                </div>
              </div>
            </div>
          </TechPanel>
        </div>

        {/* 虚线连接区 */}
        <div className="h-6 w-full relative my-1">
          <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-cyanCore/40 -translate-y-1/2" />
          <div className="absolute top-1/2 left-[12.5%] -translate-y-1/2 -translate-x-1/2"><ArrowRight className="text-cyanCore w-4 h-4" /></div>
          <div className="absolute top-1/2 left-[37.5%] -translate-y-1/2 -translate-x-1/2"><ArrowRight className="text-cyanCore w-4 h-4" /></div>
          <div className="absolute top-1/2 left-[62.5%] -translate-y-1/2 -translate-x-1/2"><ArrowRight className="text-cyanCore w-4 h-4" /></div>
          <div className="absolute top-1/2 left-[87.5%] -translate-y-1/2 -translate-x-1/2"><ArrowRight className="text-cyanCore w-4 h-4" /></div>
          
          {/* 向下的箭头 */}
          <div className="absolute top-1/2 left-[25%] h-8 border-l border-dashed border-cyanCore/40" />
          <div className="absolute top-[1.5rem] left-[25%] -translate-x-1/2"><ArrowDown className="text-cyanCore w-4 h-4" /></div>

          <div className="absolute top-1/2 left-[50%] h-8 border-l border-dashed border-cyanCore/40" />
          <div className="absolute top-[1.5rem] left-[50%] -translate-x-1/2"><ArrowDown className="text-cyanCore w-4 h-4" /></div>

          <div className="absolute top-1/2 left-[75%] h-8 border-l border-dashed border-cyanCore/40" />
          <div className="absolute top-[1.5rem] left-[75%] -translate-x-1/2"><ArrowDown className="text-cyanCore w-4 h-4" /></div>
        </div>

        {/* 第二排 流程步骤条 */}
        <TechPanel className="p-4 relative">
          <div className="flex items-center justify-between relative z-10">
            <StepItem 
              title="计划申报" 
              icon={<Edit3 className="w-5 h-5 text-cyanCore" />} 
              data={[{label: "申报条数", value: 523, unit: "条"}, {label: "申报金额", value: "1,124.24", unit: "万元"}]}
              isFirst
            />
            <StepDivider />
            <StepItem 
              title="合同签订" 
              icon={<CheckSquare className="w-5 h-5 text-cyanCore" />} 
              data={[{label: "签订合同", value: 523, unit: "份"}, {label: "合同金额", value: "1,124.24", unit: "万元"}]}
            />
            <StepDivider />
            <StepItem 
              title="图纸确认" 
              icon={<PenTool className="w-5 h-5 text-cyanCore" />} 
              data={[{label: "确认图纸", value: 21, unit: "条"}, {label: "涉及金额", value: "1,124.24", unit: "万元"}]}
            />
            <StepDivider />
            <StepItem 
              title="履约收货" 
              icon={<Truck className="w-5 h-5 text-cyanCore" />} 
              data={[{label: "收货物资", value: 52123, unit: "条"}, {label: "收货金额", value: "2,124.24", unit: "万元"}]}
              isLast
            />
          </div>
        </TechPanel>

        {/* 虚线连接区 (第二排到第三排) */}
        <div className="h-4 w-full relative flex justify-around">
          <div className="w-px h-full border-l border-dashed border-cyanCore/40 relative left-[-16.6%]">
             <ArrowDown className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-cyanCore w-4 h-4" />
          </div>
          <div className="w-px h-full border-l border-dashed border-cyanCore/40 relative">
             <ArrowDown className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-cyanCore w-4 h-4" />
          </div>
          <div className="w-px h-full border-l border-dashed border-cyanCore/40 relative right-[-16.6%]">
             <ArrowDown className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-cyanCore w-4 h-4" />
          </div>
        </div>

        {/* 第三排 库节点 */}
        <div className="grid grid-cols-3 gap-4 px-16">
          <NodeCard title="物资库" icon={<Home className="w-6 h-6 text-cyanCore" />} data={[{label: "在库物资", value: 623, unit: "条"}, {label: "在库金额", value: "24.24", unit: "万元"}]} />
          <NodeCard title="项目现场库" icon={<Box className="w-6 h-6 text-cyanCore" />} data={[{label: "在库物资", value: 43923, unit: "条"}, {label: "在库金额", value: "1,624.24", unit: "万元"}]} />
          <NodeCard title="综合材料库" icon={<Home className="w-6 h-6 text-cyanCore" />} data={[{label: "在库物资", value: 43923, unit: "条"}, {label: "在库金额", value: "1,624.24", unit: "万元"}]} />
        </div>

        {/* 第四排 库节点 */}
        <div className="grid grid-cols-2 gap-4 px-48 mt-1">
          <NodeCard title="退实体库" icon={<Undo2 className="w-6 h-6 text-cyanCore" />} data={[{label: "退实体库物资", value: 21, unit: "个"}, {label: "退实体库金额", value: "0.24", unit: "万元"}]} />
          <NodeCard title="项目间再利用" icon={<Recycle className="w-6 h-6 text-cyanCore" />} data={[{label: "再利用物资", value: 123, unit: "条"}, {label: "周转金额", value: "4.24", unit: "万元"}]} />
        </div>

      </main>
      <FooterRail />
    </div>
  );
}

function formatNumber(val: number | string) {
  if (typeof val === 'string') {
    const num = parseFloat(val.replace(/,/g, ''));
    if (isNaN(num)) return val;
    return num.toLocaleString('en-US', { minimumFractionDigits: val.includes('.') ? 2 : 0 });
  }
  return val.toLocaleString('en-US');
}

function StepItem({ title, icon, data, isFirst, isLast }: { title: string, icon: React.ReactNode, data: {label: string, value: number|string, unit: string}[], isFirst?: boolean, isLast?: boolean }) {
  return (
    <div className="flex flex-col items-center flex-1 relative">
      <div className="flex items-center gap-2 mb-2">
        <div className="bg-cyanCore/20 p-1.5 rounded-full border border-cyanCore/30">
          {icon}
        </div>
        <span className="text-sm font-bold text-slate-100 italic tracking-wider">{title}</span>
      </div>
      <div className="flex gap-4">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col items-center">
            <span className="text-[10px] text-slate-400 mb-0.5">{item.label}</span>
            <div className="text-cyanCore font-display font-bold">
              <span className="text-lg">{formatNumber(item.value)}</span>
              <span className="text-[10px] ml-0.5 text-slate-400">{item.unit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepDivider() {
  return (
    <div className="flex-1 h-px border-t border-dashed border-cyanCore/30 mx-4 mt-[-20px]" />
  );
}

function NodeCard({ title, icon, data }: { title: string, icon: React.ReactNode, data: {label: string, value: number|string, unit: string}[] }) {
  return (
    <TechPanel className="p-2">
      <div className="mb-2 flex items-center justify-between">
        <SectionTitle title={title} />
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-12 h-12 shrink-0 bg-gradient-to-br from-cyanCore/20 to-transparent rounded-full flex items-center justify-center border border-cyanLine/30">
          {icon}
        </div>
        <div className="flex-1 flex justify-around">
          {data.map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-[10px] text-slate-300 mb-0.5">{item.label}</span>
              <div className="text-cyanCore font-display font-bold">
                <span className="text-lg">{formatNumber(item.value)}</span>
                <span className="text-[10px] ml-0.5 text-slate-400">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TechPanel>
  );
}
