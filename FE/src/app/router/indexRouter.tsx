import Login from "../layout/auth/Login";
import Layout from "../layout/Layout";
import Dashboard from "../page/dashboard/Dashboard";

export const indexRouter: any = {
  path: "/",
  element: <Layout />,
  children: [{ path: "/dashboard", element: <Dashboard /> }],
};
