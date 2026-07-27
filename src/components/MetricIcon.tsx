import {
  BadgeCheck,
  Coins,
  FileStack,
  Package,
  ReceiptText,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Warehouse,
  type LucideIcon
} from "lucide-react";
import type { IconKey, MetricTone } from "@/types/dashboard";

const iconMap: Record<IconKey, LucideIcon> = {
  fileStack: FileStack,
  shopping: ShoppingBag,
  shieldCheck: ShieldCheck,
  coins: Coins,
  truck: Truck,
  receipt: ReceiptText,
  packageBox: Package,
  warehouse: Warehouse
};

export interface MetricIconProps
  extends Readonly<{
    icon: IconKey;
    tone: MetricTone;
  }> {}

export function MetricIcon({ icon, tone }: MetricIconProps) {
  const Icon = iconMap[icon] ?? BadgeCheck;
  const toneClass =
    tone === "amber"
      ? "border-amberCore/45 bg-amberSoft text-amberCore dark:border-amberCore/45 dark:bg-amberSoft dark:text-amberCore"
      : "border-cyanLine bg-cyanSoft text-cyanCore dark:border-cyanLine dark:bg-cyanSoft dark:text-cyanCore";

  return (
    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${toneClass}`}>
      <Icon aria-hidden="true" size={24} strokeWidth={1.8} />
    </span>
  );
}
