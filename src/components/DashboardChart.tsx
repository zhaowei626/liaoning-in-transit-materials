"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import {
  barChartOptions,
  createBarChartData,
  createLineChartData,
  lineChartOptions
} from "@/lib/chartTheme";
import type { ChartDataSet, ChartPanelData } from "@/types/dashboard";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Filler, Tooltip, Legend);

export interface DashboardChartProps
  extends Readonly<{
    type: ChartPanelData["type"];
    chart: ChartDataSet;
    stacked?: boolean;
  }> {}

export function DashboardChart({ type, chart, stacked }: DashboardChartProps) {
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
    return <Line data={createLineChartData(chart)} options={lineOptions} />;
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
          position: "right" as const,
          grid: { display: false },
          ticks: {
            color: "#64748b",
            callback: (value: any) => `${value}%`
          }
        }
      } : {})
    }
  };

  return <Bar data={createBarChartData(chart) as any} options={options as any} />;
}
