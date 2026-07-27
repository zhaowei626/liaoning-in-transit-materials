import type {
  ChartPanelData,
  DateRangeFilter,
  NavigationItem,
  OrderTypeFilter,
  StatCardData
} from "@/types/dashboard";

export const dashboardTitle = "\"五库一仓\" 资源全景可视化";

export const leftNavigation: NavigationItem[] = [
  { id: "home", label: "首页", href: "/", active: false },
  { id: "transit", label: "在途物资库", href: "/", active: true },
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
  { id: "confirmed", label: "确认交货期范围", start: "", end: "" },
  { id: "actual", label: "实际交货期范围", start: "", end: "" }
];

export const initialOrderTypes: OrderTypeFilter[] = [
  { id: "batch", label: "批次订单", checked: true },
  { id: "ecommerce", label: "电商订单", checked: true }
];

export const queryActions = {
  search: "查询",
  reset: "重置"
};

export const statCards: StatCardData[] = [
  {
    id: "annual-generation",
    title: "年度订单生成情况",
    layout: "donut",
    metrics: [
      { id: "batch-count", label: "批次订单", value: "3961", unit: "条", tone: "cyan", icon: "fileStack" },
      { id: "batch-amount", label: "批次订单金额", value: "23.43", unit: "亿", tone: "amber", icon: "coins" },
      { id: "ecommerce-count", label: "电商订单", value: "6596", unit: "条", tone: "cyan", icon: "shopping" },
      { id: "ecommerce-amount", label: "电商订单金额", value: "16.81", unit: "亿", tone: "amber", icon: "coins" }
    ]
  },
  {
    id: "receipt",
    title: "年度订单收货情况",
    layout: "donut",
    metrics: [
      { id: "receipt-batch-count", label: "批次订单", value: "1287", unit: "条", tone: "cyan", icon: "packageBox" },
      { id: "receipt-batch-amount", label: "批次订单金额", value: "7.48", unit: "亿", tone: "amber", icon: "coins" },
      { id: "receipt-ecommerce-count", label: "电商订单", value: "2587", unit: "条", tone: "cyan", icon: "warehouse" },
      { id: "receipt-ecommerce-amount", label: "电商订单金额", value: "10.34", unit: "亿", tone: "amber", icon: "coins" }
    ]
  },
  {
    id: "delivery-confirmation",
    title: "年度订单在途情况",
    layout: "donut",
    metrics: [
      { id: "transit-batch-count", label: "批次订单", value: "2674", unit: "条", tone: "cyan", icon: "shieldCheck" },
      { id: "transit-batch-amount", label: "批次订单金额", value: "15.95", unit: "亿", tone: "amber", icon: "coins" },
      { id: "transit-ecommerce-count", label: "电商订单", value: "4009", unit: "条", tone: "cyan", icon: "warehouse" },
      { id: "transit-ecommerce-amount", label: "电商订单金额", value: "6.47", unit: "亿", tone: "amber", icon: "coins" }
    ]
  },
  {
    id: "dispatched",
    title: "批次订单在途情况细化",
    layout: "horizontal-bar",
    metrics: [
      { id: "unconfirmed", label: "未确认交货期", value: "2.15", unit: "亿", tone: "cyan", icon: "fileStack" },
      { id: "undispatched", label: "未发货", value: "5.30", unit: "亿", tone: "cyan", icon: "packageBox" },
      { id: "dispatched-transit", label: "已发货", value: "8.50", unit: "亿", tone: "cyan", icon: "truck" }
    ]
  }
];

export const chartPanels: ChartPanelData[] = [
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
        { label: "未发货金额", data: [120, 90, 100, 110, 80, 120, 90, 100], tone: "cyan" },
        { label: "已发货金额", data: [100, 80, 70, 60, 90, 110, 80, 90], tone: "cyan" },
        { label: "电商金额", data: [80, 50, 50, 40, 90, 50, 60, 80], tone: "cyan" },
        { label: "到货金额", data: [400, 550, 320, 580, 250, 400, 280, 310], tone: "amber" }
      ]
    }
  },
  {
    id: "engineering-type",
    title: "按工程类型分布情况",
    type: "bar",
    span: "half",
    stacked: true,
    chart: {
      unit: "万元",
      labels: ["主网工程", "配网工程", "技改和大修", "营销工程", "调控和信通", "实物储备"],
      datasets: [
        { label: "未确认交货期金额", data: [60, 80, 120, 40, 60, 50], tone: "cyan" },
        { label: "未发货金额", data: [90, 110, 80, 60, 50, 40], tone: "cyan" },
        { label: "已发货金额", data: [150, 80, 100, 70, 80, 50], tone: "cyan" },
        { label: "电商金额", data: [150, 120, 50, 10, 90, 20], tone: "cyan" },
        { label: "到货金额", data: [320, 390, 550, 180, 280, 540], tone: "amber" }
      ]
    }
  },
  {
    id: "delivery-plan",
    title: "批次订单未来交货分布情况",
    type: "line",
    span: "half",
    chart: {
      unit: "亿元",
      labels: ["2026-07", "2026-08", "2026-09", "2026-10", "2026-11", "2026-12", "2027-01", "2027-02", "2027-03", "2027-04", "2027-05", "2027-06", "更久远"],
      datasets: [
        { label: "在途金额", data: [1.2, 2.5, 3.8, 4.2, 3.5, 2.8, 2.1, 1.8, 1.5, 1.2, 0.9, 0.6, 1.5], tone: "cyan" },
        { label: "到货金额", data: [2.5, 3.1, 2.8, 1.9, 2.4, 3.5, 4.2, 3.8, 4.5, 5.1, 4.8, 5.5, 0.8], tone: "amber" }
      ]
    }
  },
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
      labels: ["沈阳", "大连", "鞍山", "抚顺", "本溪", "丹东", "锦州", "营口", "阜新", "辽阳", "盘锦", "铁岭"],
      datasets: [
        { label: "未确认交货期金额", data: [50, 80, 60, 90, 40, 70, 50, 60, 30, 40, 30, 50], tone: "cyan" },
        { label: "未发货金额", data: [90, 120, 80, 70, 60, 80, 70, 50, 40, 50, 40, 60], tone: "cyan" },
        { label: "已发货金额", data: [100, 80, 110, 60, 170, 90, 120, 90, 350, 210, 280, 250], tone: "cyan" },
        { label: "电商金额", data: [80, 260, 130, 350, 110, 310, 40, 200, 140, 220, 160, 260], tone: "cyan" },
        { label: "到货金额", data: [320, 540, 380, 570, 150, 550, 280, 400, 180, 260, 200, 300], tone: "amber" },
        { label: "省公司平均在途率", data: [57.7, 57.7, 57.7, 57.7, 57.7, 57.7, 57.7, 57.7, 57.7, 57.7, 57.7, 57.7], tone: "amber", type: "line", yAxisID: "y1" },
        { label: "各地市在途率", data: [50.0, 50.0, 50.0, 50.0, 71.7, 50.0, 50.0, 50.0, 75.7, 66.7, 71.8, 67.4], tone: "cyan", type: "line", yAxisID: "y1" }
      ]
    }
  }
];
