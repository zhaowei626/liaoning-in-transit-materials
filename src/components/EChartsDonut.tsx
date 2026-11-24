"use client";

import { useEffect, useState, useRef } from "react";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

export interface EChartsDonutProps {
  data: { name: string; value: number; percentage: string }[];
  title?: string;
  total?: number;
}

export function EChartsDonut({ data, title = "总数", total = 0 }: EChartsDonutProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current);

    const option: EChartsOption = {
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}个 ({d}%)"
      },
      legend: {
        orient: "vertical",
        right: "5%",
        top: "middle",
        textStyle: {
          color: "#94a3b8"
        },
        itemWidth: 10,
        itemHeight: 10,
        formatter: (name: string) => {
          const item = data.find(d => d.name === name);
          return `${name}   ${item?.percentage}`;
        }
      },
      color: ["#0ea5e9", "#f59e0b", "#10b981", "#8b5cf6", "#f43f5e", "#06b6d4"],
      series: [
        {
          name: title,
          type: "pie",
          radius: ["55%", "75%"],
          center: ["35%", "50%"],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center"
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "14",
              fontWeight: "bold",
              color: "#cbd5e1",
              formatter: "{b}\n{c}"
            }
          },
          labelLine: {
            show: false
          },
          data: data
        }
      ]
    };

    chartInstance.setOption(option);

    const handleResize = () => {
      chartInstance.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.dispose();
    };
  }, [isMounted, data, title]);

  if (!isMounted) return <div className="h-full w-full flex items-center justify-center text-slate-500 text-xs">加载图表...</div>;

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-y-0 left-0 w-[70%] flex flex-col items-center justify-center pointer-events-none">
        <span className="font-display text-2xl font-bold text-cyanCore">{total}</span>
        <span className="text-xs text-inkMuted">{title}</span>
      </div>
      <div ref={chartRef} className="h-full w-full min-h-[250px]" />
    </div>
  );
}
