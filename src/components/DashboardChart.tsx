"use client";

import { useEffect, useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import {
  barChartOptions,
  createBarChartData,
  createLineChartData,
  lineChartOptions
} from "@/lib/chartTheme";
import type { ChartDataSet, ChartPanelData } from "@/types/dashboard";

// Register Chart.js components globally
ChartJS.register(...registerables);

export interface DashboardChartProps
  extends Readonly<{
    type: ChartPanelData["type"];
    chart: ChartDataSet;
    stacked?: boolean;
  }> {}

export function DashboardChart({ type, chart, stacked }: DashboardChartProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Double ensure registration on client side
    ChartJS.register(...registerables);
  }, []);

  if (!isClient || !chart) {
    return (
      <div className="flex h-full items-center justify-center text-slate-500 text-xs">
        正在加载图表数据...
      </div>
    );
  }

  const yAxisTitle = chart.unit ? {
    display: true,
    text: `单位: ${chart.unit}`,
    align: "end" as const,
    color: "#94a3b8",
    font: { size: 10 }
  } : undefined;

  if (type === "line") {
    const lineOptions = {
      ...lineChartOptions,
      scales: {
        ...lineChartOptions.scales,
        y: {
          ...lineChartOptions.scales?.y,
          title: yAxisTitle
        }
      }
    };
    return <Line data={createLineChartData(chart)} options={lineOptions as any} />;
  }

  const hasY1 = chart.datasets.some(d => d.yAxisID === "y1");

  const options = {
    ...barChartOptions,
    scales: {
      ...barChartOptions.scales,
      x: {
        ...barChartOptions.scales?.x,
        stacked: stacked
      },
      y: {
        ...barChartOptions.scales?.y,
        stacked: stacked,
        title: yAxisTitle
      },
      ...(hasY1 ? {
        y1: {
          type: "linear" as const,
          position: "right" as const,
          grid: { display: false },
          title: chart.secondaryUnit ? {
            display: true,
            text: `单位: ${chart.secondaryUnit}`,
            align: "end" as const,
            color: "#64748b",
            font: { size: 10 }
          } : undefined,
          ticks: {
            color: "#64748b"
          }
        }
      } : {})
    }
  };

  return <Bar data={createBarChartData(chart) as any} options={options as any} />;
}
