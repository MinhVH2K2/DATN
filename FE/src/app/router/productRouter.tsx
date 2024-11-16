
import path from "path";
import Layout from "../layout/Layout";
import Product from "../page/products/Product";
import ProductAdd from "../page/products/ProductAdd";
import Categoris from "../page/categoris/Categoris";

export const productRouter: any = {
  path: "/",
  element: <Layout />,
  children: [
    { path: "products", element: <Product /> },
    { path: "product-add", element: <ProductAdd /> } ,
    { path: "categoris-page", element: <Categoris /> } 
  ]
};