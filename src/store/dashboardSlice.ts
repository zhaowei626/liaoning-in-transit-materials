import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { initialDateFilters, initialOrderTypes } from "@/data/mockData";
import type { DateRangeFilter, OrderTypeFilter } from "@/types/dashboard";

export interface DashboardState {
  dateFilters: DateRangeFilter[];
  orderTypes: OrderTypeFilter[];
  lastQueryAt: string | null;
}

const createInitialDateFilters = () => initialDateFilters.map((filter) => ({ ...filter }));
const createInitialOrderTypes = () => initialOrderTypes.map((filter) => ({ ...filter }));

const initialState: DashboardState = {
  dateFilters: createInitialDateFilters(),
  orderTypes: createInitialOrderTypes(),
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
    toggleOrderType(state, action: PayloadAction<OrderTypeFilter["id"]>) {
      const target = state.orderTypes.find((filter) => filter.id === action.payload);

      if (target) {
        target.checked = !target.checked;
      }
    },
    submitQuery(state, action: PayloadAction<string>) {
      state.lastQueryAt = action.payload;
    },
    resetFilters(state) {
      state.dateFilters = createInitialDateFilters();
      state.orderTypes = createInitialOrderTypes();
      state.lastQueryAt = null;
    }
  }
});

export const { resetFilters, setDateRange, submitQuery, toggleOrderType } = dashboardSlice.actions;
export const dashboardReducer = dashboardSlice.reducer;
