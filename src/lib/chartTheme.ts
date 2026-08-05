import type { ChartOptions } from "chart.js";
import type { ChartDataSet, MetricTone } from "@/types/dashboard";

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
    datasets: chart.datasets.map((dataset, idx) => {
      if (dataset.type === "line") {
        const isProvinceRate = dataset.label === "省公司平均在途率";
        const isCityRate = dataset.label === "各地市在途率";
        
        const color = toneColors[dataset.tone];
        
        return {
          type: "line" as const,
          label: dataset.label,
          data: dataset.data,
          borderColor: isProvinceRate ? "rgba(255, 191, 0, 0.6)" : color,
          backgroundColor: isProvinceRate ? "rgba(255, 191, 0, 0.6)" : color,
          borderWidth: 2,
          borderDash: isProvinceRate ? [5, 5] : undefined,
          tension: 0.4,
          fill: false,
          pointStyle: isProvinceRate || isCityRate ? "rectRot" : "circle",
          pointRadius: 4,
          yAxisID: dataset.yAxisID
        };
      }

      // Calculate opacity to make stacked items distinct when using same tone
      // If there are many datasets, we decrease opacity for earlier ones
      const toneCount = chart.datasets.filter(d => d.tone === dataset.tone && d.type !== "line").length;
      const toneIdx = chart.datasets.filter(d => d.tone === dataset.tone && d.type !== "line").indexOf(dataset);
      
      let opacity = 1;
      if (toneCount > 1) {
        // e.g., 4 items -> 0.4, 0.6, 0.8, 1.0
        opacity = 0.4 + (0.6 * (toneIdx / (toneCount - 1)));
      }
      
      const baseColor = dataset.tone === "cyan" ? "0, 242, 255" : "255, 191, 0";

      return {
        type: "bar" as const,
        label: dataset.label,
        data: dataset.data,
        backgroundColor: `rgba(${baseColor}, ${opacity})`,
        borderColor: `rgba(${baseColor}, 1)`,
        borderWidth: toneCount > 1 ? 1 : 0, // Add border to distinguish stacked segments
        borderRadius: 2,
        barThickness: 15,
        yAxisID: dataset.yAxisID,
        pointStyle: "rect"
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
      pointStyle: "circle" as const,
      pointRadius: 4,
      pointHoverRadius: 6
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
      onClick: (e, legendItem, legend) => {
        const index = legendItem.datasetIndex;
        const ci = legend.chart;
        if (ci.isDatasetVisible(index!)) {
          ci.hide(index!);
          legendItem.hidden = true;
        } else {
          ci.show(index!);
          legendItem.hidden = false;
        }
      },
      labels: {
        color: "#94a3b8",
        boxWidth: 10,
        font: { size: 10 },
        usePointStyle: true
      }
    },
    tooltip: {
      backgroundColor: "rgba(8, 20, 40, 0.94)",
      borderColor: "rgba(0, 242, 255, 0.4)",
      borderWidth: 1
    }
  },
  scales: {
    y: {
      grid: { color: "#1e293b" },
      ticks: { color: "#64748b" }
    },
    x: {
      grid: { display: false },
      ticks: { color: "#94a3b8" }
    }
  }
};

export const lineChartOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      align: "end",
      onClick: (e, legendItem, legend) => {
        const index = legendItem.datasetIndex;
        const ci = legend.chart;
        if (ci.isDatasetVisible(index!)) {
          ci.hide(index!);
          legendItem.hidden = true;
        } else {
          ci.show(index!);
          legendItem.hidden = false;
        }
      },
      labels: {
        color: "#94a3b8",
        boxWidth: 10
      }
    },
    tooltip: {
      backgroundColor: "rgba(8, 20, 40, 0.94)",
      borderColor: "rgba(0, 242, 255, 0.4)",
      borderWidth: 1
    }
  },
  scales: {
    y: {
      grid: { color: "#1e293b" },
      ticks: { color: "#64748b" }
    },
    x: {
      grid: { color: "#1e293b" },
      ticks: { color: "#94a3b8" }
    }
  }
};
