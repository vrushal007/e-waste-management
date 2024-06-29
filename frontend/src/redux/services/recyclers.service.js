import { createApi } from "@reduxjs/toolkit/query/react";

import { extendedBaseQuery } from "../customBaseQuery";

export const recyclerApi = createApi({
  reducerPath: "recyclerApi",
  baseQuery: extendedBaseQuery,
  tagTypes: ["Recycler"],
  endpoints: (builder) => ({
    getRecyclers: builder.query({
      query: () => "/recycler/all",
      providesTags: ["Recycler"],
    }),
    getRecycler: builder.query({
      query: (id) => `/recyclers/${id}`,
      providesTags: ["Recycler"],
    }),
    createRecycler: builder.mutation({
      query: (body) => ({
        url: "/recyclers",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Recycler"],
    }),
    editRecycler: builder.mutation({
      query: ({ id, body }) => ({
        url: `/recyclers/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Recycler"],
    }),
    deleteRecycler: builder.mutation({
      query: (id) => ({
        url: `/recyclers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recycler"],
    }),
    approveRecycler: builder.mutation({
      query: (id) => ({
        url: `/recyclers/${id}/approve`,
        method: "PUT",
      }),
      invalidatesTags: ["Recycler"],
    }),
  }),
});

export const {
  useGetRecyclersQuery,
  useCreateRecyclerMutation,
  useEditRecyclerMutation,
  useDeleteRecyclerMutation,
  useApproveRecyclerMutation,
} = recyclerApi;
