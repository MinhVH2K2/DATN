import React, { Suspense, useState } from "react";
import "./App.css";
import { indexRouter } from "./app/router/indexRouter";
import { ToastContainer } from "react-toastify";

import { Navigate, useRoutes } from "react-router-dom";
import NotPermission from "./app/page/error/NotPermission";
import Error500 from "./app/page/error/Error500";
import NotFound from "./app/page/error/NotFound";

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
    indexRouter,
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