import { configureStore } from "@reduxjs/toolkit";
import currentQueryReducer from "../features/currentQuerySlice";
import searchQueryReducer from "../features/searchQuerySlice";
import { jikanApi } from "../services/JikanjsApi"; // твой RTK Query API

export const store = configureStore({
  reducer: {
    currentQuery: currentQueryReducer,
    [jikanApi.reducerPath]: jikanApi.reducer, // добавляем reducer RTK Query
		searchQuerySlice: searchQueryReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jikanApi.middleware), // добавляем middleware RTK Query
});
