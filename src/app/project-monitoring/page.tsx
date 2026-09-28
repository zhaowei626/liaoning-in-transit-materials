"use client";

import MainHeader from "@/components/MainHeader";
import { FooterRail } from "@/components/FooterRail";
import { SectionTitle } from "@/components/SectionTitle";
import { TechPanel } from "@/components/TechPanel";
import { dashboardTitle } from "@/data/mockData";
import { useClock } from "@/hooks/useClock";
import { Search, RotateCcw, FileText, ArrowRight, ArrowDown, Rocket, FileCheck, Edit3, PenTool, Truck, Home, Box, Recycle, Undo2, ChevronDown, Settings, Trash2, X, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useMemo, useRef, useEffect } from "react";

const PROJECTS = [
  "沈阳李巴彦66kV输变电工程",
  "沈阳苏家屯220kV变电站新建工程",
  "沈阳浑南110kV输电线路工程",
  "大连金州66kV输变电工程",
  "鞍山立山66kV输变电工程"
];

const MANAGEMENT_UNITS = [
  "全部",
  "沈阳公司",
  "大连公司",
  "鞍山公司",
  "抚顺公司",
  "本溪公司",
  "丹东公司",
  "锦州公司",
  "营口公司",
  "阜新公司",
  "辽阳公司",
  "盘锦公司",
  "铁岭公司",
  "朝阳公司",
  "葫芦岛公司",
  "建管中心"
];

const MATERIAL_DETAILS = Array.from({ length: 55 }, (_, i) => ({
  id: i + 1,
  storeName: i % 3 === 0 ? "辽宁省电力有限公司沈阳供电公司物资库中心仓" : "沈阳物资库",
  storeCode: "SY-WH-001",
  poNumber: `PO20250813${(i + 1).toString().padStart(3, '0')}`,
  lineItem: (i + 1) * 10,
  materialCode: `MAT-100${(i + 1).toString().padStart(3, '0')}`,
  materialName: ["变压器隔板", "断路器支架", "高压隔离开关", "绝缘子串", "避雷器底座", "控制柜面板"][i % 6],
  quantity: (Math.random() * 100).toFixed(0),
  unit: "套",
  amount: (Math.random() * 50000).toFixed(2),
  entryDate: "2025-08-10"
}));

const currentYear = new Date().getFullYear();
const YEAR_OPTIONS = ["全部", ...Array.from({ length: 5 }, (_, i) => (currentYear - i).toString())];

export default function ProjectMonitoringPage() {
  const clock = useClock();
  const [projectSearch, setProjectSearch] = useState("");
  const [selectedProject, setSelectedProject] = useState(PROJECTS[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("全部");
  const [selectedYear, setSelectedYear] = useState("全部");
  const [selectedVoltage, setSelectedVoltage] = useState("66kV");
  const [selectedNodeType, setSelectedNodeType] = useState<"物资库" | "专业仓" | "综合材料站" | "退实体库" | "转备品备件" | "报废物资" | "项目间再利用" | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const modalConfig = useMemo(() => {
    if (selectedNodeType === "物资库") {
      return {
        title: "物资明细列表",
        nameLabel: "物资库名称",
        codeLabel: "物资库编码",
        dateLabel: "入库日期"
      };
    }
    if (selectedNodeType === "专业仓") {
      return {
        title: "专业仓明细列表",
        nameLabel: "专业仓名称",
        codeLabel: "专业仓编码",
        dateLabel: "入库日期"
      };
    }
    if (selectedNodeType === "综合材料站") {
      return {
        title: "综合材料站明细列表",
        nameLabel: "材料站名称",
        codeLabel: "材料站编码",
        dateLabel: "入库日期"
      };
    }
    if (selectedNodeType === "退实体库") {
      return {
        title: "退实体库明细列表",
        nameLabel: "退库前仓库名称",
        codeLabel: "退库后仓库名称",
        dateLabel: "退库日期"
      };
    }
    if (selectedNodeType === "转备品备件") {
      return {
        title: "转备品备件明细列表",
        nameLabel: "转备品前仓库名称",
        codeLabel: "转备品后仓库名称",
        dateLabel: "转备品日期"
      };
    }
    if (selectedNodeType === "报废物资") {
      return {
        title: "报废物资明细列表",
        nameLabel: "物资库名称",
        codeLabel: "物资库编码",
        dateLabel: "报废日期"
      };
    }
    if (selectedNodeType === "项目间再利用") {
      return {
        title: "项目间再利用明细列表",
        nameLabel: "物资库名称",
        codeLabel: "所属项目",
        dateLabel: "转项目日期"
      };
    }
    return { title: "", nameLabel: "", codeLabel: "", dateLabel: "" };
  }, [selectedNodeType]);

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
      
      {/* 副标题及更新时间 */}
      <div className="relative flex items-center justify-center mb-4 mt-2">
        <h2 className="text-xl font-bold text-cyanCore tracking-widest text-shadow-sm">重点基建工程履约情况</h2>
        <div className="absolute right-0 text-sm text-slate-400 font-mono" suppressHydrationWarning>
          数据更新时间：{new Date().getFullYear()}-{String(new Date().getMonth() + 1).padStart(2, '0')}-{String(new Date().getDate()).padStart(2, '0')}
        </div>
      </div>

      {/* 搜索区域 */}
      <TechPanel className="mb-4 flex items-end justify-between gap-6 p-4 relative z-30">
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-[12rem_10rem_10rem_20rem]">
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs text-inkMuted dark:text-inkMuted" htmlFor="unit-name">管理单位</label>
            <select 
              className="select-input" 
              id="unit-name" 
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
            >
              {MANAGEMENT_UNITS.map(unit => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs text-inkMuted dark:text-inkMuted" htmlFor="project-year">项目年份</label>
            <select 
              className="select-input" 
              id="project-year" 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {YEAR_OPTIONS.map(year => (
                <option key={year} value={year}>{year === "全部" ? "全部" : `${year}年`}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="ml-1 text-xs text-inkMuted dark:text-inkMuted" htmlFor="voltage-level">电压等级</label>
            <select 
              className="select-input" 
              id="voltage-level" 
              value={selectedVoltage}
              onChange={(e) => setSelectedVoltage(e.target.value)}
            >
              <option value="全部">全部</option>
              <option value="500kV">500kV</option>
              <option value="220kV">220kV</option>
              <option value="66kV">66kV</option>
              <option value="10kV">10kV</option>
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
      </TechPanel>

      {/* 主体内容 */}
      <main className="flex flex-col gap-2 relative z-10">
        {/* 第一排 */}
        <div className="grid grid-cols-2 gap-4">
          {/* 项目信息 */}
          <TechPanel className="p-3 h-[180px]">
            <div className="mb-3 flex items-center justify-between">
              <SectionTitle title="项目信息" />
            </div>
            <div className="flex gap-4 items-center h-[calc(100%-2.5rem)]">
              <div className="w-16 h-16 bg-gradient-to-br from-cyanCore/20 to-transparent rounded-lg flex items-center justify-center border border-cyanLine/30 shadow-[inset_0_0_15px_rgba(0,242,255,0.2)] shrink-0">
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
                  <span className="text-sm text-slate-400 whitespace-nowrap">管理单位：</span>
                  <span className="text-sm text-slate-100 font-medium">沈阳公司</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 whitespace-nowrap">电压等级：</span>
                  <span className="text-sm text-slate-100 font-medium">66kV</span>
                </div>
              </div>
            </div>
          </TechPanel>

          {/* 项目进度 */}
          <TechPanel className="p-3 flex flex-col h-[180px]">
            <div className="mb-4 flex items-center justify-between">
              <SectionTitle title="项目进度" />
            </div>
            
            <div className="flex-1 flex flex-col justify-center gap-6">
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 whitespace-nowrap">开工时间：</span>
                  <span className="text-sm text-slate-100 font-medium">2025/03/20</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-400 whitespace-nowrap">投产时间：</span>
                  <span className="text-sm text-slate-100 font-medium">2026/03/15</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-semibold text-slate-200">物资供货进度</span>
                  <span className="text-xs text-slate-300">1124.24万/1124.24万</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  <div className="h-full bg-green-500 w-full" />
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
        <TechPanel className="p-4 relative min-h-[168px] flex items-center">
          <div className="flex items-center justify-between w-full relative z-10">
            <StepItem 
              title="计划申报" 
              icon={<Edit3 className="w-5 h-5 text-cyanCore" />} 
              data={[{label: "申报条数", value: 523, unit: "条"}, {label: "申报金额", value: "1,124.24", unit: "万元"}]}
              isFirst
            />
            <StepDivider />
            <StepItem 
              title="合同签订" 
              icon={<FileCheck className="w-5 h-5 text-cyanCore" />} 
              data={[{label: "签订合同", value: 231, unit: "份"}, {label: "涉及金额", value: "924.24", unit: "万元"}]}
            />
            <StepDivider />
            <StepItem 
              title="发货通知确认" 
              icon={<PenTool className="w-5 h-5 text-cyanCore" />} 
              data={[{label: "确认发货", value: 21, unit: "条"}, {label: "涉及金额", value: "1,124.24", unit: "万元"}]}
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
        <div className="h-4 w-full relative grid grid-cols-3 gap-4">
          <div className="flex justify-center h-full">
            <div className="w-px h-full border-l border-dashed border-cyanCore/40 relative">
               <ArrowDown className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-cyanCore w-4 h-4" />
            </div>
          </div>
          <div className="flex justify-center h-full">
            <div className="w-px h-full border-l border-dashed border-cyanCore/40 relative">
               <ArrowDown className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-cyanCore w-4 h-4" />
            </div>
          </div>
          <div className="flex justify-center h-full">
            <div className="w-px h-full border-l border-dashed border-cyanCore/40 relative">
               <ArrowDown className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-cyanCore w-4 h-4" />
            </div>
          </div>
        </div>

        {/* 第三排 库节点 */}
        <div className="grid grid-cols-3 gap-4">
          <NodeCard 
            title="物资库" 
            icon={<Home className="w-6 h-6 text-cyanCore" />} 
            data={[{label: "在库物资", value: 623, unit: "条"}, {label: "在库金额", value: "24.24", unit: "万元"}]} 
            onClick={() => setSelectedNodeType("物资库")}
          />
          <NodeCard 
            title="专业仓" 
            icon={<Box className="w-6 h-6 text-cyanCore" />} 
            data={[{label: "在库物资", value: 43923, unit: "条"}, {label: "在库金额", value: "1,624.24", unit: "万元"}]} 
            onClick={() => setSelectedNodeType("专业仓")}
          />
          <NodeCard 
            title="综合材料站" 
            icon={<Home className="w-6 h-6 text-cyanCore" />} 
            data={[{label: "在库物资", value: 43923, unit: "条"}, {label: "在库金额", value: "1,624.24", unit: "万元"}]} 
            onClick={() => setSelectedNodeType("综合材料站")}
          />
        </div>

        {/* 第五排 库节点 */}
        <div className="flex justify-center gap-4 mt-1">
          <div className="w-[calc((100%-3rem)/4)]">
            <NodeCard 
              title="退实体库" 
              icon={<Undo2 className="w-6 h-6 text-cyanCore" />} 
              data={[{label: "退实体库物资", value: 21, unit: "条"}, {label: "退实体库金额", value: "0.24", unit: "万元"}]} 
              onClick={() => setSelectedNodeType("退实体库")}
            />
          </div>
          <div className="w-[calc((100%-3rem)/4)]">
            <NodeCard 
              title="项目间再利用" 
              icon={<Recycle className="w-6 h-6 text-cyanCore" />} 
              data={[{label: "再利用物资", value: 123, unit: "条"}, {label: "周转金额", value: "4.24", unit: "万元"}]} 
              onClick={() => setSelectedNodeType("项目间再利用")}
            />
          </div>
        </div>

      </main>
      <FooterRail />

      {/* 弹窗组件 */}
      {selectedNodeType && (
        <DetailModal 
          config={modalConfig}
          onClose={() => setSelectedNodeType(null)} 
          nodeType={selectedNodeType}
        />
      )}
    </div>
  );
}

function formatNumber(val: number | string, label?: string) {
  const noGroupLabels = ["申报金额", "合同金额", "涉及金额", "收货金额", "在库金额", "退实体库金额", "周转金额"];
  const useGrouping = label ? !noGroupLabels.includes(label) : true;

  if (typeof val === 'string') {
    const num = parseFloat(val.replace(/,/g, ''));
    if (isNaN(num)) return val;
    // toLocaleString with useGrouping: false might still behave differently depending on environment
    // Use a more explicit formatting approach for金额 fields
    if (!useGrouping) {
      return num.toFixed(val.includes('.') ? 2 : 0);
    }
    return num.toLocaleString('en-US', { 
      minimumFractionDigits: val.includes('.') ? 2 : 0 
    });
  }
  
  if (!useGrouping) {
    return val.toString();
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
              <span className="text-lg">{formatNumber(item.value, item.label)}</span>
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

function NodeCard({ title, icon, data, onClick }: { title: string, icon: React.ReactNode, data: {label: string, value: number|string, unit: string}[], onClick?: () => void }) {
  return (
    <TechPanel 
      className={`p-2 transition-all ${onClick ? 'cursor-pointer hover:bg-cyanCore/5 active:scale-[0.98]' : ''}`}
      onClick={onClick}
    >
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
                <span className="text-lg">{formatNumber(item.value, item.label)}</span>
                <span className="text-[10px] ml-0.5 text-slate-400">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TechPanel>
  );
}

function DetailModal({ config, onClose, nodeType }: { config: { title: string, nameLabel: string, codeLabel: string, dateLabel: string }, onClose: () => void, nodeType: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(MATERIAL_DETAILS.length / pageSize);
  
  const currentData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return MATERIAL_DETAILS.slice(start, start + pageSize);
  }, [currentPage]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <TechPanel className="w-[90vw] max-w-6xl h-[85vh] flex flex-col p-0 overflow-hidden shadow-2xl border-cyanCore/30">
        {/* 弹窗头部 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cyanLine/20 bg-panelStrong/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyanCore/10 rounded-lg border border-cyanCore/20">
              <Home className="w-5 h-5 text-cyanCore" />
            </div>
            <h2 className="text-lg font-bold text-slate-100 tracking-tight">{config.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-700/50 text-slate-400 hover:text-slate-100 transition-all active:scale-90"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 弹窗主体 - 表格 */}
        <div className="flex-1 overflow-auto p-6 custom-scrollbar bg-slateGlass/20">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="sticky top-0 z-10">
              <tr>
                {["序号", config.nameLabel, config.codeLabel, config.dateLabel, "物料编码", "物料名称", "数量", "计量单位", "金额(元)"].map((head, idx) => (
                  <th 
                    key={idx}
                    className="bg-panelStrong/90 backdrop-blur-md px-4 py-3 text-xs font-semibold text-cyanCore border-b border-cyanLine/30 first:rounded-tl-lg last:rounded-tr-lg whitespace-nowrap"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {currentData.map((row) => (
                <tr 
                  key={row.id} 
                  className="group hover:bg-cyanCore/5 transition-colors"
                >
                  <td className="px-4 py-3 text-sm text-slate-400 group-hover:text-cyanCore/70 font-mono">{row.id}</td>
                  <td 
                    className="px-4 py-3 text-sm text-slate-200 group-hover:text-slate-100 max-w-[12rem] truncate" 
                    title={row.storeName.length > 10 ? row.storeName : undefined}
                  >
                    {row.storeName.length > 10 ? `${row.storeName.slice(0, 10)}...` : row.storeName}
                  </td>
                  <td className="px-4 py-3 text-sm font-mono">
                    {["物资库", "专业仓", "综合材料站", "报废物资"].includes(nodeType) 
                      ? <span className="text-slate-400">{row.storeCode}</span>
                      : (nodeType === "转备品备件" 
                        ? (
                          <span 
                            className="text-slate-200 group-hover:text-slate-100 max-w-[12rem] truncate inline-block align-middle"
                            title={`${row.storeName}备品库`}
                          >
                            {`${row.storeName}备品库`.length > 10 ? `${(`${row.storeName}备品库`).slice(0, 10)}...` : `${row.storeName}备品库`}
                          </span>
                        )
                        : (nodeType === "退实体库"
                          ? (
                            <span 
                              className="text-slate-200 group-hover:text-slate-100 max-w-[12rem] truncate inline-block align-middle"
                              title={`${row.storeName}实体库`}
                            >
                              {`${row.storeName}实体库`.length > 10 ? `${(`${row.storeName}实体库`).slice(0, 10)}...` : `${row.storeName}实体库`}
                            </span>
                          )
                          : (nodeType === "项目间再利用"
                            ? (
                              <span 
                                className="text-slate-200 group-hover:text-slate-100 max-w-[12rem] truncate inline-block align-middle"
                                title="沈阳东220千伏变电站新建工程"
                              >
                                {"沈阳东220千伏变电站新建工程".length > 10 ? `${"沈阳东220千伏变电站新建工程".slice(0, 10)}...` : "沈阳东220千伏变电站新建工程"}
                              </span>
                            )
                            : <span className="text-slate-400">{row.storeCode}</span>))
                      )
                    }
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-400 whitespace-nowrap">{row.entryDate}</td>
                  <td className="px-4 py-3 text-sm text-slate-400 font-mono">{row.materialCode}</td>
                  <td className="px-4 py-3 text-sm text-slate-200 font-medium">{row.materialName}</td>
                  <td className="px-4 py-3 text-sm text-cyanCore font-bold text-right">{row.quantity}</td>
                  <td className="px-4 py-3 text-sm text-slate-400 text-center">{row.unit}</td>
                  <td className="px-4 py-3 text-sm text-amberCore font-bold text-right font-mono">{formatNumber(row.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {currentData.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-slate-500 italic">
              <Box className="w-12 h-12 mb-3 opacity-20" />
              暂无物资明细数据
            </div>
          )}
        </div>

        {/* 弹窗底部 - 分页 */}
        <div className="px-6 py-4 border-t border-cyanLine/10 bg-panelStrong/30 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-500">共 {MATERIAL_DETAILS.length} 条</span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="p-1 rounded border border-slate-700 hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`min-w-[28px] h-7 text-xs font-medium rounded transition-all ${
                    currentPage === page 
                    ? 'bg-cyanCore text-slate-900 shadow-[0_0_10px_rgba(0,242,255,0.4)]' 
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-700/50'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                className="p-1 rounded border border-slate-700 hover:bg-slate-700/50 disabled:opacity-30 disabled:cursor-not-allowed text-slate-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <span className="text-xs text-slate-500">{currentPage} / {totalPages} 页</span>
          </div>
          
          <button 
            onClick={onClose}
            className="px-6 py-1.5 rounded-md border border-slate-600 bg-slateGlass text-sm font-medium text-slate-300 hover:bg-slate-700 hover:text-white transition-all"
          >
            关闭
          </button>
        </div>
      </TechPanel>
    </div>
  );
}
