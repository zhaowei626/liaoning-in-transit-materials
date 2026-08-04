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
import type { ActiveElement, Chart as ChartInstance, ChartEvent } from "chart.js";
import { useRouter } from "next/navigation";
import { Bar, Line } from "react-chartjs-2";
import {
  barChartOptions,
  createBarChartData,
  createLineChartData,
  lineChartOptions
} from "@/lib/chartTheme";
import type { ChartDataSet, ChartPanelData } from "@/types/dashboard";

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Filler, Tooltip, Legend);

function resolveLinkedLabelHref(
  event: ChartEvent,
  elements: ActiveElement[],
  chartInstance: ChartInstance,
  labels: string[],
  labelLinks?: Record<string, string>
) {
  if (!labelLinks) {
    return null;
  }

  let labelIndex = elements[0]?.index;

  if (labelIndex === undefined) {
    const xScale = chartInstance.scales.x;

    if (xScale && typeof event.x === "number" && typeof event.y === "number") {
      const isInsideHorizontalScale = event.x >= xScale.left && event.x <= xScale.right;
      const isInsideLabelBand = event.y >= chartInstance.chartArea.bottom && event.y <= xScale.bottom;

      if (!isInsideHorizontalScale || !isInsideLabelBand) {
        return null;
      }

      const rawIndex = xScale.getValueForPixel(event.x);
      const parsedIndex = typeof rawIndex === "number" ? rawIndex : Number(rawIndex);

      if (Number.isFinite(parsedIndex)) {
        labelIndex = Math.round(parsedIndex);
      }
    }
  }

  if (labelIndex === undefined || labelIndex < 0 || labelIndex >= labels.length) {
    return null;
  }

  return labelLinks[labels[labelIndex]] ?? null;
}

export interface DashboardChartProps
  extends Readonly<{
    type: ChartPanelData["type"];
    chart: ChartDataSet;
    stacked?: boolean;
  }> {}

export function DashboardChart({ type, chart, stacked }: DashboardChartProps) {
  const router = useRouter();
  
  if (!chart) {
    return <div className="flex h-full items-center justify-center text-slate-500">图表数据尚未准备好</div>;
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
    return <Line data={createLineChartData(chart)} options={lineOptions} />;
  }

  const hasY1 = chart.datasets.some(d => d.yAxisID === "y1");

  const options = {
    ...barChartOptions,
    ...(chart.labelLinks ? {
      onClick: (event: ChartEvent, elements: ActiveElement[], chartInstance: ChartInstance) => {
        const href = resolveLinkedLabelHref(event, elements, chartInstance, chart.labels, chart.labelLinks);

        if (href) {
          router.push(href);
        }
      },
      onHover: (event: ChartEvent, elements: ActiveElement[], chartInstance: ChartInstance) => {
        const href = resolveLinkedLabelHref(event, elements, chartInstance, chart.labels, chart.labelLinks);
        chartInstance.canvas.style.cursor = href ? "pointer" : "default";
      }
    } : {}),
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
          title: chart.secondaryUnit ? {
            display: true,
            text: `单位: ${chart.secondaryUnit}`,
            align: "end" as const,
            color: "#64748b",
            font: { size: 10 }
          } : undefined,
          ticks: {
            color: "#64748b",
            callback: (value: any) => {
              if (chart.secondaryUnit) return `${value}`;
              return chart.unit?.includes("/") ? `${value}` : `${value}%`;
            }
          }
        }
      } : {})
    }
  };

  return <Bar data={createBarChartData(chart) as any} options={options as any} />;
}
