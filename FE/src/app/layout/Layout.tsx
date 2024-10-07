import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Aside from "./Aside";
import { useAppSelector } from "../store/hook";

export default function Layout() {
  const spinner = useAppSelector((state) => state.spinner.loading);
  return (
  <>
  {spinner && (
        <div className="progress-spinner text-center">
          <div className="swm-loader"></div>
        </div>
      )}
    <div className="group-data-[sidebar-size=sm]:min-h-sm group-data-[sidebar-size=sm]:relative">
      <Header />
      <Aside />
      <main id="main" className="main">
        <Outlet />
      </main>
    </div>
  </>
  );
}
