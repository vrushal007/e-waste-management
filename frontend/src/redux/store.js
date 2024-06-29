import { configureStore } from "@reduxjs/toolkit";

import toastSlice from "./slices/toast.slice";
import { authApi } from "./services/auth.service";
import authSlice, { authSliceMiddleware } from "./slices/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
    [authApi.reducerPath]: authApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      authSliceMiddleware,
    ),
});
