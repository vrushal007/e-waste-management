import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
        providesTags: ["Auth"],
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgotPassword",
        method: "POST",
        body,
        providesTags: ["Auth"],
      }),
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/resetPassword",
        method: "POST",
        body,
        providesTags: ["Auth"],
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${body.token}`,
        }),
      }),
    }),
    verifyUser: builder.mutation({
      query: (body) => ({
        url: "/auth/change-generated-password",
        method: "POST",
        body,
        providesTags: ["Auth"],
      }),
    }),
    refreshToken: builder.mutation({
      query: (body) => ({
        url: "/auth/refreshToken",
        method: "POST",
        body,
        providesTags: ["Auth"],
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyUserMutation,
  useRefreshTokenMutation,
} = authApi;
