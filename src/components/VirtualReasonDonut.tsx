"use client";

import { ArcElement, Chart as ChartJS, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { ReasonDistributionData } from "@/data/virtualData";

ChartJS.register(ArcElement, Tooltip, Legend);

interface VirtualReasonDonutProps {
  data: ReasonDistributionData[];
}

export function VirtualReasonDonut({ data }: VirtualReasonDonutProps) {
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        data: data.map(d => d.value),
        backgroundColor: data.map(d => d.color),
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        display: false // Hide default legend to use our custom HTML legend
      },
      tooltip: {
        backgroundColor: "rgba(8, 20, 40, 0.94)",
        borderColor: "rgba(0, 242, 255, 0.4)",
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            const index = context.dataIndex;
            const item = data[index];
            return `${item.label}: ${item.value} 万元 | ${item.count} 条`;
          }
        }
      }
    }
  };

  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0).toFixed(1);

  return (
    <div className="flex items-center h-full gap-4">
      {/* 图表区域 */}
      <div className="relative w-1/3 min-w-[140px] h-[140px] flex items-center justify-center py-2">
        <div className="absolute inset-0 flex flex-col items-center justify-center z-0">
          <span className="font-display text-lg font-bold text-cyanCore">{totalValue}</span>
          <span className="text-[10px] text-inkMuted">总价值</span>
        </div>
        <div className="relative z-10 h-full w-full">
          <Doughnut data={chartData} options={options} />
        </div>
      </div>
      
      {/* 列表区域 */}
      <div className="flex-1 flex flex-col gap-1.5 overflow-y-auto custom-scrollbar max-h-[160px] pr-1">
        {data.map((item, idx) => (
          <div key={idx} className="flex flex-col p-1.5 rounded bg-slate-800/20 hover:bg-slate-800/40 transition-colors border border-slate-700/10">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color, boxShadow: `0 0 6px ${item.color}` }}></span>
              <span className="text-[10px] font-semibold text-slate-300 truncate" title={item.label}>{item.label}</span>
            </div>
            <div className="flex items-center justify-between pl-3.5">
              <div className="flex items-baseline gap-1">
                <span className="font-display text-xs font-bold" style={{ color: item.color }}>{item.value}</span>
                <span className="text-[8px] text-slate-500">万元</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-xs font-bold text-slate-200">{item.count}</span>
                <span className="text-[8px] text-slate-500">条目</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
