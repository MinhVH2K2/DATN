import React, { Suspense, useState } from "react";
import "./App.css";
import { indexRouter } from "./app/router/indexRouter";
import { ToastContainer } from "react-toastify";

import { Navigate, useRoutes } from "react-router-dom";
import NotPermission from "./app/page/error/NotPermission";
import Error500 from "./app/page/error/Error500";
import NotFound from "./app/page/error/NotFound";
import { authRouter } from "./app/router/authRouter";
import { productRouter } from "./app/router/productRouter";
<<<<<<< HEAD
import { PrimeReactProvider } from 'primereact/api';
import { salesCounter } from "./app/router/salesCounter";
import { saleRouter } from "./app/router/saleRouter";
import { saleOnline } from "./app/router/saleOnlineRouter";
import {collection} from "./app/router/collectionRouter";
import {productDetail} from "./app/router/productDetail";
import { cartShopping } from "./app/router/cartShoppingRouter";
=======
import CounterSale from "./app/page/sales/CounterSale";
import { discountsRouter } from "./app/router/discountsRouter";

>>>>>>> 37c46b033526ccd1b349e77086d69c03aab5a91c
export const spinner = (
  <div className="progress-spinner text-center">
    <div className="swm-loader"></div>
  </div>
);

function App() {
  const [visible, setVisible] = useState(false);

  let router = useRoutes([
    { path: "not-permission", element: <NotPermission /> }, //403
    { path: "/", element: <Navigate to="/dashboard" replace /> },
    authRouter,
    indexRouter,
    productRouter,
<<<<<<< HEAD
    salesCounter,
    saleRouter,
    saleOnline,
    collection,
    productDetail,
    cartShopping,
  
=======
    discountsRouter,
    // salesCounter,
    // saleRouter,
    { path: "counter-sale", element: <CounterSale /> }, //500
>>>>>>> 37c46b033526ccd1b349e77086d69c03aab5a91c
    { path: "err-network", element: <Error500 /> }, //500
    { path: "*", element: <NotFound /> }, //404
  ]);

  return (
    <div>
      <ToastContainer></ToastContainer>
      <Suspense fallback={spinner}>{router}</Suspense>
    </div>
  );
}

export default App;
