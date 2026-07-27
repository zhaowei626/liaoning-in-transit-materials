"use client";

import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { MetricItem } from "@/types/dashboard";
import { resolveToneColor } from "@/lib/chartTheme";

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutStatProps {
  metrics: MetricItem[];
  cardId?: string;
}

export function DonutStat({ metrics, cardId }: DonutStatProps) {
  const batchCount = metrics.find((m) => m.id.includes("batch-count"));
  const batchAmount = metrics.find((m) => m.id.includes("batch-amount"));
  const ecoCount = metrics.find((m) => m.id.includes("ecommerce-count"));
  const ecoAmount = metrics.find((m) => m.id.includes("ecommerce-amount"));

  const batchAmountVal = parseFloat(batchAmount?.value ?? "0");
  const ecoAmountVal = parseFloat(ecoAmount?.value ?? "0");
  const totalAmount = (batchAmountVal + ecoAmountVal).toFixed(2);
  const unit = batchAmount?.unit ?? "亿";

  // Use distinct colors based on cardId
  let batchColor = "#00f2ff"; // standard cyan
  let ecoColor = "#ffb000"; // standard amber

  if (cardId === "receipt") {
    batchColor = "#00d4ff"; // slightly deeper cyan
    ecoColor = "#ff9500"; // slightly deeper amber
  } else if (cardId === "delivery-confirmation") {
    batchColor = "#00b6ff"; // even deeper cyan
    ecoColor = "#ff7a00"; // even deeper amber
  }

  const data = {
    labels: [batchAmount?.label ?? "批次订单金额", ecoAmount?.label ?? "电商订单金额"],
    datasets: [
      {
        data: [batchAmountVal, ecoAmountVal],
        backgroundColor: [batchColor, ecoColor],
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "75%",
    plugins: {
      legend: {
        display: false // Hide default legend to use our custom one
      },
      tooltip: {
        backgroundColor: "rgba(8, 20, 40, 0.94)",
        borderColor: "rgba(0, 242, 255, 0.4)",
        borderWidth: 1,
        callbacks: {
          label: (context: any) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            return `${label}: ${value} ${unit}`;
          }
        }
      }
    }
  };

  return (
    <div className="mt-4 flex flex-1 items-center justify-between gap-2 px-2">
      <div className="relative flex h-[130px] w-[130px] shrink-0 items-center justify-center">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-lg font-bold text-cyanCore dark:text-cyanCore">{totalAmount}</span>
          <span className="text-[10px] text-inkMuted dark:text-inkMuted">总金额 ({unit})</span>
        </div>
        <div className="relative z-10 h-full w-full">
          <Doughnut data={data} options={options} />
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-center gap-5 pl-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: batchColor, boxShadow: `0 0 8px ${batchColor}` }}></span>
            <span className="text-xs font-semibold text-inkMuted dark:text-inkMuted">{batchCount?.label}</span>
          </div>
          <div className="font-display text-sm font-bold" style={{ color: batchColor }}>
            {batchAmount?.value}{" "}
            <span className="text-[10px] font-normal text-inkMuted dark:text-inkMuted">{batchAmount?.unit}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: ecoColor, boxShadow: `0 0 8px ${ecoColor}` }}></span>
            <span className="text-xs font-semibold text-inkMuted dark:text-inkMuted">{ecoCount?.label}</span>
          </div>
          <div className="font-display text-sm font-bold" style={{ color: ecoColor }}>
            {ecoAmount?.value}{" "}
            <span className="text-[10px] font-normal text-inkMuted dark:text-inkMuted">{ecoAmount?.unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
}