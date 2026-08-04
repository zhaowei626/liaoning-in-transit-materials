export type MetricTone = "cyan" | "amber";

export type IconKey =
  | "fileStack"
  | "shopping"
  | "shieldCheck"
  | "coins"
  | "truck"
  | "receipt"
  | "packageBox"
  | "warehouse";

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  active: boolean;
}

export interface DateRangeFilter {
  id: "contract" | "confirmed" | "actual";
  label: string;
  start: string;
  end: string;
}

export interface OrderTypeFilter {
  id: "all" | "batch" | "ecommerce";
  label: string;
}

export interface UnitFilter {
  id: "all" | "shenyang" | "dalian" | "anshan" | "fushun" | "materials-company" | "xintong-company";
  label: string;
}

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  unit: string;
  subValue?: string;
  subUnit?: string;
  tone: MetricTone;
  icon: IconKey;
}

export interface StatCardData {
  id: string;
  title: string;
  layout: "paired" | "list" | "donut" | "horizontal-bar";
  metrics: MetricItem[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  tone: MetricTone;
  type?: "line" | "bar";
  yAxisID?: string;
}

export interface ChartDataSet {
  labels: string[];
  datasets: ChartDataset[];
  unit?: string;
  secondaryUnit?: string;
  labelLinks?: Record<string, string>;
}

export interface PanelMetricCard {
  id: string;
  label: string;
  value: string;
  unit: string;
  tone: MetricTone;
}

export interface SupplierItem {
  rank: number;
  name: string;
  amount: string;
}

export interface ChartPanelData {
  id: string;
  title: string;
  type: "bar" | "line";
  span?: "half" | "full";
  layout?: "chart" | "horizontal-bar" | "supplier-top";
  className?: string;
  metrics?: MetricItem[];
  suppliers?: SupplierItem[];
  chart: ChartDataSet;
  tabs?: NavigationItem[];
  stacked?: boolean;
  summary?: { label: string; value: string; unit: string }[];
  metricCards?: PanelMetricCard[];
}
