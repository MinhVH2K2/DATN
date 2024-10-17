
import Layout from "../layout/Layout";
import Product from "../page/products/Product";

export const productRouter: any = {
  path: "/",
  element: <Layout />,
  children: [{ path: "/products", element: <Product /> }],
};