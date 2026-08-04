import type { MetricTone, IconKey, ChartDataSet } from "@/types/dashboard";

export interface VirtualKpiMetric {
  label: string;
  value: number;
  unit: string;
  trend?: number;
  isQuantity?: boolean;
  tone?: MetricTone;
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
      { label: "当前库存", value: 452.3, unit: "亿元", trend: 12.5 }
    ]
  },
  {
    id: "v9100",
    title: "项目直发现场虚拟库(9100)",
    metrics: [
      { label: "当前库存", value: 125.8, unit: "亿元", trend: -3.2 }
    ]
  },
  {
    id: "v9300",
    title: "物资借用虚拟库(9300)",
    metrics: [
      { label: "当前库存", value: 85.4, unit: "亿元", trend: 5.1 }
    ]
  },
  {
    id: "v9400",
    title: "中转虚拟库(9400)",
    metrics: [
      { label: "当前库存", value: 142.1, unit: "亿元", trend: 8.4 }
    ]
  },
  {
    id: "v9500",
    title: "非项目直发虚拟库(9500)",
    metrics: [
      { label: "当前库存", value: 99.0, unit: "亿元", trend: -1.5 }
    ]
  },
  {
    id: "v9700",
    title: "废旧物资现场虚拟库(9700)",
    metrics: [
      { label: "当前库存", value: 12450, unit: "条", isQuantity: true }
    ]
  },
  {
    id: "v9800",
    title: "废旧物资拆解暂存库(9800)",
    metrics: [
      { label: "当前库存", value: 8530, unit: "条", isQuantity: true }
    ]
  },
  {
    id: "alert",
    title: "预警情况",
    metrics: [
      { label: "9100库/超14天", value: 15.6, unit: "亿元", tone: "amber" },
      { label: "9500库/超14天", value: 8.4, unit: "亿元", tone: "amber" },
      { label: "9300库/超180天", value: 12.3, unit: "亿元", tone: "amber" }
    ]
  }
];

// Area 1: 9100库存超14天按地市/业务单位分布情况
export const over14DaysDistributionChart: ChartDataSet = {
  unit: "亿元",
  labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"],
  datasets: [
    { label: "库存金额", data: [4.2, 3.5, 2.1, 0, 1.2, 0.8, 1.5, 1.1, 0, 0.6, 0.3, 0.2, 0, 0.1], tone: "cyan", type: "line" }
  ]
};

export const over14DaysDistributionPanel: ChartPanelData = {
  id: "v9100-over14",
  title: "9100库存超14天按地市/业务单位分布情况",
  type: "line",
  chart: over14DaysDistributionChart,
  className: "h-full",
  tabs: [
    { id: "city", label: "各地市", active: true, href: "#" },
    { id: "unit", label: "各业务单位", active: false, href: "#" }
  ]
};

// Area 2: 9100库存按地市/业务单位分布情况
export const cityDistributionChart: ChartDataSet = {
  unit: "万元",
  secondaryUnit: "条",
  labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"],
  datasets: [
    { label: "一步收发", data: [210, 260, 160, 140, 190, 130, 180, 155, 120, 145, 110, 135, 125, 115], tone: "cyan", type: "bar" },
    { label: "一步退利", data: [210, 260, 170, 150, 200, 140, 190, 165, 130, 155, 120, 145, 135, 125], tone: "amber", type: "bar" },
    { label: "其他", data: [50, 65, 40, 35, 45, 30, 45, 38, 28, 35, 25, 32, 30, 28], tone: "cyan", type: "bar" },
    { label: "条目", data: [420, 520, 330, 290, 390, 260, 360, 310, 240, 290, 220, 270, 250, 230], tone: "amber", type: "line", yAxisID: "y1" }
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
  title: "9100库存按地市/业务单位分布情况",
  type: "bar",
  stacked: true,
  chart: cityDistributionChart,
  className: "h-full",
  tabs: [
    { id: "city", label: "各地市", active: true, href: "#" },
    { id: "unit", label: "各业务单位", active: false, href: "#" }
  ]
};

// Area 3-2: 9500库存超14天按地市/业务单位分布情况
export const over14Days9500DistributionChart: ChartDataSet = {
  unit: "亿元",
  labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"],
  datasets: [
    { label: "库存金额", data: [2.2, 1.8, 1.1, 0, 0.7, 0.5, 0.8, 0.6, 0, 0.3, 0.2, 0.1, 0, 0.1], tone: "cyan", type: "line" }
  ]
};

export const over14Days9500DistributionPanel: ChartPanelData = {
  id: "v9500-over14",
  title: "9500库存超14天按地市/业务单位分布情况",
  type: "line",
  chart: over14Days9500DistributionChart,
  className: "h-full",
  tabs: [
    { id: "city", label: "各地市", active: true, href: "#" },
    { id: "unit", label: "各业务单位", active: false, href: "#" }
  ]
};

// Area 3-3: 9500库存按地市/业务单位分布情况
export const city9500V2DistributionChart: ChartDataSet = {
  unit: "万元",
  secondaryUnit: "条",
  labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"],
  datasets: [
    { label: "一步收发", data: [160, 200, 120, 110, 150, 100, 140, 120, 90, 110, 80, 100, 95, 85], tone: "cyan", type: "bar" },
    { label: "其他", data: [40, 50, 30, 25, 35, 20, 35, 30, 20, 28, 20, 25, 22, 20], tone: "cyan", type: "bar" },
    { label: "条目", data: [320, 400, 240, 210, 300, 190, 270, 230, 180, 215, 160, 200, 185, 170], tone: "amber", type: "line", yAxisID: "y1" }
  ]
};

export const city9500V2DistributionPanel: ChartPanelData = {
  id: "v9500-v2-city",
  title: "9500库存按地市/业务单位分布情况",
  type: "bar",
  stacked: true,
  chart: city9500V2DistributionChart,
  className: "h-full",
  tabs: [
    { id: "city", label: "各地市", active: true, href: "#" },
    { id: "unit", label: "各业务单位", active: false, href: "#" }
  ]
};

export const dataChange9500V2Records: DataChangeRecord[] = [
  { id: "1", type: "add", count: 10, city: "沈阳", dataType: "一步收发", amount: 35.2, reason: "用户锁定" },
  { id: "3", type: "clear", count: 12, city: "抚顺", dataType: "一步收发", amount: 48.4, reason: "业务办理完成" }
];

// Area 4: 9300库存按地市/业务单位分布情况
export const city9300DistributionChart: ChartDataSet = {
  unit: "万元",
  secondaryUnit: "条",
  labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"],
  datasets: [
    { label: "实物储备", data: [190, 230, 155, 130, 170, 110, 210, 155, 130, 170, 120, 150, 140, 130], tone: "cyan", type: "bar" },
    { label: "电商采购", data: [110, 135, 75, 63, 100, 58, 125, 85, 63, 100, 75, 95, 85, 75], tone: "amber", type: "bar" },
    { label: "条目", data: [300, 365, 230, 193, 270, 168, 335, 240, 193, 270, 195, 245, 225, 205], tone: "amber", type: "line", yAxisID: "y1" }
  ]
};

export const city9300DistributionPanel: ChartPanelData = {
  id: "v9300-city",
  title: "9300库存按地市/业务单位分布情况",
  type: "bar",
  stacked: true,
  chart: city9300DistributionChart,
  className: "h-full",
  tabs: [
    { id: "city", label: "各地市", active: true, href: "#" },
    { id: "unit", label: "各业务单位", active: false, href: "#" }
  ]
};

// Area 5: 9300物资借用超180天按地市/业务单位分布情况
export const borrowedOver180DaysChart: ChartDataSet = {
  unit: "亿元",
  labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"],
  datasets: [
    { label: "181天-360天库存金额", data: [2.5, 2.0, 1.2, 0, 0.8, 0.6, 0.9, 0.5, 0, 0.3, 0, 0, 0, 0], tone: "cyan", type: "line" },
    { label: "361天以上库存金额", data: [1.0, 0.8, 0.5, 0, 0.3, 0.2, 0.4, 0.2, 0, 0.1, 0, 0, 0, 0], tone: "amber", type: "line" }
  ]
};

export const borrowedOver180DaysPanel: ChartPanelData = {
  id: "v9300-borrowed",
  title: "9300物资借用超180天按地市/业务单位分布情况",
  type: "line",
  chart: borrowedOver180DaysChart,
  className: "h-full",
  tabs: [
    { id: "city", label: "各地市", active: true, href: "#" },
    { id: "unit", label: "各业务单位", active: false, href: "#" }
  ]
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

// Area 7: 9400库存按地市/业务单位分布情况
export const city9400DistributionChart: ChartDataSet = {
  unit: "万元",
  secondaryUnit: "条",
  labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"],
  datasets: [
    { label: "库存金额", data: [320, 450, 210, 180, 260, 150, 280, 190, 140, 170, 130, 160, 145, 125], tone: "cyan", type: "bar" },
    { label: "条目", data: [45, 62, 30, 25, 38, 22, 40, 28, 20, 25, 18, 22, 20, 18], tone: "amber", type: "line", yAxisID: "y1" }
  ]
};

export const city9400DistributionPanel: ChartPanelData = {
  id: "v9400-city",
  title: "9400库存按地市/业务单位分布情况",
  type: "bar",
  stacked: false,
  chart: city9400DistributionChart,
  className: "h-full",
  tabs: [
    { id: "city", label: "各地市", active: true, href: "#" },
    { id: "unit", label: "各业务单位", active: false, href: "#" }
  ]
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
  labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"],
  datasets: [
    { label: "总金额", data: [210, 310, 150, 120, 180, 90, 160, 110, 80, 95, 75, 90, 85, 75], tone: "cyan", type: "bar" },
    { label: "条目数", data: [35, 48, 22, 18, 28, 15, 25, 18, 12, 15, 12, 14, 13, 12], tone: "amber", type: "line", yAxisID: "y1" }
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

// Area 11: 9700库存按地市/业务单位分布情况
export const city9700DistributionChart: ChartDataSet = {
  unit: "条",
  labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"],
  datasets: [
    { label: "条目", data: [1250, 1840, 950, 820, 1100, 680, 1420, 890, 750, 920, 680, 840, 790, 710], tone: "amber", type: "line" }
  ]
};

export const city9700DistributionPanel: ChartPanelData = {
  id: "v9700-city",
  title: "9700库存按地市/业务单位分布情况",
  type: "line",
  stacked: false,
  chart: city9700DistributionChart,
  className: "h-full",
  tabs: [
    { id: "city", label: "各地市", active: true, href: "#" },
    { id: "unit", label: "各业务单位", active: false, href: "#" }
  ]
};

// Area 12: 9700数据增减情况
export const dataChange9700Records: DataChange9300Record[] = [
  { id: "1", type: "add", text: "本周废旧物资现场虚拟库新增 156 条废旧物资入库登记。" },
  { id: "2", type: "reduce", text: "本周完成 85 条废旧物资拍卖移交出库。" }
];

// Area 13: 9800库存按地市/业务单位分布情况
export const city9800DistributionChart: ChartDataSet = {
  unit: "条",
  labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭", "朝阳", "葫芦岛"],
  datasets: [
    { label: "条目", data: [850, 1200, 620, 540, 780, 420, 960, 590, 480, 560, 420, 510, 490, 450], tone: "amber", type: "line" }
  ]
};

export const city9800DistributionPanel: ChartPanelData = {
  id: "v9800-city",
  title: "9800库存按地市/业务单位分布情况",
  type: "line",
  stacked: false,
  chart: city9800DistributionChart,
  className: "h-full",
  tabs: [
    { id: "city", label: "各地市", active: true, href: "#" },
    { id: "unit", label: "各业务单位", active: false, href: "#" }
  ]
};

// Area 14: 9800数据增减情况
export const dataChange9800Records: DataChange9300Record[] = [
  { id: "1", type: "add", text: "本周废旧拆解暂存库接收拆解件 42 条入库。" },
  { id: "2", type: "reduce", text: "本周完成拆解物料分类出库 28 条。" }
];

