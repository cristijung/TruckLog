import { configureStore } from "@reduxjs/toolkit";
import { apiSlice, apiReducer } from "./rootReducer";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware);
  },
});
