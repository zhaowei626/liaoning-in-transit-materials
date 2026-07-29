"use client";

import type { SupplierItem } from "@/types/dashboard";

interface SupplierTopListProps {
  suppliers: SupplierItem[];
}

export function SupplierTopList({ suppliers }: SupplierTopListProps) {
  const leftSide = suppliers.slice(0, 5);
  const rightSide = suppliers.slice(5, 10);

  const TableHeader = () => (
    <div className="grid grid-cols-[3rem_1fr_6rem] border-b border-slate-700/50 pb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
      <div className="pl-2">排名</div>
      <div>供应商名称</div>
      <div className="text-right pr-2">在途金额(万元)</div>
    </div>
  );

  const SupplierRow = ({ item }: { item: SupplierItem }) => (
    <div className="grid grid-cols-[3rem_1fr_6rem] items-center py-2.5 border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors">
      <div className="pl-2 flex items-center">
        <span className={`flex h-5 w-5 items-center justify-center rounded text-[10px] font-bold ${
          item.rank <= 3 ? "bg-cyanCore/20 text-cyanCore border border-cyanCore/30" : "bg-slate-800 text-slate-400"
        }`}>
          {item.rank}
        </span>
      </div>
      <div className="truncate text-xs font-medium text-slate-300 pr-2" title={item.name}>
        {item.name}
      </div>
      <div className="text-right pr-2 font-display text-sm font-bold text-cyanCore">
        {item.amount}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
        {/* Left Column (1-5) */}
        <div className="flex flex-col">
          <TableHeader />
          <div className="flex flex-col">
            {leftSide.map((s) => (
              <SupplierRow key={s.rank} item={s} />
            ))}
          </div>
        </div>

        {/* Right Column (6-10) */}
        <div className="flex flex-col">
          <TableHeader />
          <div className="flex flex-col">
            {rightSide.map((s) => (
              <SupplierRow key={s.rank} item={s} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
