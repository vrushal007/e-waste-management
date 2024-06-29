import { Suspense } from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./app";
import { store } from "./redux/store";
import { SnackbarProvider } from "notistack";

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <HelmetProvider>
    <SnackbarProvider maxSnack={3} anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}>
      <Provider store={store}>
        <BrowserRouter>
          <Suspense>
            <App />
          </Suspense>
        </BrowserRouter>
      </Provider>
    </SnackbarProvider>
  </HelmetProvider>,
);
