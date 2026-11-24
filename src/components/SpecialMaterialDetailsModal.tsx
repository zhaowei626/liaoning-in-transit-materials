"use client";

import { X, Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { formatAmount } from "@/lib/format";

export interface MaterialDetail {
  id: string;
  city: string;
  warehouseName: string;
  warehouseCode: string;
  warehouseType: string;
  materialName: string;
  quantity: number;
  unit: string;
  unitPrice: string;
  totalPrice: string;
  entryTime: string;
}

const mockDetails: MaterialDetail[] = [
  { id: "1", city: "沈阳市", warehouseName: "沈阳生产专业仓", warehouseCode: "SY-SC-001", warehouseType: "生产仓", materialName: "交流变压器", quantity: 15, unit: "台", unitPrice: "125000.00", totalPrice: "1875000.00", entryTime: "2026-10-15" },
  { id: "2", city: "大连市", warehouseName: "大连营销专业仓", warehouseCode: "DL-YX-002", warehouseType: "营销仓", materialName: "智能电能表", quantity: 1200, unit: "只", unitPrice: "200.00", totalPrice: "240000.00", entryTime: "2026-11-02" },
  { id: "3", city: "鞍山市", warehouseName: "鞍山安监专业仓", warehouseCode: "AS-AJ-001", warehouseType: "安监仓", materialName: "安全工器具", quantity: 350, unit: "套", unitPrice: "1500.00", totalPrice: "525000.00", entryTime: "2026-09-20" },
  { id: "4", city: "抚顺市", warehouseName: "抚顺生产专业仓", warehouseCode: "FS-SC-003", warehouseType: "生产仓", materialName: "架空绝缘导线", quantity: 5000, unit: "米", unitPrice: "100.00", totalPrice: "500000.00", entryTime: "2026-11-10" },
  { id: "5", city: "锦州市", warehouseName: "锦州后勤专业仓", warehouseCode: "JZ-HQ-001", warehouseType: "后勤仓", materialName: "办公设备", quantity: 45, unit: "件", unitPrice: "8000.00", totalPrice: "360000.00", entryTime: "2026-08-25" },
  { id: "6", city: "营口市", warehouseName: "营口调控专业仓", warehouseCode: "YK-TK-002", warehouseType: "调控仓", materialName: "通信服务器", quantity: 8, unit: "台", unitPrice: "55000.00", totalPrice: "440000.00", entryTime: "2026-10-28" },
  { id: "7", city: "盘锦市", warehouseName: "盘锦共享专业仓", warehouseCode: "PJ-GX-001", warehouseType: "共享仓", materialName: "备品备件", quantity: 800, unit: "个", unitPrice: "500.00", totalPrice: "400000.00", entryTime: "2026-11-15" },
  { id: "8", city: "铁岭市", warehouseName: "铁岭生产专业仓", warehouseCode: "TL-SC-002", warehouseType: "生产仓", materialName: "高压开关柜", quantity: 12, unit: "面", unitPrice: "82000.00", totalPrice: "984000.00", entryTime: "2026-09-05" },
  { id: "9", city: "朝阳市", warehouseName: "朝阳营销专业仓", warehouseCode: "CY-YX-001", warehouseType: "营销仓", materialName: "集中器", quantity: 150, unit: "台", unitPrice: "1200.00", totalPrice: "180000.00", entryTime: "2026-10-01" },
  { id: "10", city: "葫芦岛市", warehouseName: "葫芦岛生产专业仓", warehouseCode: "HLD-SC-001", warehouseType: "生产仓", materialName: "避雷器", quantity: 60, unit: "组", unitPrice: "11000.00", totalPrice: "660000.00", entryTime: "2026-11-20" },
];

export interface SpecialMaterialDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const cities = ["辽宁省", "沈阳市", "大连市", "鞍山市", "抚顺市", "本溪市", "丹东市", "锦州市", "营口市", "阜新市", "辽阳市", "盘锦市", "铁岭市", "朝阳市", "葫芦岛市"];
const warehouseTypes = ["全部", "营销仓", "生产仓", "后勤仓", "安监仓", "调控仓", "共享仓"];

export function SpecialMaterialDetailsModal({ isOpen, onClose }: SpecialMaterialDetailsModalProps) {
  const [cityInput, setCityInput] = useState("辽宁省");
  const [warehouseTypeInput, setWarehouseTypeInput] = useState("全部");
  const [warehouseInput, setWarehouseInput] = useState("");
  const [materialInput, setMaterialInput] = useState("");
  const [startDateInput, setStartDateInput] = useState("");
  const [endDateInput, setEndDateInput] = useState("");

  const [cityFilter, setCityFilter] = useState("辽宁省");
  const [warehouseTypeFilter, setWarehouseTypeFilter] = useState("全部");
  const [warehouseFilter, setWarehouseFilter] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");
  const [startDateFilter, setStartDateFilter] = useState("");
  const [endDateFilter, setEndDateFilter] = useState("");

  const [sortConfig, setSortConfig] = useState<{
    key: keyof MaterialDetail | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const handleSearch = () => {
    setCityFilter(cityInput);
    setWarehouseTypeFilter(warehouseTypeInput);
    setWarehouseFilter(warehouseInput);
    setMaterialFilter(materialInput);
    setStartDateFilter(startDateInput);
    setEndDateFilter(endDateInput);
  };

  const handleReset = () => {
    setCityInput("辽宁省");
    setWarehouseTypeInput("全部");
    setWarehouseInput("");
    setMaterialInput("");
    setStartDateInput("");
    setEndDateInput("");
    setCityFilter("辽宁省");
    setWarehouseTypeFilter("全部");
    setWarehouseFilter("");
    setMaterialFilter("");
    setStartDateFilter("");
    setEndDateFilter("");
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

  const parsePrice = (str: string) => parseFloat(str.replace(/[元,]/g, ""));

  const filteredAndSortedData = useMemo(() => {
    let data = mockDetails.filter(item => {
      const matchCity = cityFilter === "辽宁省" ? true : item.city === cityFilter;
      const matchWarehouseType = warehouseTypeFilter === "全部" ? true : item.warehouseType === warehouseTypeFilter;
      const matchWarehouse = item.warehouseName.includes(warehouseFilter);
      const matchMaterial = item.materialName.includes(materialFilter);
      
      let matchDate = true;
      if (startDateFilter && endDateFilter) {
        matchDate = item.entryTime >= startDateFilter && item.entryTime <= endDateFilter;
      } else if (startDateFilter) {
        matchDate = item.entryTime >= startDateFilter;
      } else if (endDateFilter) {
        matchDate = item.entryTime <= endDateFilter;
      }
      
      return matchCity && matchWarehouseType && matchWarehouse && matchMaterial && matchDate;
    });

    if (sortConfig.key) {
      data.sort((a, b) => {
        const key = sortConfig.key as keyof MaterialDetail;
        let valA: string | number = a[key];
        let valB: string | number = b[key];

        if (key === "unitPrice" || key === "totalPrice") {
          valA = parsePrice(valA as string);
          valB = parsePrice(valB as string);
        }

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
  }, [cityFilter, warehouseTypeFilter, warehouseFilter, materialFilter, startDateFilter, endDateFilter, sortConfig]);

  const totalQuantity = useMemo(() => {
    return filteredAndSortedData.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [filteredAndSortedData]);

  const totalAmount = useMemo(() => {
    const sum = filteredAndSortedData.reduce((acc, curr) => acc + parsePrice(curr.totalPrice), 0);
    return formatAmount(sum, false);
  }, [filteredAndSortedData]);

  const requestSort = (key: keyof MaterialDetail) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof MaterialDetail) => {
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
          <h2 className="text-lg font-bold text-cyanCore tracking-wide">在仓物资详情</h2>
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
              <span className="text-xs text-slate-400">物料名称:</span>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={materialInput}
                  onChange={(e) => setMaterialInput(e.target.value)}
                  placeholder="请输入物料名称" 
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded pl-8 pr-3 py-1.5 focus:outline-none focus:border-cyanCore/50 transition-colors w-40"
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">入仓时间:</span>
              <div className="flex items-center gap-1.5">
                <input 
                  type="date" 
                  value={startDateInput}
                  onChange={(e) => setStartDateInput(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded px-2 py-1.5 focus:outline-none focus:border-cyanCore/50 transition-colors cursor-pointer appearance-none"
                />
                <span className="text-slate-500">-</span>
                <input 
                  type="date" 
                  value={endDateInput}
                  onChange={(e) => setEndDateInput(e.target.value)}
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded px-2 py-1.5 focus:outline-none focus:border-cyanCore/50 transition-colors cursor-pointer appearance-none"
                />
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
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => requestSort("materialName")}>
                    物料名称 {getSortIcon("materialName")}
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => requestSort("entryTime")}>
                    入仓时间 {getSortIcon("entryTime")}
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 text-right cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => requestSort("quantity")}>
                    总商品数量 {getSortIcon("quantity")}
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 text-center">计量单位</th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 text-right cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => requestSort("unitPrice")}>
                    单价(元) {getSortIcon("unitPrice")}
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 text-right cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => requestSort("totalPrice")}>
                    总价(元) {getSortIcon("totalPrice")}
                  </th>
                </tr>
                {/* 汇总行 */}
                <tr className="bg-slate-800/90 text-cyanCore font-bold border-b-2 border-cyanCore/30">
                  <td className="px-4 py-2">汇总</td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2 text-right font-display text-base">{totalAmount}</td>
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
                    <td className="px-4 py-3">{item.materialName}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{item.entryTime}</td>
                    <td className="px-4 py-3 text-right font-display font-semibold text-slate-200">{item.quantity}</td>
                    <td className="px-4 py-3 text-center text-slate-400">{item.unit}</td>
                    <td className="px-4 py-3 text-right text-amberCore/90">{item.unitPrice}</td>
                    <td className="px-4 py-3 text-right font-display font-bold text-amberCore">{item.totalPrice}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={11} className="px-4 py-8 text-center text-slate-500">
                      暂无符合条件的数据
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Mock */}
          <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
            <div>共 10 条数据</div>
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
