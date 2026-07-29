"use client";

import type { MetricItem } from "@/types/dashboard";

interface HorizontalBarStatProps {
  metrics: MetricItem[];
  cardId?: string;
}

export function HorizontalBarStat({ metrics, cardId }: HorizontalBarStatProps) {
  // Calculate total to determine percentage for each bar
  const total = metrics.reduce((acc, m) => acc + parseFloat(m.value), 0);
  
  // Use a distinct cyan-family color base for the 4th card
  const baseColor = "0, 152, 255"; // #0098ff
  const colors = [
    `rgba(${baseColor}, 0.35)`, // darkest / most transparent
    `rgba(${baseColor}, 0.65)`, // medium
    `rgba(${baseColor}, 1)`     // brightest
  ];

  return (
    <div className="mt-3 flex flex-1 flex-col justify-center gap-4 px-2">
      {metrics.map((metric, idx) => {
        const val = parseFloat(metric.value);
        const percent = total > 0 ? (val / total) * 100 : 0;
        const color = colors[idx % colors.length];
        const isBright = idx === 2;
        
        return (
          <div key={metric.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span 
                  className="h-2 w-2 rounded-sm"
                  style={{ 
                    backgroundColor: color,
                    boxShadow: isBright ? `0 0 8px ${colors[2]}` : "none"
                  }}
                />
                <span className="text-xs font-semibold text-inkMuted dark:text-inkMuted">{metric.label}</span>
              </div>
              <div className="font-display text-sm font-bold" style={{ color: colors[2] }}>
                {metric.value} <span className="text-[10px] font-normal text-inkMuted dark:text-inkMuted">{metric.unit}</span>
                {metric.subValue && (
                  <>
                    <span className="mx-1.5 text-slate-500/50">|</span>
                    {metric.subValue} <span className="text-[10px] font-normal text-inkMuted dark:text-inkMuted">{metric.subUnit}</span>
                  </>
                )}
              </div>
            </div>
            {/* Progress Bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/60 dark:bg-slate-800/60">
              <div
                style={{
                  width: `${percent}%`,
                  backgroundColor: color,
                  boxShadow: isBright ? `0 0 10px ${colors[2]}` : "none"
                }}
                className="h-full rounded-full transition-all duration-1000 ease-out"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}