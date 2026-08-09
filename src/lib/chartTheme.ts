import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Filler } from "chart.js";
import type { ChartOptions } from "chart.js";
import type { ChartDataSet, MetricTone } from "@/types/dashboard";

// Register ChartJS components globally
ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Tooltip, Legend, Filler);

const toneColors: Record<MetricTone, string> = {
  cyan: "#00f2ff",
  amber: "#ffbf00",
  "cyan-light": "#67e8f9",
  "amber-light": "#fbbf24",
  indigo: "#6366f1",
  emerald: "#10b981",
  orange: "#f97316",
  red: "#ef4444"
};

const toneFills: Record<MetricTone, string> = {
  cyan: "rgba(0, 242, 255, 0.1)",
  amber: "rgba(255, 191, 0, 0.1)",
  "cyan-light": "rgba(103, 232, 249, 0.1)",
  "amber-light": "rgba(251, 191, 36, 0.1)",
  indigo: "rgba(99, 102, 241, 0.1)",
  emerald: "rgba(16, 185, 129, 0.1)",
  orange: "rgba(249, 115, 22, 0.1)",
  red: "rgba(239, 68, 68, 0.1)"
};

export const resolveToneColor = (tone: MetricTone) => toneColors[tone];

export function createBarChartData(chart: ChartDataSet) {
  return {
    labels: chart.labels,
    datasets: chart.datasets.map((dataset) => {
      const color = toneColors[dataset.tone];
      
      if (dataset.type === "line") {
        return {
          type: "line" as const,
          label: dataset.label,
          data: dataset.data,
          borderColor: color,
          backgroundColor: color,
          borderWidth: 2,
          tension: 0.4,
          fill: false,
          pointRadius: 4,
          yAxisID: dataset.yAxisID
        };
      }

      const toneCount = chart.datasets.filter(d => d.tone === dataset.tone && d.type !== "line").length;
      const toneIdx = chart.datasets.filter(d => d.tone === dataset.tone && d.type !== "line").indexOf(dataset);
      
      let opacity = 1;
      if (toneCount > 1) {
        opacity = 0.4 + (0.6 * (toneIdx / (toneCount - 1)));
      }
      
      const hexToRgb = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
      };
      
      const rgb = hexToRgb(color);

      return {
        type: "bar" as const,
        label: dataset.label,
        data: dataset.data,
        backgroundColor: `rgba(${rgb}, ${opacity})`,
        borderColor: `rgba(${rgb}, 1)`,
        borderWidth: toneCount > 1 ? 1 : 0, 
        borderRadius: 2,
        barThickness: 15,
        yAxisID: dataset.yAxisID
      };
    })
  };
}

export function createLineChartData(chart: ChartDataSet) {
  return {
    labels: chart.labels,
    datasets: chart.datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: resolveToneColor(dataset.tone),
      backgroundColor: toneFills[dataset.tone],
      tension: 0.4,
      fill: true,
      pointRadius: 4
    }))
  };
}

export const barChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      align: "end",
      labels: { color: "#94a3b8", boxWidth: 10, font: { size: 10 }, usePointStyle: true }
    },
    tooltip: {
      backgroundColor: "rgba(8, 20, 40, 0.94)",
      borderColor: "rgba(0, 242, 255, 0.4)",
      borderWidth: 1
    }
  },
  scales: {
    y: { grid: { color: "#1e293b" }, ticks: { color: "#64748b" } },
    x: { grid: { display: false }, ticks: { color: "#94a3b8" } }
  }
};

export const lineChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      align: "end",
      labels: { color: "#94a3b8", boxWidth: 10 }
    },
    tooltip: {
      backgroundColor: "rgba(8, 20, 40, 0.94)",
      borderColor: "rgba(0, 242, 255, 0.4)",
      borderWidth: 1
    }
  },
  scales: {
    y: { grid: { color: "#1e293b" }, ticks: { color: "#64748b" } },
    x: { grid: { color: "#1e293b" }, ticks: { color: "#94a3b8" } }
  }
};
