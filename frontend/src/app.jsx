/* eslint-disable perfectionist/sort-imports */
import { useDispatch, useSelector } from "react-redux";
import "./global.css";

import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useScrollToTop } from "./hooks/use-scroll-to-top";
import { setToast } from "./redux/slices/toast.slice";

import Router from "./routes/sections";
import ThemeProvider from "./theme";

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  const { enqueueSnackbar } = useSnackbar();

  const { open, message, variant } = useSelector((state) => state.toast);
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      enqueueSnackbar(message, { variant });

      dispatch(
        setToast({
          open: false,
          message: "",
          variant: "default",
        }),
      );
    }
  }, [open, message, variant, enqueueSnackbar, dispatch]);

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
