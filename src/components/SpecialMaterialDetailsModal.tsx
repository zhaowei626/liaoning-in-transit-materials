"use client";

import { X, Search, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useEffect, useState, useMemo } from "react";

export interface MaterialDetail {
  id: string;
  city: string;
  warehouseName: string;
  warehouseCode: string;
  materialName: string;
  materialCode: string;
  quantity: number;
  unit: string;
  unitPrice: string;
  totalPrice: string;
}

const mockDetails: MaterialDetail[] = [
  { id: "1", city: "沈阳市", warehouseName: "沈阳生产专业仓", warehouseCode: "SY-SC-001", materialName: "交流变压器", materialCode: "MAT-001", quantity: 15, unit: "台", unitPrice: "12.50万", totalPrice: "187.50万" },
  { id: "2", city: "大连市", warehouseName: "大连营销专业仓", warehouseCode: "DL-YX-002", materialName: "智能电能表", materialCode: "MAT-002", quantity: 1200, unit: "只", unitPrice: "0.02万", totalPrice: "24.00万" },
  { id: "3", city: "鞍山市", warehouseName: "鞍山安监专业仓", warehouseCode: "AS-AJ-001", materialName: "安全工器具", materialCode: "MAT-003", quantity: 350, unit: "套", unitPrice: "0.15万", totalPrice: "52.50万" },
  { id: "4", city: "抚顺市", warehouseName: "抚顺生产专业仓", warehouseCode: "FS-SC-003", materialName: "架空绝缘导线", materialCode: "MAT-004", quantity: 5000, unit: "米", unitPrice: "0.01万", totalPrice: "50.00万" },
  { id: "5", city: "锦州市", warehouseName: "锦州后勤专业仓", warehouseCode: "JZ-HQ-001", materialName: "办公设备", materialCode: "MAT-005", quantity: 45, unit: "件", unitPrice: "0.80万", totalPrice: "36.00万" },
  { id: "6", city: "营口市", warehouseName: "营口调控专业仓", warehouseCode: "YK-TK-002", materialName: "通信服务器", materialCode: "MAT-006", quantity: 8, unit: "台", unitPrice: "5.50万", totalPrice: "44.00万" },
  { id: "7", city: "盘锦市", warehouseName: "盘锦共享专业仓", warehouseCode: "PJ-GX-001", materialName: "备品备件", materialCode: "MAT-007", quantity: 800, unit: "个", unitPrice: "0.05万", totalPrice: "40.00万" },
  { id: "8", city: "铁岭市", warehouseName: "铁岭生产专业仓", warehouseCode: "TL-SC-002", materialName: "高压开关柜", materialCode: "MAT-008", quantity: 12, unit: "面", unitPrice: "8.20万", totalPrice: "98.40万" },
  { id: "9", city: "朝阳市", warehouseName: "朝阳营销专业仓", warehouseCode: "CY-YX-001", materialName: "集中器", materialCode: "MAT-009", quantity: 150, unit: "台", unitPrice: "0.12万", totalPrice: "18.00万" },
  { id: "10", city: "葫芦岛市", warehouseName: "葫芦岛生产专业仓", warehouseCode: "HLD-SC-001", materialName: "避雷器", materialCode: "MAT-010", quantity: 60, unit: "组", unitPrice: "1.10万", totalPrice: "66.00万" },
];

export interface SpecialMaterialDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SpecialMaterialDetailsModal({ isOpen, onClose }: SpecialMaterialDetailsModalProps) {
  const [cityInput, setCityInput] = useState("");
  const [warehouseInput, setWarehouseInput] = useState("");
  const [materialInput, setMaterialInput] = useState("");

  const [cityFilter, setCityFilter] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("");
  const [materialFilter, setMaterialFilter] = useState("");
  
  const [sortConfig, setSortConfig] = useState<{
    key: keyof MaterialDetail | null;
    direction: "asc" | "desc";
  }>({ key: null, direction: "asc" });

  const handleSearch = () => {
    setCityFilter(cityInput);
    setWarehouseFilter(warehouseInput);
    setMaterialFilter(materialInput);
  };

  const handleReset = () => {
    setCityInput("");
    setWarehouseInput("");
    setMaterialInput("");
    setCityFilter("");
    setWarehouseFilter("");
    setMaterialFilter("");
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

  const parseWan = (str: string) => parseFloat(str.replace("万", ""));

  const filteredAndSortedData = useMemo(() => {
    let data = mockDetails.filter(item => {
      const matchCity = item.city.includes(cityFilter);
      const matchWarehouse = item.warehouseName.includes(warehouseFilter);
      const matchMaterial = item.materialName.includes(materialFilter);
      return matchCity && matchWarehouse && matchMaterial;
    });

    if (sortConfig.key) {
      data.sort((a, b) => {
        const key = sortConfig.key as keyof MaterialDetail;
        let valA: string | number = a[key];
        let valB: string | number = b[key];

        if (key === "unitPrice" || key === "totalPrice") {
          valA = parseWan(valA as string);
          valB = parseWan(valB as string);
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
  }, [cityFilter, warehouseFilter, materialFilter, sortConfig]);

  const totalQuantity = useMemo(() => {
    return filteredAndSortedData.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [filteredAndSortedData]);

  const totalAmount = useMemo(() => {
    const sum = filteredAndSortedData.reduce((acc, curr) => acc + parseWan(curr.totalPrice), 0);
    return sum.toFixed(2) + "万";
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
        className="w-[90%] max-w-6xl max-h-[85vh] flex flex-col bg-slate-900 border border-cyanCore/30 shadow-cyanGlow rounded-xl overflow-hidden animate-in zoom-in-95 duration-200"
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
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  placeholder="请输入地市" 
                  className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded pl-8 pr-3 py-1.5 focus:outline-none focus:border-cyanCore/50 transition-colors w-32"
                />
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
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => requestSort("warehouseCode")}>
                    专业仓编码 {getSortIcon("warehouseCode")}
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => requestSort("materialName")}>
                    物料名称 {getSortIcon("materialName")}
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => requestSort("materialCode")}>
                    物料编码 {getSortIcon("materialCode")}
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 text-right cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => requestSort("quantity")}>
                    总商品数量 {getSortIcon("quantity")}
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 text-center">计量单位</th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 text-right cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => requestSort("unitPrice")}>
                    单价 {getSortIcon("unitPrice")}
                  </th>
                  <th className="px-4 py-3 font-semibold border-b border-slate-700/50 text-right cursor-pointer hover:bg-slate-700/50 transition-colors" onClick={() => requestSort("totalPrice")}>
                    总价 {getSortIcon("totalPrice")}
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
                  <td className="px-4 py-2 text-right font-display text-base">{totalQuantity}</td>
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
                    <td className="px-4 py-3 font-mono text-xs">{item.warehouseCode}</td>
                    <td className="px-4 py-3">{item.materialName}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-400">{item.materialCode}</td>
                    <td className="px-4 py-3 text-right font-display font-semibold text-slate-200">{item.quantity}</td>
                    <td className="px-4 py-3 text-center text-slate-400">{item.unit}</td>
                    <td className="px-4 py-3 text-right text-amberCore/90">{item.unitPrice}</td>
                    <td className="px-4 py-3 text-right font-display font-bold text-amberCore">{item.totalPrice}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={10} className="px-4 py-8 text-center text-slate-500">
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
