"use client";

import type { DataChange9300Record } from "@/data/virtualData";
import { PlusCircle, MinusCircle } from "lucide-react";

export interface Virtual9300DataChangesProps {
  records: DataChange9300Record[];
}

export function Virtual9300DataChanges({ records }: Virtual9300DataChangesProps) {
  const renderRecord = (record: DataChange9300Record) => {
    const isAdd = record.type === "add";
    const titleColor = isAdd ? "text-cyanCore" : "text-emerald-400";
    const titleText = isAdd ? "增加库存：" : "减少库存：";
    const Icon = isAdd ? PlusCircle : MinusCircle;

    return (
      <div key={record.id} className="flex gap-2 text-xs leading-relaxed text-slate-300 p-2.5 rounded border border-slate-700/30 bg-slate-800/20 hover:bg-slate-800/40 transition-colors">
        <div className="shrink-0 mt-0.5">
          <Icon className={`w-4 h-4 ${titleColor}`} />
        </div>
        <div>
          <span className={`font-bold ${titleColor}`}>{titleText}</span>
          <span className="text-slate-300">{record.text}</span>
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
