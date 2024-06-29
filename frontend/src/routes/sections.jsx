import { lazy, Suspense } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard";
import SignUpRecyclerPage from "../pages/signupRecyclers";
// import CollectorPage from "../pages/collector";
// import MyRequestsPage from "../pages/myRequests";
// import UserOrderPage from "../pages/userOrder";
// import AssignedOrdersPage from "../pages/assignedOrders";

export const IndexPage = lazy(() => import("../pages/app"));
export const BlogPage = lazy(() => import("../pages/blog"));
export const UserPage = lazy(() => import("../pages/user"));
export const LoginPage = lazy(() => import("../pages/login"));
export const SignupPage = lazy(() => import("../pages/signup"));
export const ProductsPage = lazy(() => import("../pages/products"));
export const Page404 = lazy(() => import("../pages/page-not-found"));
export const RecyclerPage = lazy(() => import("../pages/recycler"));
export const CollectorPage = lazy(() => import("../pages/collector"));
export const MyRequestsPage = lazy(() => import("../pages/myRequests"));
export const UserOrderPage = lazy(() => import("../pages/userOrder"));
export const AssignedOrdersPage = lazy(() => import("../pages/assignedOrders"));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: "user", element: <UserPage /> },
        { path: "products", element: <ProductsPage /> },
        { path: "blog", element: <BlogPage /> },
        { path: "recyclers", element: <RecyclerPage /> },
        { path: "collector", element: <CollectorPage /> },
        { path: "my-requests", element: <MyRequestsPage /> },
        { path: "user-orders", element: <UserOrderPage /> },
        { path: "assigned-orders", element: <AssignedOrdersPage /> },
      ],
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "sign-up",
      element: <SignupPage />,
    },
    {
      path: "sign-up/recycler",
      element: <SignUpRecyclerPage />,
    },
    {
      path: "/",
      element: <Navigate to="/dashboard" replace />,
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
