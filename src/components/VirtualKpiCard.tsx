import { TechPanel } from "@/components/TechPanel";
import type { VirtualKpiData } from "@/data/virtualData";
import { formatAmount, formatQuantity } from "@/lib/format";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export interface VirtualKpiCardProps {
  card: VirtualKpiData;
}

export function VirtualKpiCard({ card }: VirtualKpiCardProps) {
  return (
    <TechPanel className="flex flex-col p-4 min-h-[140px] hover:border-cyanLine/50 transition-colors group">
      <h3 className="text-sm font-bold text-slate-300 mb-3 truncate" title={card.title}>
        {card.title}
      </h3>
      <div className="flex-1 flex flex-col justify-center gap-3">
        {card.metrics.map((metric, idx) => {
          const displayValue = metric.isQuantity
            ? formatQuantity(metric.value)
            : formatAmount(metric.value);
            
          return (
            <div key={idx} className="flex flex-col gap-1">
              <div className="flex justify-between items-end">
                <span className="text-xs text-slate-400">{metric.label}</span>
                <div className="text-right">
                  <span className="font-display text-xl font-bold text-cyanCore">{displayValue}</span>
                  <span className="text-[10px] text-slate-500 ml-1">{metric.unit}</span>
                </div>
              </div>
              
              {metric.trend !== undefined && (
                <div className="flex justify-between items-center bg-slate-800/30 rounded px-2 py-1">
                  <span className="text-[10px] text-slate-500">较上周</span>
                  <div className="flex items-center gap-1">
                    {metric.trend > 0 ? (
                      <TrendingUp className="w-3 h-3 text-red-400" />
                    ) : metric.trend < 0 ? (
                      <TrendingDown className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Minus className="w-3 h-3 text-slate-400" />
                    )}
                    <span className={`text-xs font-display font-semibold ${
                      metric.trend > 0 ? 'text-red-400' : metric.trend < 0 ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {Math.abs(metric.trend).toFixed(1)} {metric.unit}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </TechPanel>
  );
}
