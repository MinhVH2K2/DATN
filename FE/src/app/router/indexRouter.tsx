
import Layout from "../layout/Layout";
import Dashboard from "../page/dashboard/Dashboard";
import Product from "../page/products/Product";
import ProductAdd from "../page/products/ProductAdd";
// import CounterSale from "../page/sales/CounterSale";

export const indexRouter: any = {
  path: "/",
  element: <Layout />,
  children: [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "products", element: <Product /> },
    { path: "product-add", element: <ProductAdd /> },
    // { path: "counter-sale", element: <CounterSale /> },
  ],
};
