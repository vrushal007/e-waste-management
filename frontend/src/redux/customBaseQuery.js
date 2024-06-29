import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { Mutex } from "async-mutex";
import { login, logout } from "../slices/auth.slice";
import { setToast } from "../slices/toast.slice";

const mutex = new Mutex();
export const extendedBaseQuery = async (args, api, extraOptions) => {
  // Update base URL based on selected environment

  const modifiedBaseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    mode: "cors",
    prepareHeaders: (headers, { getState }) => {
      const { accessToken } = getState()?.auth?.user;
      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }
      return headers;
    },
  });

  try {
    await mutex.waitForUnlock();

    let result = await modifiedBaseQuery(args, api, extraOptions);

    if (result.error) {
      if (result.error.status === 401) {
        if (!mutex.isLocked()) {
          const release = await mutex.acquire();
          try {
            const userData = api.getState().auth?.user;
            const formData = {
              id: userData?.id,
              refreshToken: userData?.refreshToken,
            };
            const refreshResult = await modifiedBaseQuery(
              { url: "/auth/refreshToken", method: "POST", body: formData },
              api,
              extraOptions,
            );
            if (refreshResult?.data?.success) {
              // store the new token
              await api.dispatch(
                login({
                  data: {
                    ...refreshResult?.data?.data,
                    accessToken: refreshResult?.data?.data?.token?.accessToken,
                    refreshToken:
                      refreshResult?.data?.data?.token?.refreshToken,
                  },
                  token: refreshResult?.data?.data?.token?.accessToken,
                }),
              );
              // retry the initial query
              result = await modifiedBaseQuery(args, api, extraOptions);
            } else {
              localStorage.clear();
              api.dispatch(logout());
            }
          } finally {
            release();
          }
        } else {
          await mutex.waitForUnlock();
          result = await modifiedBaseQuery(args, api, extraOptions);
        }
      } else {
        api.dispatch(
          setToast({
            variant: "error",
            message: result?.error?.data?.message ?? result?.error?.error,
            open: true,
          }),
        );
      }
    }

    if (
      result?.meta &&
      (result?.meta?.response?.status === 201 ||
        result?.meta?.response?.status === 204)
    ) {
      api.dispatch(
        setToast({
          variant: "success",
          message: result?.data?.message,
          open: true,
        }),
      );
    }

    return result;
  } catch (error) {
    api.dispatch(
      setToast({
        variant: "error",
        message: "Somthing went wrong",
        open: true,
      }),
    );
    return error;
  }
};
