import { TechPanel } from "@/components/TechPanel";
import type { VirtualKpiData } from "@/data/virtualData";
import { formatAmount, formatQuantity } from "@/lib/format";
import { TrendingUp, TrendingDown, Minus, MousePointer2 } from "lucide-react";

export interface VirtualKpiCardProps {
  card: VirtualKpiData;
}

export function VirtualKpiCard({ card }: VirtualKpiCardProps) {
  const isOverall = card.id === "overall";
  const isAlert = card.id === "alert";
  const isAmountVertical = ["overall", "v9100", "v9300", "v9400", "v9500"].includes(card.id);

  return (
    <TechPanel className={`flex flex-col p-4 min-h-[140px] cursor-pointer hover:bg-slate-800/20 transition-colors group ${
      isOverall ? "border-cyanCore/40 bg-cyanCore/5" : 
      isAlert ? "border-amberCore/40 bg-amberCore/5" : ""
    }`}>
      <div className="flex items-start justify-between mb-2">
        <h3 className={`font-bold truncate flex-1 ${
          isOverall ? "text-slate-300 text-base" : 
          isAlert ? "text-amberCore text-sm" : "text-slate-300 text-sm"
        }`} title={card.title}>
          {card.title}
        </h3>
        <MousePointer2 className={`h-3.5 w-3.5 mt-0.5 transition-colors ${
          isAlert 
            ? "text-amberCore/50 group-hover:text-amberCore" 
            : "text-inkMuted/50 group-hover:text-cyanCore"
        }`} />
      </div>
      <div className="flex-1 flex flex-col justify-center gap-3">
        {card.metrics.map((metric, idx) => {
          const displayValue = metric.isQuantity
            ? formatQuantity(metric.value)
            : formatAmount(metric.value);
            
          const toneClass = metric.tone === "amber" || isAlert
            ? "text-amberCore"
            : "text-cyanCore";
            
          const [mainLabel, subLabel] = metric.label.split("/");
            
          return (
            <div key={idx} className="flex flex-col gap-1">
              <div className={`flex ${isAmountVertical ? "flex-col items-start gap-1" : "justify-between items-end"}`}>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-slate-400">{mainLabel}</span>
                  {subLabel && (
                    <span className="text-[10px] text-slate-500 font-normal">{subLabel}</span>
                  )}
                </div>
                <div className={isAmountVertical ? "mt-1" : "text-right"}>
                  <span className={`font-display ${isOverall ? "text-3xl" : isAmountVertical ? "text-2xl" : "text-xl"} font-bold ${toneClass}`}>{displayValue}</span>
                  <span className={`${isOverall ? "text-sm" : isAmountVertical ? "text-xs" : "text-[10px]"} text-slate-500 ml-1`}>{metric.unit}</span>
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
