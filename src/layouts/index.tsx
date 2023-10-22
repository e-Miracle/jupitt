import { lazy } from "react";

// render the pages suspended
const AuthLayout = lazy(() => import("./AuthLayout"));
const DashboardLayout = lazy(() => import("./DashBoardLayout"));
const FormLayout = lazy(() => import("./FormLayout"))
export { AuthLayout, DashboardLayout, FormLayout };
