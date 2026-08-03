import type {
  ChartPanelData,
  DateRangeFilter,
  NavigationItem,
  OrderTypeFilter,
  StatCardData,
  UnitFilter
} from "@/types/dashboard";

export const dashboardTitle = "\"五库一仓\" 资源全景可视化";

export const leftNavigation: NavigationItem[] = [
  { id: "home", label: "首页", href: "/", active: false },
  { id: "transit", label: "在途物资库", href: "/transit", active: false },
  { id: "material", label: "物资库", href: "/materials", active: false },
  { id: "virtual", label: "虚拟库", href: "/virtual", active: false }
];

export const rightNavigation: NavigationItem[] = [
  { id: "site", label: "项目现场库", href: "/site", active: false },
  { id: "station", label: "综合材料站", href: "/station", active: false },
  { id: "special", label: "专业仓", href: "/special", active: false }
];

const currentYear = new Date().getFullYear();

export const initialDateFilters: DateRangeFilter[] = [
  { id: "contract", label: "合同生效时间范围", start: `${currentYear}-01-01`, end: `${currentYear}-12-31` },
  { id: "confirmed", label: "确认交货期范围", start: "", end: "" }
];

export const initialOrderTypes: OrderTypeFilter[] = [
  { id: "all", label: "全部" },
  { id: "batch", label: "批次订单" },
  { id: "ecommerce", label: "电商订单" }
];

export const initialSelectedOrderType: OrderTypeFilter["id"] = "all";

export const unitFilters: UnitFilter[] = [
  { id: "all", label: "全部" },
  { id: "shenyang", label: "沈阳" },
  { id: "dalian", label: "大连" },
  { id: "anshan", label: "鞍山" },
  { id: "fushun", label: "抚顺" },
  { id: "materials-company", label: "物资公司" },
  { id: "xintong-company", label: "信通公司" }
];

export const initialSelectedUnit: UnitFilter["id"] = "all";

export const queryActions = {
  search: "查询",
  reset: "重置"
};

export const cityRoutes = [
  { name: "沈阳", slug: "shenyang" },
  { name: "大连", slug: "dalian" },
  { name: "鞍山", slug: "anshan" },
  { name: "抚顺", slug: "fushun" },
  { name: "本溪", slug: "benxi" },
  { name: "丹东", slug: "dandong" },
  { name: "锦州", slug: "jinzhou" },
  { name: "营口", slug: "yingkou" },
  { name: "阜新", slug: "fuxin" },
  { name: "辽阳", slug: "liaoyang" },
  { name: "盘锦", slug: "panjin" },
  { name: "铁岭", slug: "tieling" }
];

export const cityNames = cityRoutes.map((city) => city.name);

const cityLabelLinks = cityNames.reduce<Record<string, string>>((links, cityName) => {
  const cityRoute = cityRoutes.find((city) => city.name === cityName);
  links[cityName] = `/cities/${cityRoute?.slug ?? encodeURIComponent(cityName)}`;
  return links;
}, {});

export const statCards: StatCardData[] = [
  {
    id: "annual-generation",
    title: "物资订单生成情况",
    layout: "donut",
    metrics: [
      { id: "batch-count", label: "批次订单", value: "3,961", unit: "条", tone: "cyan", icon: "fileStack" },
      { id: "batch-amount", label: "批次订单金额", value: "23.43", unit: "亿", tone: "amber", icon: "coins" },
      { id: "ecommerce-count", label: "电商订单", value: "6,596", unit: "条", tone: "cyan", icon: "shopping" },
      { id: "ecommerce-amount", label: "电商订单金额", value: "16.81", unit: "亿", tone: "amber", icon: "coins" }
    ]
  },
  {
    id: "delivery-confirmation",
    title: "物资订单在途情况",
    layout: "donut",
    metrics: [
      { id: "transit-batch-count", label: "批次订单", value: "2,674", unit: "条", tone: "cyan", icon: "shieldCheck" },
      { id: "transit-batch-amount", label: "批次订单金额", value: "15.95", unit: "亿", tone: "amber", icon: "coins" },
      { id: "transit-ecommerce-count", label: "电商订单", value: "4,009", unit: "条", tone: "cyan", icon: "warehouse" },
      { id: "transit-ecommerce-amount", label: "电商订单金额", value: "6.47", unit: "亿", tone: "amber", icon: "coins" }
    ]
  },
  {
    id: "dispatched",
    title: "批次订单在途情况分布",
    layout: "horizontal-bar",
    metrics: [
      { id: "unconfirmed", label: "未确认交货期", value: "2.15", unit: "亿", subValue: "360", subUnit: "条", tone: "cyan", icon: "fileStack" },
      { id: "undispatched", label: "已确认交货期但未发货", value: "5.30", unit: "亿", subValue: "888", subUnit: "条", tone: "cyan", icon: "packageBox" },
      { id: "dispatched-transit", label: "已发货", value: "8.50", unit: "亿", subValue: "1,426", subUnit: "条", tone: "cyan", icon: "truck" }
    ]
  },
  {
    id: "receipt",
    title: "物资订单收货情况",
    layout: "donut",
    metrics: [
      { id: "receipt-batch-count", label: "批次订单", value: "1,287", unit: "条", tone: "cyan", icon: "packageBox" },
      { id: "receipt-batch-amount", label: "批次订单金额", value: "7.48", unit: "亿", tone: "amber", icon: "coins" },
      { id: "receipt-ecommerce-count", label: "电商订单", value: "2,587", unit: "条", tone: "cyan", icon: "warehouse" },
      { id: "receipt-ecommerce-amount", label: "电商订单金额", value: "10.34", unit: "亿", tone: "amber", icon: "coins" }
    ]
  }
];

export const chartPanels: ChartPanelData[] = [
  {
    id: "unit-status",
    title: "按地市/业务单位分布情况",
    type: "bar",
    span: "half",
    stacked: true,
    tabs: [
      { id: "city", label: "各地市", href: "/", active: true },
      { id: "business", label: "各业务单位", href: "/", active: false }
    ],
    chart: {
      unit: "万元",
      labels: cityNames,
      labelLinks: cityLabelLinks,
      datasets: [
        { label: "在途金额", data: [320, 540, 380, 570, 380, 550, 280, 400, 560, 520, 510, 620], tone: "cyan" },
        { label: "到货金额", data: [320, 540, 380, 570, 150, 550, 280, 400, 180, 260, 200, 300], tone: "amber" },
        { label: "省公司平均在途率", data: [57.7, 57.7, 57.7, 57.7, 57.7, 57.7, 57.7, 57.7, 57.7, 57.7, 57.7, 57.7], tone: "amber", type: "line", yAxisID: "y1" },
        { label: "各地市在途率", data: [50.0, 50.0, 50.0, 50.0, 71.7, 50.0, 50.0, 50.0, 75.7, 66.7, 71.8, 67.4], tone: "cyan", type: "line", yAxisID: "y1" }
      ]
    }
  },
  {
    id: "engineering-type",
    title: "按物资类型分布情况",
    type: "bar",
    span: "half",
    stacked: true,
    chart: {
      unit: "万元",
      labels: ["主网工程", "配网工程", "实物储备", "非项目成本类", "营销工程", "调控和信通工程", "技改和大修工程", "固定资产零购/综合服务等", "电商"],
      datasets: [
        { label: "在途金额", data: [300, 270, 150, 100, 120, 190, 300, 80, 200], tone: "cyan" },
        { label: "到货金额", data: [320, 390, 540, 150, 180, 280, 550, 120, 350], tone: "amber" }
      ]
    }
  },
  {
    id: "key-material",
    title: "按重点物资分布情况",
    type: "bar",
    span: "half",
    stacked: true,
    tabs: [
      { id: "main-grid", label: "主网", href: "/", active: true },
      { id: "distribution-grid", label: "配网", href: "/", active: false }
    ],
    chart: {
      unit: "万元",
      labels: ["交流变压器", "组合电器", "导、地线", "铁塔", "电抗器", "电缆", "隔离开关", "绝缘子"],
      datasets: [
        { label: "未确认交货期金额", data: [80, 100, 60, 90, 50, 80, 40, 70], tone: "cyan" },
        { label: "已确认交货期但未发货金额", data: [120, 90, 100, 110, 80, 120, 90, 100], tone: "cyan" },
        { label: "已发货金额", data: [100, 80, 70, 60, 90, 110, 80, 90], tone: "cyan" },
        { label: "到货金额", data: [400, 550, 320, 580, 250, 400, 280, 310], tone: "amber" }
      ]
    }
  },
  {
    id: "long-term-unexecuted",
    title: "长期未执行合同按地市/业务单位分布情况",
    type: "bar",
    span: "half",
    summary: [
      { label: "总金额", value: "24.50", unit: "亿" },
      { label: "总条目", value: "3,480", unit: "条" }
    ],
    tabs: [
      { id: "city-long-term", label: "各地市", href: "/", active: true },
      { id: "business-long-term", label: "各业务单位", href: "/", active: false }
    ],
    chart: {
      unit: "万元 / 条",
      labels: cityNames,
      labelLinks: cityLabelLinks,
      datasets: [
        { label: "金额", data: [120, 150, 90, 80, 60, 110, 130, 85, 75, 95, 65, 105], tone: "cyan" },
        { label: "条目", data: [25, 30, 18, 15, 12, 22, 26, 17, 14, 19, 13, 21], tone: "amber", type: "line", yAxisID: "y1" }
      ]
    }
  }
];

const cityScopedPanelIds = new Set(["unit-status", "long-term-unexecuted"]);

function parseMetricValue(value: string) {
  return Number(value.replace(/,/g, ""));
}

function formatScaledValue(value: number, unit: string) {
  if (unit === "条") {
    return Math.max(0, Math.round(value)).toLocaleString("en-US");
  }

  if (unit === "亿") {
    return value.toFixed(2);
  }

  return `${Math.max(0, Math.round(value))}`;
}

function getCityWeight(cityIndex: number) {
  const unitStatusPanel = chartPanels.find((panel) => panel.id === "unit-status");
  const cityTotals = unitStatusPanel?.chart.labels.map((_, labelIndex) => (
    unitStatusPanel.chart.datasets
      .filter((dataset) => dataset.type !== "line")
      .reduce((total, dataset) => total + (dataset.data[labelIndex] ?? 0), 0)
  )) ?? [];
  const provinceTotal = cityTotals.reduce((total, value) => total + value, 0);

  if (!provinceTotal) {
    return 0;
  }

  return (cityTotals[cityIndex] ?? 0) / provinceTotal;
}

function createCityStatCards(cityIndex: number): StatCardData[] {
  const cityWeight = getCityWeight(cityIndex);

  return statCards.map((card) => ({
    ...card,
    metrics: card.metrics.map((metric) => ({
      ...metric,
      value: formatScaledValue(parseMetricValue(metric.value) * cityWeight, metric.unit),
      subValue: metric.subValue
        ? formatScaledValue(parseMetricValue(metric.subValue) * cityWeight, metric.subUnit ?? metric.unit)
        : metric.subValue
    }))
  }));
}

function scaleChartValue(value: number, unit?: string) {
  if (unit?.includes("万元") || unit?.includes("条")) {
    return Math.max(0, Math.round(value));
  }

  return Number(value.toFixed(2));
}

function createScaledCityPanel(panel: ChartPanelData, cityIndex: number): ChartPanelData {
  const cityWeight = getCityWeight(cityIndex);
  const { labelLinks: _labelLinks, ...chartWithoutLinks } = panel.chart;

  return {
    ...panel,
    chart: {
      ...chartWithoutLinks,
      datasets: panel.chart.datasets.map((dataset) => ({
        ...dataset,
        data: dataset.data.map((value) => scaleChartValue(value * cityWeight, panel.chart.unit))
      }))
    }
  };
}

function getPanelDatasetValue(panel: ChartPanelData, datasetLabel: string, cityIndex: number) {
  return panel.chart.datasets.find((dataset) => dataset.label === datasetLabel)?.data[cityIndex] ?? 0;
}

function createUnitStatusMetricCards(panel: ChartPanelData, cityIndex: number) {
  return [
    {
      id: "city-transit-rate",
      label: "本市在途率",
      value: getPanelDatasetValue(panel, "各地市在途率", cityIndex).toFixed(1),
      unit: "%",
      tone: "cyan" as const
    },
    {
      id: "province-average-transit-rate",
      label: "全省平均在途率",
      value: getPanelDatasetValue(panel, "省公司平均在途率", cityIndex).toFixed(1),
      unit: "%",
      tone: "amber" as const
    }
  ];
}

function createLongTermMetricCards(panel: ChartPanelData, cityIndex: number) {
  return [
    {
      id: "long-term-contract-amount",
      label: "合同金额",
      value: `${getPanelDatasetValue(panel, "金额", cityIndex)}`,
      unit: "万元",
      tone: "cyan" as const
    },
    {
      id: "long-term-contract-count",
      label: "合同条目",
      value: `${getPanelDatasetValue(panel, "条目", cityIndex)}`,
      unit: "条",
      tone: "amber" as const
    }
  ];
}

function createCityScopedPanel(panel: ChartPanelData, cityName: string, cityIndex: number): ChartPanelData {
  const { labelLinks: _labelLinks, ...chartWithoutLinks } = panel.chart;
  const datasets = panel.chart.datasets
    .filter((dataset) => panel.id !== "unit-status" || dataset.label !== "省公司平均在途率")
    .map((dataset) => ({
      ...dataset,
      label: dataset.label === "各地市在途率" ? `${cityName}在途率` : dataset.label,
      data: [dataset.data[cityIndex]]
    }));

  const summary = panel.id === "long-term-unexecuted" ? undefined : panel.summary;
  
  // Suppliers data for Top10
  const suppliers = panel.id === "unit-status" ? [
     { rank: 1, name: "国网供电公司第一分包商", amount: "1,240.00" },
     { rank: 2, name: "沈阳电力设备制造有限公司", amount: "1,080.00" },
     { rank: 3, name: "辽宁正泰电缆销售有限公司", amount: "950.00" },
     { rank: 4, name: "大连互感器集团有限公司", amount: "820.00" },
     { rank: 5, name: "国网物资集团华北分公司", amount: "760.00" },
     { rank: 6, name: "特变电工沈阳变压器集团", amount: "640.00" },
     { rank: 7, name: "青岛汉缆股份有限公司", amount: "520.00" },
     { rank: 8, name: "正泰电气股份有限公司", amount: "480.00" },
     { rank: 9, name: "西安西电开关电气有限公司", amount: "350.00" },
     { rank: 10, name: "山东电工电气集团有限公司", amount: "280.00" }
   ] : undefined;

  const metricCards = panel.id === "unit-status"
    ? undefined
    : panel.id === "long-term-unexecuted"
      ? undefined
      : panel.metricCards;

  const layout = panel.id === "unit-status" 
    ? "supplier-top" 
    : panel.id === "long-term-unexecuted" 
      ? "horizontal-bar" 
      : undefined;

  const className = panel.id === "unit-status" ? "min-h-[17rem]" : undefined;

  const metrics = panel.id === "long-term-unexecuted" ? [
    { id: "1-3y", label: "1年至3年", value: "820.00", unit: "万元", subValue: "120", subUnit: "条", tone: "cyan" as const, icon: "fileStack" as const },
    { id: "3-5y", label: "3年至5年", value: "450.00", unit: "万元", subValue: "85", subUnit: "条", tone: "cyan" as const, icon: "fileStack" as const },
    { id: "5y+", label: "5年以上", value: "180.00", unit: "万元", subValue: "35", subUnit: "条", tone: "cyan" as const, icon: "fileStack" as const }
  ] : undefined;

  const title = panel.id === "unit-status"
    ? "Top10供应商在途金额"
    : panel.id === "long-term-unexecuted"
      ? "长期未执行合同分布情况"
      : panel.title;

  return {
    ...panel,
    title,
    metricCards,
    summary,
    layout,
    metrics,
    suppliers,
    className,
    chart: {
      ...chartWithoutLinks,
      labels: [cityName],
      datasets
    }
  };
}

export function getCityChartPanels(cityName: string): ChartPanelData[] | null {
  const cityIndex = cityNames.indexOf(cityName);

  if (cityIndex === -1) {
    return null;
  }

  return chartPanels.map((panel) => (
    cityScopedPanelIds.has(panel.id)
      ? createCityScopedPanel(panel, cityName, cityIndex)
      : createScaledCityPanel(panel, cityIndex)
  ));
}

export function getCityDashboardData(cityName: string) {
  const cityIndex = cityNames.indexOf(cityName);

  if (cityIndex === -1) {
    return null;
  }

  return {
    cards: createCityStatCards(cityIndex),
    panels: getCityChartPanels(cityName) ?? []
  };
}

export function getCityNameByRouteParam(routeParam: string) {
  const decodedParam = decodeURIComponent(routeParam);
  const cityRoute = cityRoutes.find((city) => city.slug === decodedParam || city.name === decodedParam);

  return cityRoute?.name ?? null;
}
