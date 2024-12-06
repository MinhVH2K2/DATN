import Layout from "../layout/Layout";
import Dashboard from "../page/dashboard/Dashboard";
import Test from "../page/discounts/Test";
import Statistical from "../page/statistical/Statistical";
import Statisticals from "../page/statistical/Statisticals";

export const statisticalRouter: any = {
  path: "/",
  element: <Layout />,
  children: [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "statistical", element: <Statistical /> } ,
    { path: "statisticals", element: <Statisticals /> } ,
    { path: "test", element: <Test /> }
  ]
};
