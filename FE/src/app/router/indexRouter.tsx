import Login from "../layout/auth/Login";
import Layout from "../layout/Layout";
import Dashboard from "../page/dashboard/Dashboard";
import Discounts from "../page/discounts/Discounts";
import Product from "../page/products/Product";
import ProductAdd from "../page/products/ProductAdd";
import CounterSale from "../page/sales/CounterSale";

export const indexRouter: any = {
  path: "/",
  element: <Layout />,
  children: [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "products", element: <Product /> },
    { path: "product-add", element: <ProductAdd /> },
    { path: "counter-sale", element: <CounterSale /> },
    { path: "discounts", element: <Discounts /> },
  ],
};
