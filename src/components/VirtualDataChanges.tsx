"use client";

import type { DataChangeRecord } from "@/data/virtualData";
import { PlusCircle, MinusCircle } from "lucide-react";

export interface VirtualDataChangesProps {
  records: DataChangeRecord[];
}

export function VirtualDataChanges({ records }: VirtualDataChangesProps) {
  const renderRecord = (record: DataChangeRecord) => {
    const isAdd = record.type === "add";
    return (
      <div key={record.id} className="flex gap-2 text-xs leading-relaxed text-slate-300 p-2.5 rounded border border-slate-700/30 bg-slate-800/20 hover:bg-slate-800/40 transition-colors">
        <div className="shrink-0 mt-0.5">
          {isAdd ? (
            <div className="flex items-center gap-1 text-cyanCore font-medium">
              <PlusCircle className="w-4 h-4" />
              <span>增加库存</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-emerald-400 font-medium">
              <MinusCircle className="w-4 h-4" />
              <span>减少库存</span>
            </div>
          )}
        </div>
        <div>
          本周{isAdd ? "新增" : "清理"} <span className="font-display font-bold text-cyanCore">{record.count}</span> 条 
          <span className="text-slate-100 font-semibold mx-1">{record.city}</span> 
          <span className="text-slate-200">{record.dataType}</span> 数据，涉及金额 
          <span className="font-display font-bold text-amberCore mx-1">{record.amount}</span> 万元，原因：
          <span className="text-slate-400">{record.reason}</span>。
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-2">
        {records.length > 0 ? (
          records.map(renderRecord)
        ) : (
          <div className="text-xs text-slate-500 italic p-2">暂无数据增减记录</div>
        )}
      </div>
    </div>
  );
}
