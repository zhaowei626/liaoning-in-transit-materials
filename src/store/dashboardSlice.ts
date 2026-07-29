import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialDateFilters, initialSelectedOrderType, initialSelectedUnit } from "@/data/mockData";
import type { DateRangeFilter, OrderTypeFilter, UnitFilter } from "@/types/dashboard";

export interface DashboardState {
  dateFilters: DateRangeFilter[];
  selectedOrderType: OrderTypeFilter["id"];
  selectedUnit: UnitFilter["id"];
  lastQueryAt: string | null;
}

const createInitialDateFilters = () => initialDateFilters.map((filter) => ({ ...filter }));

const initialState: DashboardState = {
  dateFilters: createInitialDateFilters(),
  selectedOrderType: initialSelectedOrderType,
  selectedUnit: initialSelectedUnit,
  lastQueryAt: null
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDateRange(
      state,
      action: PayloadAction<{ id: DateRangeFilter["id"]; field: "start" | "end"; value: string }>
    ) {
      const target = state.dateFilters.find((filter) => filter.id === action.payload.id);

      if (target) {
        target[action.payload.field] = action.payload.value;
      }
    },
    setOrderType(state, action: PayloadAction<OrderTypeFilter["id"]>) {
      state.selectedOrderType = action.payload;
    },
    setUnit(state, action: PayloadAction<UnitFilter["id"]>) {
      state.selectedUnit = action.payload;
    },
    submitQuery(state, action: PayloadAction<string>) {
      state.lastQueryAt = action.payload;
    },
    resetFilters(state) {
      state.dateFilters = createInitialDateFilters();
      state.selectedOrderType = initialSelectedOrderType;
      state.selectedUnit = initialSelectedUnit;
      state.lastQueryAt = null;
    }
  }
});

export const { resetFilters, setDateRange, setOrderType, setUnit, submitQuery } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
