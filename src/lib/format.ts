/**
 * 格式化金额：保留2位小数并补位
 */
export function formatAmount(value: number | string, useGrouping: boolean = true): string {
  const num = typeof value === "string" ? parseFloat(value.replace(/,/g, "")) : value;
  if (isNaN(num)) return "--";
  return num.toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: useGrouping,
  });
}

/**
 * 格式化数量：使用千分位分隔符
 */
export function formatQuantity(value: number | string): string {
  const num = typeof value === "string" ? parseInt(value.replace(/,/g, ""), 10) : value;
  if (isNaN(num)) return "--";
  return num.toLocaleString("zh-CN");
}
