import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { TabPanel, TabView } from "primereact/tabview";
import React, { useState } from "react";

export default function CounterSale() {
  // Autocomplete
  const [value, setValue] = useState<string>("");
  const [items, setItems] = useState<string[]>([]);

  const search = (event: AutoCompleteCompleteEvent) => {
    setItems(
      [...Array(10).fill(0)].map((_, index) => event.query + "-" + index)
    );
  };

  const selectOrder = () => {
    console.log("select order");
  };

  const removeOrder = () => {
    console.log("remove order");
  };

  return (
    <>
      <div
        style={{ height: "100vh", width: "100vw" }}
        className="d-flex flex-column"
      >
        {/* Header counter sale */}
        <div className="d-flex bg-primary w-100">
          <div style={{ width: "70%" }} className="d-flex">
            <div className="p-2">
              <AutoComplete
                value={value}
                suggestions={items}
                inputStyle={{ width: "448px", borderRadius: ".5rem" }}
                completeMethod={search}
                onChange={(e) => setValue(e.value)}
              />
            </div>
            <div className="d-flex justify-content-between p-2 w-100">
              <div>
                <button className="btn btn-primary fs-5 rounded-3">
                  <span onClick={selectOrder}>Hoa don 1</span>
                  <a onClick={removeOrder} className="z-1 ms-2 text-white">
                    <i className="bi bi-x"></i>
                  </a>
                </button>
                <button className="btn btn-light fs-5">
                  <span onClick={selectOrder}>Hoa don 2</span>
                  <a onClick={removeOrder} className="z-1 ms-2 text-dark">
                    <i className="bi bi-x"></i>
                  </a>
                </button>
              </div>
              <div>
                <button className="btn btn-primary text-white fs-5 p-1">
                <i className="bi bi-plus-circle"></i>
                </button>
              </div>
            </div>
          </div>
          <div
            style={{ width: "30%" }}
            className="d-flex justify-content-end align-items-center me-3"
          >
            <button className="btn text-white">
              <i className="bi bi-x-diamond-fill"></i>
            </button>
            <button className="btn text-white">
              <i className="bi bi-x-diamond-fill"></i>
            </button>
            <button className="btn text-white">
              <i className="bi bi-x-diamond-fill"></i>
            </button>
            <button className="btn text-white">
              <i className="bi bi-x-diamond-fill"></i>
            </button>
            <button className="btn text-white">
              <i className="bi bi-x-diamond-fill"></i>
            </button>
          </div>
        </div>
        <div className="w-100 flex-grow-10">123</div>
        <div className="bg-info w-100">123</div>
      </div>
    </>
  );
}
