import Login from "../layout/auth/Login";
import Layout from "../layout/Layout";
import Dashboard from "../page/dashboard/Dashboard";

export const authRouter: any = {
  path: "/login",
  element: <Login />, // Trang đăng nhập không nằm trong Layout
};
