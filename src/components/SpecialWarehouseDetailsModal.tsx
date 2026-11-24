"use client";

import { X, Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

export interface WarehouseDetail {
  id: string;
  city: string;
  warehouseName: string;
  warehouseCode: string;
  warehouseType: string;
  address: string;
  department: string;
  status: "启用" | "未启用";
}

const mockWarehouses: WarehouseDetail[] = [
  { id: "1", city: "沈阳市", warehouseName: "沈阳生产专业仓", warehouseCode: "SY-SC-001", warehouseType: "生产仓", address: "沈阳市和平区南九马路", department: "沈阳供电公司生产部", status: "启用" },
  { id: "2", city: "大连市", warehouseName: "大连营销专业仓", warehouseCode: "DL-YX-002", warehouseType: "营销仓", address: "大连市中山区解放路", department: "大连供电公司营销部", status: "启用" },
  { id: "3", city: "鞍山市", warehouseName: "鞍山安监专业仓", warehouseCode: "AS-AJ-001", warehouseType: "安监仓", address: "鞍山市铁东区胜利路", department: "鞍山供电公司安监部", status: "启用" },
  { id: "4", city: "抚顺市", warehouseName: "抚顺生产专业仓", warehouseCode: "FS-SC-003", warehouseType: "生产仓", address: "抚顺市望花区雷锋路", department: "抚顺供电公司生产部", status: "未启用" },
  { id: "5", city: "锦州市", warehouseName: "锦州后勤专业仓", warehouseCode: "JZ-HQ-001", warehouseType: "后勤仓", address: "锦州市凌河区解放路", department: "锦州供电公司后勤部", status: "启用" },
  { id: "6", city: "营口市", warehouseName: "营口调控专业仓", warehouseCode: "YK-TK-002", warehouseType: "调控仓", address: "营口市站前区市府路", department: "营口供电公司调控中心", status: "启用" },
  { id: "7", city: "盘锦市", warehouseName: "盘锦共享专业仓", warehouseCode: "PJ-GX-001", warehouseType: "共享仓", address: "盘锦市兴隆台区石油大街", department: "盘锦供电公司综合部", status: "启用" },
  { id: "8", city: "铁岭市", warehouseName: "铁岭生产专业仓", warehouseCode: "TL-SC-002", warehouseType: "生产仓", address: "铁岭市银州区汇工路", department: "铁岭供电公司生产部", status: "启用" },
  { id: "9", city: "朝阳市", warehouseName: "朝阳营销专业仓", warehouseCode: "CY-YX-001", warehouseType: "营销仓", address: "朝阳市双塔区中山大街", department: "朝阳供电公司营销部", status: "启用" },
  { id: "10", city: "葫芦岛市", warehouseName: "葫芦岛生产专业仓", warehouseCode: "HLD-SC-001", warehouseType: "生产仓", address: "葫芦岛市龙港区海滨路", department: "葫芦岛供电公司生产部", status: "未启用" },
];

const cities = ["辽宁省", "沈阳市", "大连市", "鞍山市", "抚顺市", "本溪市", "丹东市", "锦州市", "营口市", "阜新市", "辽阳市", "盘锦市", "铁岭市", "朝阳市", "葫芦岛市"];
const warehouseTypes = ["全部", "营销仓", "生产仓", "后勤仓", "安监仓", "调控仓", "共享仓"];
const statusOptions = ["全部", "启用", "未启用"];

export interface SpecialWarehouseDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SpecialWarehouseDetailsModal({ isOpen, onClose }: SpecialWarehouseDetailsModalProps) {
  const [cityInput, setCityInput] = useState("辽宁省");
  const [warehouseTypeInput, setWarehouseTypeInput] = useState("全部");
  const [warehouseInput, setWarehouseInput] = useState("");
  const [statusInput, setStatusInput] = useState("全部");

  const [cityFilter, setCityFilter] = useState("辽宁省");
  const [warehouseTypeFilter, setWarehouseTypeFilter] = useState("全部");
  const [warehouseFilter, setWarehouseFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("全部");
  
  const [sortConfig, setSortConfig] = useState<{
    key: keyof WarehouseDetail | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const handleSearch = () => {
    setCityFilter(cityInput);
    setWarehouseTypeFilter(warehouseTypeInput);
    setWarehouseFilter(warehouseInput);
    setStatusFilter(statusInput);
  };

  const handleReset = () => {
    setCityInput("辽宁省");
    setWarehouseTypeInput("全部");
    setWarehouseInput("");
    setStatusInput("全部");
    setCityFilter("辽宁省");
    setWarehouseTypeFilter("全部");
    setWarehouseFilter("");
    setStatusFilter("全部");
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const filteredAndSortedData = useMemo(() => {
    let data = mockWarehouses.filter(item => {
      const matchCity = cityFilter === "辽宁省" ? true : item.city === cityFilter;
      const matchWarehouseType = warehouseTypeFilter === "全部" ? true : item.warehouseType === warehouseTypeFilter;
      const matchWarehouse = item.warehouseName.includes(warehouseFilter);
      const matchStatus = statusFilter === "全部" ? true : item.status === statusFilter;
      return matchCity && matchWarehouseType && matchWarehouse && matchStatus;
    });

    if (sortConfig.key) {
      data.sort((a, b) => {
        const key = sortConfig.key as keyof WarehouseDetail;
        const valA = a[key];
        const valB = b[key];

        if (valA < valB) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (valA > valB) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [cityFilter, warehouseTypeFilter, warehouseFilter, statusFilter, sortConfig]);

  const requestSort = (key: keyof WarehouseDetail) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof WarehouseDetail) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="w-3 h-3 text-slate-500 ml-1 inline-block" />;
    }
    return sortConfig.direction === "asc" ? 
      <ArrowUp className="w-3 h-3 text-cyanCore ml-1 inline-block" /> : 
      <ArrowDown className="w-3 h-3 text-cyanCore ml-1 inline-block" />;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-[96%] max-w-[1600px] max-h-[90vh] flex flex-col bg-slate-900 border border-cyanCore/30 shadow-cyanGlow rounded-xl overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-800/50">
          <h2 className="text-lg font-bold text-cyanCore tracking-wide">专业仓详情</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-cyanCore"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col overflow-hidden p-6 gap-4">
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">地市:</span>
              <div className="relative">
                <select 
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded pl-2 pr-8 py-1.5 focus:outline-none focus:border-cyanCore/50 transition-colors w-32 appearance-none cursor-pointer"
                >
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ArrowDown className="w-3 h-3 text-slate-500" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">专业仓类型:</span>
              <div className="relative">
                <select 
                  value={warehouseTypeInput}
                  onChange={(e) => setWarehouseTypeInput(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded pl-2 pr-8 py-1.5 focus:outline-none focus:border-cyanCore/50 transition-colors w-32 appearance-none cursor-pointer"
                >
                  {warehouseTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ArrowDown className="w-3 h-3 text-slate-500" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">专业仓名称:</span>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={warehouseInput}
                  onChange={(e) => setWarehouseInput(e.target.value)}
                  placeholder="请输入专业仓" 
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded pl-8 pr-3 py-1.5 focus:outline-none focus:border-cyanCore/50 transition-colors w-40"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">状态:</span>
              <div className="relative">
                <select 
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded pl-2 pr-8 py-1.5 focus:outline-none focus:border-cyanCore/50 transition-colors w-28 appearance-none cursor-pointer"
                >
                  {statusOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                  <ArrowDown className="w-3 h-3 text-slate-500" />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <button 
                onClick={handleReset} 
                className="px-4 py-1.5 text-xs rounded bg-slate-700/50 text-slate-300 border border-slate-600 hover:bg-slate-600 transition-colors"
              >
                重置
              </button>
              <button 
                onClick={handleSearch} 
                className="px-4 py-1.5 text-xs rounded bg-cyanCore/20 text-cyanCore border border-cyanCore/50 hover:bg-cyanCore/30 transition-colors flex items-center gap-1"
              >
                <Search className="w-3.5 h-3.5" />
                查询
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto custom-scrollbar rounded-lg border border-slate-700/50">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-slate-800/80 text-slate-300 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50">序号</th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => requestSort("city")}>
                    地市 {getSortIcon("city")}
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => requestSort("warehouseName")}>
                    专业仓名称 {getSortIcon("warehouseName")}
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => requestSort("warehouseType")}>
                    专业仓类型 {getSortIcon("warehouseType")}
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => requestSort("warehouseCode")}>
                    专业仓编码 {getSortIcon("warehouseCode")}
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50">专业仓地址</th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => requestSort("department")}>
                    管理部门 {getSortIcon("department")}
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 text-center cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => requestSort("status")}>
                    状态 {getSortIcon("status")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50 text-slate-300">
                {filteredAndSortedData.length > 0 ? filteredAndSortedData.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 text-slate-400">{idx + 1}</td>
                    <td className="px-4 py-3">{item.city}</td>
                    <td className="px-4 py-3 text-cyanCore/90">{item.warehouseName}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{item.warehouseType}</td>
                    <td className="px-4 py-3 font-mono text-xs">{item.warehouseCode}</td>
                    <td className="px-4 py-3 text-slate-400 max-w-xs truncate" title={item.address}>{item.address}</td>
                    <td className="px-4 py-3 text-slate-300">{item.department}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                        item.status === "启用" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-slate-700 text-slate-400 border border-slate-600"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                      暂无符合条件的数据
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Mock */}
          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <div>共 {filteredAndSortedData.length} 条数据</div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 rounded border border-slate-700 hover:bg-slate-800 transition-colors disabled:opacity-50" disabled>上一页</button>
              <button className="px-3 py-1 rounded bg-cyanCore/20 text-cyanCore border border-cyanCore/30">1</button>
              <button className="px-3 py-1 rounded border border-slate-700 hover:bg-slate-800 transition-colors">下一页</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
