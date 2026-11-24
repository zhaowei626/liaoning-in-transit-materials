"use client";

import { useEffect, useState, useRef } from "react";
import * as echarts from "echarts";
import type { EChartsOption } from "echarts";

export interface EChartsHeatmapProps {
  data: { name: string; value: number }[];
}

export function EChartsHeatmap({ data }: EChartsHeatmapProps) {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !chartRef.current) return;

    let chartInstance: echarts.ECharts | null = null;

    fetch("/assets/liaoning.json")
      .then((res) => res.json())
      .then((geoJson) => {
        echarts.registerMap("liaoning", geoJson);
        chartInstance = echarts.init(chartRef.current!);

        const maxVal = Math.max(...data.map(d => d.value), 1);

        const option: EChartsOption = {
          tooltip: {
            trigger: "item",
            formatter: "{b}<br/>专业仓数量: {c}"
          },
          visualMap: {
            min: 0,
            max: maxVal,
            text: ["高", "低"],
            realtime: false,
            calculable: true,
            inRange: {
              color: ["#0a2b4e", "#1b9dd8", "#0ff"]
            },
            textStyle: {
              color: "#94a3b8"
            },
            bottom: 20,
            left: 20
          },
          series: [
            {
              name: "辽宁省专业仓分布",
              type: "map",
              map: "liaoning",
              label: {
                show: true,
                color: "#cbd5e1"
              },
              itemStyle: {
                areaColor: "#0a2b4e",
                borderColor: "#0ea5e9",
                borderWidth: 1
              },
              emphasis: {
                itemStyle: {
                  areaColor: "#0ea5e9"
                },
                label: {
                  color: "#fff"
                }
              },
              data: data
            }
          ]
        };

        chartInstance.setOption(option);
      })
      .catch((err) => console.error("Failed to load map data:", err));

    const handleResize = () => {
      chartInstance?.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance?.dispose();
    };
  }, [isMounted, data]);

  if (!isMounted) return <div className="h-full w-full flex items-center justify-center text-slate-500 text-xs">加载地图...</div>;

  return <div ref={chartRef} className="h-full w-full min-h-[400px]" />;
}
