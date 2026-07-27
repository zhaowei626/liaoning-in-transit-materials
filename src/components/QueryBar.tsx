import type { ChangeEventHandler } from "react";
import type { DateRangeFilter, OrderTypeFilter } from "@/types/dashboard";

export interface QueryBarProps
  extends Readonly<{
    dateFilters: DateRangeFilter[];
    orderTypes: OrderTypeFilter[];
    searchLabel: string;
    resetLabel: string;
    createDateChangeHandler: (
      id: DateRangeFilter["id"],
      field: "start" | "end"
    ) => ChangeEventHandler<HTMLInputElement>;
    createOrderTypeHandler: (id: OrderTypeFilter["id"]) => ChangeEventHandler<HTMLInputElement>;
    onSearch: () => void;
    onReset: () => void;
  }> {}

export function QueryBar({
  dateFilters,
  orderTypes,
  searchLabel,
  resetLabel,
  createDateChangeHandler,
  createOrderTypeHandler,
  onSearch,
  onReset
}: QueryBarProps) {
  return (
    <section className="tech-panel mb-4 flex items-end justify-between gap-6 p-4">
      <div className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-[repeat(3,minmax(16rem,1fr))_minmax(16rem,auto)]">
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
          <span className="ml-1 text-xs text-inkMuted dark:text-inkMuted">订单类别</span>
          <div className="flex h-full flex-wrap items-center gap-4 py-1">
            {orderTypes.map((orderType) => (
              <label className="group flex cursor-pointer items-center gap-2" key={orderType.id}>
                <input
                  checked={orderType.checked}
                  className="h-4 w-4 rounded border-cyanLine bg-cyanSoft text-cyanCore focus:ring-0 focus:ring-offset-0 dark:border-cyanLine dark:bg-cyanSoft dark:text-cyanCore"
                  onChange={createOrderTypeHandler(orderType.id)}
                  type="checkbox"
                />
                <span className="text-sm font-semibold text-cyanCore transition-colors group-hover:text-white dark:text-cyanCore dark:group-hover:text-white">
                  {orderType.label}
                </span>
              </label>
            ))}
          </div>
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
      </div>
    </section>
  );
}
