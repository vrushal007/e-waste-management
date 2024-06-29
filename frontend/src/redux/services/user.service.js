import { createApi } from "@reduxjs/toolkit/query/react";

import { extendedBaseQuery } from "../customBaseQuery";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: extendedBaseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    createUser: builder.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    editUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    approveUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/approve`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
    rejectUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}/reject`,
        method: "PUT",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useEditUserMutation,
  useDeleteUserMutation,
  useApproveUserMutation,
  useRejectUserMutation,
} = userApi;
