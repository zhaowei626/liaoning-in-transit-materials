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
  id: "batch" | "ecommerce";
  label: string;
  checked: boolean;
}

export interface MetricItem {
  id: string;
  label: string;
  value: string;
  unit: string;
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
}

export interface ChartPanelData {
  id: string;
  title: string;
  type: "bar" | "line";
  span: "half";
  chart: ChartDataSet;
  tabs?: NavigationItem[];
  stacked?: boolean;
}
