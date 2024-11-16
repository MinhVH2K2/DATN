import Login from "../layout/auth/Login";
import Layout from "../layout/Layout";
import Dashboard from "../page/dashboard/Dashboard";
import Product from "../page/products/Product";
import ProductAdd from "../page/products/ProductAdd";
import CounterSale from "../page/sales/CounterSale";
import Categoris from "../page/categoris/Categoris";
import Sizes from "../page/sizes/Sizes";
import Brands from "../page/brands/Brands";
import Marterial from "../page/marterial/Marterial";
import Color from "../page/color/Color";

export const indexRouter: any = {
  path: "/",
  element: <Layout />,
  children: [
    { path: "/dashboard", element: <Dashboard /> },
    { path: "products", element: <Product /> },
    { path: "product-add", element: <ProductAdd /> },
    { path: "counter-sale", element: <CounterSale /> },
    { path: "categoris-page", element: <Categoris /> },
    { path: "sizes-page", element: <Sizes /> },
    { path: "brands-page", element: <Brands /> },
    { path: "marterial-page", element: <Marterial /> },
    { path: "Color-page", element: <Color /> }
  ],
};
