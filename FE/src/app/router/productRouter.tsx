
import Layout from "../layout/Layout";
import Product from "../page/products/Product";
import ProductAdd from "../page/products/ProductAdd";

export const productRouter: any = {
  path: "/",
  element: <Layout />,
  children: [
    { path: "products", element: <Product /> },
    { path: "product-add", element: <ProductAdd /> } 
  ]
};