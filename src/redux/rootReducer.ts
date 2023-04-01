import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "../utils/api";

export const apiSlice = createApi({
    reducerPath: "apiSlice",
    keepUnusedDataFor: 0,
    baseQuery: fetchBaseQuery({
        baseUrl: `${api}`,
    }),
    endpoints: () => ({}),
});

export const apiReducer = apiSlice.reducer;
