import type { ChangeEventHandler } from "react";
import type { DateRangeFilter, OrderTypeFilter, UnitFilter } from "@/types/dashboard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export interface QueryBarProps
  extends Readonly<{
    dateFilters: DateRangeFilter[];
    orderTypes: OrderTypeFilter[];
    selectedOrderType: OrderTypeFilter["id"];
    unitOptions: UnitFilter[];
    selectedUnit: UnitFilter["id"];
    searchLabel: string;
    resetLabel: string;
    createDateChangeHandler: (
      id: DateRangeFilter["id"],
      field: "start" | "end"
    ) => ChangeEventHandler<HTMLInputElement>;
    onOrderTypeChange: ChangeEventHandler<HTMLSelectElement>;
    onUnitChange: ChangeEventHandler<HTMLSelectElement>;
    onSearch: () => void;
    onReset: () => void;
    backHref?: string;
    backLabel?: string;
  }> {}

export function QueryBar({
  dateFilters,
  orderTypes,
  selectedOrderType,
  unitOptions,
  selectedUnit,
  searchLabel,
  resetLabel,
  createDateChangeHandler,
  onOrderTypeChange,
  onUnitChange,
  onSearch,
  onReset,
  backHref,
  backLabel = "返回省公司"
}: QueryBarProps) {
  return (
    <section className="tech-panel mb-4 flex items-end justify-between gap-6 p-4">
      <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-[max-content_max-content_10rem_10rem]">
        {dateFilters.map((filter) => (
          <div className="flex flex-col gap-1" key={filter.id}>
            <label className="ml-1 text-xs text-inkMuted dark:text-inkMuted">{filter.label}</label>
            <div className="flex min-w-0 items-center gap-2">
              <input
                className="date-input"
                onChange={createDateChangeHandler(filter.id, "start")}
                type="date"
                value={filter.start}
              />
              <span className="text-inkMuted dark:text-inkMuted">-</span>
              <input
                className="date-input"
                onChange={createDateChangeHandler(filter.id, "end")}
                type="date"
                value={filter.end}
              />
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-1">
          <label className="ml-1 text-xs text-inkMuted dark:text-inkMuted" htmlFor="order-type-filter">订单类型</label>
          <select
            className="select-input"
            id="order-type-filter"
            onChange={onOrderTypeChange}
            value={selectedOrderType}
          >
            {orderTypes.map((orderType) => (
              <option key={orderType.id} value={orderType.id}>
                {orderType.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="ml-1 text-xs text-inkMuted dark:text-inkMuted" htmlFor="unit-filter">单位</label>
          <select className="select-input" id="unit-filter" onChange={onUnitChange} value={selectedUnit}>
            {unitOptions.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex shrink-0 items-end gap-3 pb-1">
        <button
          className="h-9 min-w-20 rounded-dashboard border border-cyanLine bg-cyanCore/20 px-5 text-sm font-bold text-cyanCore transition-colors hover:bg-cyanCore/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyanCore dark:border-cyanLine dark:bg-cyanCore/20 dark:text-cyanCore"
          onClick={onSearch}
          type="button"
        >
          {searchLabel}
        </button>
        <button
          className="h-9 min-w-20 rounded-dashboard border border-slate-600 bg-slateGlass px-5 text-sm font-bold text-inkMuted transition-colors hover:bg-slate-700/60 hover:text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-slate-400 dark:border-slate-600 dark:bg-slateGlass dark:text-inkMuted"
          onClick={onReset}
          type="button"
        >
          {resetLabel}
        </button>
        {backHref ? (
          <Link
            aria-label={backLabel}
            className="inline-flex h-9 min-w-28 items-center justify-center gap-2 rounded-dashboard border border-cyanLine bg-slateGlass px-4 text-sm font-bold text-cyanCore shadow-cyanGlow transition-colors hover:bg-cyanCore/15 hover:text-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyanCore dark:border-cyanLine dark:bg-slateGlass dark:text-cyanCore"
            href={backHref}
          >
            <ArrowLeft aria-hidden="true" className="h-4 w-4" strokeWidth={2.2} />
            <span>{backLabel}</span>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
