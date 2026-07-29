"use client";

import type { ChangeEventHandler } from "react";
import { initialOrderTypes, unitFilters } from "@/data/mockData";
import { resetFilters, setDateRange, setOrderType, setUnit, submitQuery } from "@/store/dashboardSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { DateRangeFilter, OrderTypeFilter, UnitFilter } from "@/types/dashboard";

export interface UseDashboardFiltersResult
  extends Readonly<{
    dateFilters: DateRangeFilter[];
    orderTypes: OrderTypeFilter[];
    selectedOrderType: OrderTypeFilter["id"];
    unitOptions: UnitFilter[];
    selectedUnit: UnitFilter["id"];
    createDateChangeHandler: (
      id: DateRangeFilter["id"],
      field: "start" | "end"
    ) => ChangeEventHandler<HTMLInputElement>;
    handleOrderTypeChange: ChangeEventHandler<HTMLSelectElement>;
    handleUnitChange: ChangeEventHandler<HTMLSelectElement>;
    handleSubmit: () => void;
    handleReset: () => void;
  }> {}

export function useDashboardFilters(): UseDashboardFiltersResult {
  const dispatch = useAppDispatch();
  const dateFilters = useAppSelector((state) => state.dashboard.dateFilters);
  const selectedOrderType = useAppSelector((state) => state.dashboard.selectedOrderType);
  const selectedUnit = useAppSelector((state) => state.dashboard.selectedUnit);

  const createDateChangeHandler =
    (id: DateRangeFilter["id"], field: "start" | "end"): ChangeEventHandler<HTMLInputElement> =>
    (event) => {
      dispatch(setDateRange({ id, field, value: event.target.value }));
    };

  const handleOrderTypeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    dispatch(setOrderType(event.target.value as OrderTypeFilter["id"]));
  };

  const handleUnitChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    dispatch(setUnit(event.target.value as UnitFilter["id"]));
  };

  const handleSubmit = () => {
    dispatch(submitQuery(new Date().toISOString()));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return {
    dateFilters,
    orderTypes: initialOrderTypes,
    selectedOrderType,
    unitOptions: unitFilters,
    selectedUnit,
    createDateChangeHandler,
    handleOrderTypeChange,
    handleUnitChange,
    handleSubmit,
    handleReset
  };
}
