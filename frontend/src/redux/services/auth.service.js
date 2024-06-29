import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
    signup: builder.mutation({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgotPassword",
        method: "POST",
        body,
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
      }),
    }),
    refreshToken: builder.mutation({
      query: (body) => ({
        url: "/auth/refreshToken",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyUserMutation,
  useRefreshTokenMutation,
} = authApi;
