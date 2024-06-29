import { createApi } from "@reduxjs/toolkit/query/react";

import { extendedBaseQuery } from "../customBaseQuery";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: extendedBaseQuery,
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation({
      query: (body) => ({
        url: "/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
    editOrder: builder.mutation({
      query: ({ id, body }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body,
        providesTags: ["Order"],
      }),
    }),
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
        providesTags: ["Order"],
      }),
    }),
    approveOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/approve`,
        method: "PUT",
        providesTags: ["Order"],
      }),
    }),
    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}/cancel`,
        method: "PUT",
        providesTags: ["Order"],
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useEditOrderMutation,
  useDeleteOrderMutation,
  useApproveOrderMutation,
  useCancelOrderMutation,
} = orderApi;
