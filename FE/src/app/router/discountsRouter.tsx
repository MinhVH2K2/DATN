import Layout from "../layout/Layout";
import Dashboard from "../page/dashboard/Dashboard";
import Discounts from "../page/discounts/Discounts";
import Test from "../page/discounts/Test";

export const discountsRouter: any = {
  path: "/",
  element: <Layout />,
  children: [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "discounts", element: <Discounts /> } ,
    { path: "test", element: <Test /> }
    
  ]
};
