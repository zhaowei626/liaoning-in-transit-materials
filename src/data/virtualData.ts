import type { MetricTone, IconKey, ChartDataSet } from "@/types/dashboard";

export interface VirtualKpiMetric {
  label: string;
  value: number;
  unit: string;
  trend?: number;
  isQuantity?: boolean;
}

export interface VirtualKpiData {
  id: string;
  title: string;
  icon?: IconKey;
  metrics: VirtualKpiMetric[];
}

export const virtualKpis: VirtualKpiData[] = [
  {
    id: "overall",
    title: "虚拟库整体情况",
    metrics: [
      { label: "当前库存金额", value: 452.3, unit: "亿元", trend: 12.5 }
    ]
  },
  {
    id: "v9100",
    title: "项目直发现场虚拟库(9100)",
    metrics: [
      { label: "当前库存金额", value: 125.8, unit: "亿元", trend: -3.2 }
    ]
  },
  {
    id: "v9300",
    title: "物资借用虚拟库(9300)",
    metrics: [
      { label: "当前库存金额", value: 85.4, unit: "亿元", trend: 5.1 },
      { label: "借用超180天库存", value: 12.3, unit: "亿元", trend: 0.8 }
    ]
  },
  {
    id: "v9400",
    title: "中转虚拟库(9400)",
    metrics: [
      { label: "当前库存金额", value: 142.1, unit: "亿元", trend: 8.4 }
    ]
  },
  {
    id: "v9500",
    title: "非项目直发虚拟库(9500)",
    metrics: [
      { label: "当前库存金额", value: 99.0, unit: "亿元", trend: -1.5 }
    ]
  },
  {
    id: "v9700",
    title: "废旧物资现场虚拟库(9700)",
    metrics: [
      { label: "当前库存物资条目", value: 12450, unit: "条", isQuantity: true }
    ]
  },
  {
    id: "v9800",
    title: "废旧物资拆解暂存库(9800)",
    metrics: [
      { label: "当前库存物资条目", value: 8530, unit: "条", isQuantity: true }
    ]
  }
];

// Area 1: 9100库存按积压原因分布情况
export interface ReasonDistributionData {
  label: string;
  value: number;
  count: number;
  color: string;
}

export const reasonDistribution: ReasonDistributionData[] = [
  { label: "一步收发-用户锁定", value: 35.4, count: 120, color: "#00f2ff" },
  { label: "一步收发-财务字段为空", value: 28.2, count: 95, color: "#00b6ff" },
  { label: "一步退利-用户锁定", value: 42.1, count: 145, color: "#ffbf00" },
  { label: "一步退利-财务字段为空", value: 20.1, count: 68, color: "#ff9500" }
];

// Area 2: 9100库存按地市单位分布情况
export const cityDistributionChart: ChartDataSet = {
  unit: "万元",
  labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪"],
  datasets: [
    { label: "一步收发-用户锁定", data: [120, 150, 90, 80, 110], tone: "cyan", type: "bar" },
    { label: "一步收发-财务字段为空", data: [90, 110, 70, 60, 80], tone: "cyan", type: "bar" },
    { label: "一步退利-用户锁定", data: [150, 180, 120, 110, 140], tone: "amber", type: "bar" },
    { label: "一步退利-财务字段为空", data: [60, 80, 50, 40, 60], tone: "amber", type: "bar" },
    { label: "条目数", data: [420, 520, 330, 290, 390], tone: "amber", type: "line", yAxisID: "y1" }
  ]
};

// Area 3: 9100数据增减情况
export interface DataChangeRecord {
  id: string;
  type: "add" | "clear"; // 增加数据 / 减少数据
  count: number;
  city: string;
  dataType: "一步收发" | "一步退利";
  amount: number;
  reason: string;
}

import type { ChartPanelData } from "@/types/dashboard";

export const cityDistributionPanel: ChartPanelData = {
  id: "v9100-city",
  title: "9100库存按地市单位分布情况",
  type: "bar",
  stacked: true,
  chart: cityDistributionChart,
  className: "h-full"
};

// Area 4: 9300库存按地市单位分布情况
export const city9300DistributionChart: ChartDataSet = {
  unit: "万元",
  labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳"],
  datasets: [
    { label: "实物储备-滞留>90天-物资未立项", data: [40, 50, 30, 25, 35, 20, 45, 30, 25, 35], tone: "cyan", type: "bar" },
    { label: "实物储备-滞留>90天-物资已立项未发货", data: [35, 45, 25, 20, 30, 15, 40, 25, 20, 30], tone: "cyan", type: "bar" },
    { label: "实物储备-滞留<90天-物资未立项", data: [55, 65, 45, 40, 50, 35, 60, 45, 40, 50], tone: "cyan", type: "bar" },
    { label: "实物储备-滞留<90天-物资已立项未发货", data: [60, 70, 50, 45, 55, 40, 65, 50, 45, 55], tone: "cyan", type: "bar" },
    
    { label: "电商采购-滞留>90天-物资未立项", data: [20, 25, 15, 10, 20, 10, 25, 15, 10, 20], tone: "amber", type: "bar" },
    { label: "电商采购-滞留>90天-物资已立项未发货", data: [15, 20, 10, 8, 15, 8, 20, 10, 8, 15], tone: "amber", type: "bar" },
    { label: "电商采购-滞留<90天-物资未立项", data: [30, 35, 20, 15, 25, 15, 30, 20, 15, 25], tone: "amber", type: "bar" },
    { label: "电商采购-滞留<90天-物资已立项未发货", data: [45, 55, 35, 30, 40, 25, 50, 35, 30, 40], tone: "amber", type: "bar" },
    
    { label: "条目数", data: [300, 365, 230, 193, 270, 168, 335, 230, 193, 270], tone: "amber", type: "line", yAxisID: "y1" }
  ]
};

export const city9300DistributionPanel: ChartPanelData = {
  id: "v9300-city",
  title: "9300库存按地市单位分布情况",
  type: "bar",
  stacked: true,
  chart: city9300DistributionChart,
  className: "h-full"
};

// Area 5: 9300物资借用超90天按地市单位分布情况
export const borrowedOver90DaysChart: ChartDataSet = {
  unit: "万元",
  labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳"],
  datasets: [
    { label: "90天-180天", data: [120, 140, 80, 60, 90, 50, 110, 75, 65, 85], tone: "cyan", type: "bar" },
    { label: "181天-360天", data: [80, 100, 50, 40, 60, 30, 70, 45, 35, 55], tone: "amber", type: "bar" },
    { label: "360天以上", data: [40, 50, 20, 15, 30, 10, 35, 20, 15, 25], tone: "amber", type: "bar" },
    
    { label: "条目数", data: [240, 290, 150, 115, 180, 90, 215, 140, 115, 165], tone: "amber", type: "line", yAxisID: "y1" }
  ]
};

export const borrowedOver90DaysPanel: ChartPanelData = {
  id: "v9300-borrowed",
  title: "9300物资借用超90天按地市单位分布情况",
  type: "bar",
  stacked: false, // 多组柱形图（非堆叠）
  chart: borrowedOver90DaysChart,
  className: "h-full"
};

export const dataChangeRecords: DataChangeRecord[] = [
  { id: "1", type: "add", count: 12, city: "沈阳", dataType: "一步收发", amount: 45.2, reason: "用户锁定" },
  { id: "2", type: "add", count: 8, city: "大连", dataType: "一步退利", amount: 32.1, reason: "财务字段为空" },
  { id: "3", type: "add", count: 5, city: "鞍山", dataType: "一步收发", amount: 18.5, reason: "用户锁定" },
  { id: "4", type: "clear", count: 15, city: "抚顺", dataType: "一步收发", amount: 62.4, reason: "业务办理完成" },
  { id: "5", type: "clear", count: 7, city: "本溪", dataType: "一步退利", amount: 28.9, reason: "财务字段补充" },
  { id: "6", type: "clear", count: 9, city: "丹东", dataType: "一步收发", amount: 35.6, reason: "用户解锁" }
];

// Area 6: 9300数据增减情况
export interface DataChange9300Record {
  id: string;
  type: "add" | "reduce";
  text: string;
}

export const dataChange9300Records: DataChange9300Record[] = [
  { id: "1", type: "add", text: "本周实物储备批次物资增加1016.90万元。" },
  { id: "2", type: "reduce", text: "本周实物储备借用完成结算1185.87万元。" }
];

// Area 7: 9400库存按地市单位分布情况
export const city9400DistributionChart: ChartDataSet = {
  unit: "万元",
  labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东"],
  datasets: [
    { label: "总金额", data: [320, 450, 210, 180, 260, 150], tone: "cyan", type: "bar" },
    { label: "条目数", data: [45, 62, 30, 25, 38, 22], tone: "amber", type: "line", yAxisID: "y1" }
  ]
};

export const city9400DistributionPanel: ChartPanelData = {
  id: "v9400-city",
  title: "9400库存按地市单位分布情况",
  type: "bar",
  stacked: false,
  chart: city9400DistributionChart,
  className: "h-full"
};

// Area 8: 9400数据增减情况
export const dataChange9400Records: DataChange9300Record[] = [
  { id: "1", type: "add", text: "本周中转虚拟库物资入库增加 125.40 万元。" },
  { id: "2", type: "reduce", text: "本周中转虚拟库物资领用出库 86.20 万元。" },
  { id: "3", type: "reduce", text: "本周中转虚拟库报废清理 12.50 万元。" }
];

// Area 9: 9500库存按地市单位分布情况
export const city9500DistributionChart: ChartDataSet = {
  unit: "万元",
  labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东"],
  datasets: [
    { label: "总金额", data: [210, 310, 150, 120, 180, 90], tone: "cyan", type: "bar" },
    { label: "条目数", data: [35, 48, 22, 18, 28, 15], tone: "amber", type: "line", yAxisID: "y1" }
  ]
};

export const city9500DistributionPanel: ChartPanelData = {
  id: "v9500-city",
  title: "9500库存按地市单位分布情况",
  type: "bar",
  stacked: false,
  chart: city9500DistributionChart,
  className: "h-full"
};

// Area 10: 9500数据增减情况
export const dataChange9500Records: DataChange9300Record[] = [
  { id: "1", type: "add", text: "本周非项目直发虚拟库盘盈增加 45.10 万元。" },
  { id: "2", type: "reduce", text: "本周非项目直发虚拟库领用出库 112.50 万元。" }
];

// Area 11: 9700库存按地市单位分布情况
export const city9700DistributionChart: ChartDataSet = {
  unit: "条",
  labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口"],
  datasets: [
    { label: "条目数", data: [1250, 1840, 950, 820, 1100, 680, 1420, 890], tone: "cyan", type: "bar" }
  ]
};

export const city9700DistributionPanel: ChartPanelData = {
  id: "v9700-city",
  title: "9700库存按地市单位分布情况",
  type: "bar",
  stacked: false,
  chart: city9700DistributionChart,
  className: "h-full"
};

// Area 12: 9700数据增减情况
export const dataChange9700Records: DataChange9300Record[] = [
  { id: "1", type: "add", text: "本周废旧物资现场虚拟库新增 156 条废旧物资入库登记。" },
  { id: "2", type: "reduce", text: "本周完成 85 条废旧物资拍卖移交出库。" }
];

// Area 13: 9800库存按地市单位分布情况
export const city9800DistributionChart: ChartDataSet = {
  unit: "条",
  labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口"],
  datasets: [
    { label: "条目数", data: [850, 1200, 620, 540, 780, 420, 960, 590], tone: "cyan", type: "bar" }
  ]
};

export const city9800DistributionPanel: ChartPanelData = {
  id: "v9800-city",
  title: "9800库存按地市单位分布情况",
  type: "bar",
  stacked: false,
  chart: city9800DistributionChart,
  className: "h-full"
};

// Area 14: 9800数据增减情况
export const dataChange9800Records: DataChange9300Record[] = [
  { id: "1", type: "add", text: "本周废旧拆解暂存库接收拆解件 42 条入库。" },
  { id: "2", type: "reduce", text: "本周完成拆解物料分类出库 28 条。" }
];

