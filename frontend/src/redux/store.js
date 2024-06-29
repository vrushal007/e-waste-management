import { configureStore } from "@reduxjs/toolkit";

import toastSlice from "./slices/toast.slice";
import {userApi} from "./services/user.service";
import { authApi } from "./services/auth.service";
import { orderApi } from "./services/order.service";
import { recyclerApi } from "./services/recyclers.service";
import {collectorApi} from "./services/collectors.service";
import authSlice, { authSliceMiddleware } from "./slices/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    toast: toastSlice,
    [authApi.reducerPath]: authApi.reducer,
    [recyclerApi.reducerPath]: recyclerApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [collectorApi.reducerPath]: collectorApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      authSliceMiddleware,
      recyclerApi.middleware,
      orderApi.middleware,
      collectorApi.middleware,
      userApi.middleware
    ),
});
