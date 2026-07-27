"use client";

import type { ChangeEventHandler } from "react";
import { resetFilters, setDateRange, submitQuery, toggleOrderType } from "@/store/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { DateRangeFilter, OrderTypeFilter } from "@/types/dashboard";

export interface UseDashboardFiltersResult
  extends Readonly<{
    dateFilters: DateRangeFilter[];
    orderTypes: OrderTypeFilter[];
    createDateChangeHandler: (
      id: DateRangeFilter["id"],
      field: "start" | "end"
    ) => ChangeEventHandler<HTMLInputElement>;
    createOrderTypeHandler: (id: OrderTypeFilter["id"]) => ChangeEventHandler<HTMLInputElement>;
    handleSubmit: () => void;
    handleReset: () => void;
  }> {}

export function useDashboardFilters(): UseDashboardFiltersResult {
  const dispatch = useAppDispatch();
  const dateFilters = useAppSelector((state) => state.dashboard.dateFilters);
  const orderTypes = useAppSelector((state) => state.dashboard.orderTypes);

  const createDateChangeHandler =
    (id: DateRangeFilter["id"], field: "start" | "end"): ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      dispatch(setDateRange({ id, field, value: event.target.value }));
    };

  const createOrderTypeHandler =
    (id: OrderTypeFilter["id"]): ChangeEventHandler<HTMLInputElement> =>
    () => {
      dispatch(toggleOrderType(id));
    };

  const handleSubmit = () => {
    dispatch(submitQuery(new Date().toISOString()));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return {
    dateFilters,
    orderTypes,
    createDateChangeHandler,
    createOrderTypeHandler,
    handleSubmit,
    handleReset
  };
}
