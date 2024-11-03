import Layout from "../layout/Layout";
import Discounts from "../page/discounts/Discounts";

export const discountsRouter: any = {
  path: "/",
  element: <Layout />,
  children: [
    { path: "discounts", element: <Discounts /> }
  ]
};
