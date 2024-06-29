import { createApi } from "@reduxjs/toolkit/query/react";

import { extendedBaseQuery } from "../customBaseQuery";

export const collectorApi = createApi({
  reducerPath: "collectorApi",
  baseQuery: extendedBaseQuery,
  tagTypes: ["Collector"],
  endpoints: (builder) => ({
    getCollectors: builder.query({
      query: () => "/collectors",
      providesTags: ["Collector"],
    }),
    createCollector: builder.mutation({
      query: (body) => ({
        url: "/collectors",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Collector"],
    }),
    editCollector: builder.mutation({
      query: ({ id, body }) => ({
        url: `/collectors/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Collector"],
    }),
    deleteCollector: builder.mutation({
      query: (id) => ({
        url: `/collectors/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Collector"],
    }),
    approveCollector: builder.mutation({
      query: (id) => ({
        url: `/collectors/${id}/approve`,
        method: "PUT",
      }),
      invalidatesTags: ["Collector"],
    }),
  }),
});

export const {
  useGetCollectorsQuery,
  useCreateCollectorMutation,
  useEditCollectorMutation,
  useDeleteCollectorMutation,
  useApproveCollectorMutation,
} = collectorApi;
