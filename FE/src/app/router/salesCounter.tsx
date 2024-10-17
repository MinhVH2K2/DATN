import Layout from "../layout/Layout";
import SalesCounter from "../page/sales/SalesCounter";


export const salesCounter: any = {
  path: "/",
  element: <Layout />,
  children: [
    { path: "salesCounter", element: <SalesCounter /> },
    
  ]
 
};