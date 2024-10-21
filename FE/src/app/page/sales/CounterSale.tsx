import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { InputText } from "primereact/inputtext";
import { TabPanel, TabView } from "primereact/tabview";
import React, { useState } from "react";
import { Dropdown } from "primereact/dropdown";

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
  const [open, setOpen] = useState(false);

  // Hàm để mở/đóng menu
  const toggleMenu = () => {
    setOpen(!open);
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
            <div className="ms-2 p-2 fs-3 fw-bold">
              <span className="text-warning">Heaven</span>
              <span className="text-white">Shop</span>
            </div>
            <div className="p-2">
              <AutoComplete
                value={value}
                suggestions={items}
                inputStyle={{ width: "448px", borderRadius: ".5rem" }}
                completeMethod={search}
                onChange={(e) => setValue(e.value)}
              />
            </div>
            {/* <div className="d-flex justify-content-between p-2 w-100">
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
            </div> */}
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
          <div className="dropdown justify-content-end align-items-center mt-1 me-3">
            <button className="menu-button" onClick={toggleMenu}>
              <i className="fa fa-bars"></i> {/* Icon nút menu */}
            </button>

            {open && (
              <ul className="menu-list">
                <li className="menu-item">
                  <i className="fa fa-file"></i>
                  Xem báo cáo cuối ngày
                </li>
                <li className="menu-item">
                  <i className="fa fa-shopping-bag"></i>
                  Xử lý đặt hàng
                </li>
                <li className="menu-item">
                  <i className="fa fa-reply"></i>
                  Chọn hóa đơn trả hàng
                </li>
                <li className="menu-item">
                  <i className="fa fa-receipt"></i>
                  Lập phiếu thu
                </li>
                <li className="menu-item">
                  <i className="fa fa-upload"></i>
                  Import file
                </li>
                <li className="menu-item">
                  <i className="fa fa-eye"></i>
                  Tùy chọn hiển thị
                </li>
                <li className="menu-item">
                  <i className="fa fa-keyboard"></i>
                  Phím tắt
                </li>
                <li className="menu-item">
                  <i className="fa fa-cog"></i>
                  Quản lý
                </li>
                <li className="menu-item">
                  <i className="fa fa-sign-out"></i>
                  Đăng xuất
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="flex-grow-10">
          <div className="d-flex h-100">
            {/* Category */}
            <div
              style={{ width: "10%" }}
              className="h-100 px-2 py-3 shadow-2 border-end"
            >
              <div className="cs-card shadow-1 active">Danh muc 1</div>
              <div className="cs-card shadow-1">Danh muc 2</div>
            </div>
            <div
              style={{ width: "60%", backgroundColor: "#f1f3f5" }}
              className="h-100"
            >
              {/* Category name */}
              <div className="px-3 pt-3">
                <div className="d-flex justify-content-between w-100 bg-white rounded-3 px-4 py-3 border fw-semibold overflow-x-auto shadow-sm">
                  <div className="d-flex">
                    <div className="cs-order active">
                      <span className="me-2">Hoa don 1</span>
                      <i className="fa fa-xmark"></i>
                    </div>
                    <div className="cs-order">
                      <span className="me-2">Hoa don 2</span>
                      <i className="fa fa-xmark"></i>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center align-items-center">
                    <a className="pointer">
                      <i className="fa fa-plus-circle fs-2"></i>
                    </a>
                  </div>
                </div>
              </div>
              {/* Products in category */}
              <div className="d-flex h-100 w-100">
                <div
                  style={{ width: "25%", height: "120px" }}
                  className="d-flex border rounded-3 bg-white m-3 shadow-sm p-2"
                >
                  <img
                    style={{ width: "30%" }}
                    src="https://product.hstatic.net/200000182297/product/3090418p1499dt_al621021932303010470p399dt_z103321512314910201p699dt_2__48b20874535c43eb804bc2f87f51a9e7_master.jpg"
                    alt=""
                  />
                  <div className="d-flex flex-column justify-content-between align-items-center ms-2 fw-semibold">
                    <p style={{ fontSize: "18px" }} className="m-0">
                      Ao da nau
                    </p>
                    <div className="d-flex">
                      <p className="m-0 text-danger">1.000.000đ</p>
                      <del style={{fontSize: '12px'}} className="ms-1 mt-0 mb-0 me-0 text-secondary">1.000.000đ</del>
                    </div>
                  </div>
                </div>
                <div
                  style={{ width: "25%", height: "120px" }}
                  className="d-flex border rounded-3 bg-white m-3 shadow-sm p-2"
                >
                  <img
                    style={{ width: "30%" }}
                    src="https://product.hstatic.net/200000182297/product/10_e5d080b216404e03b73eb068db0cb014_master.jpg"
                    alt=""
                  />
                  <div className="d-flex flex-column justify-content-between align-items-center ms-2 fw-semibold">
                    <p style={{ fontSize: "18px" }} className="m-0">
                      Ao da nau
                    </p>
                    <div className="d-flex">
                      <p className="m-0 text-danger">1.000.000đ</p>
                      <del style={{fontSize: '12px'}} className="ms-1 mt-0 mb-0 me-0 text-secondary">1.000.000đ</del>
                    </div>
                  </div>
                </div>
                <div
                  style={{ width: "25%", height: "120px" }}
                  className="d-flex border rounded-3 bg-white m-3 shadow-sm p-2"
                >
                  <img
                    style={{ width: "30%" }}
                    src="https://product.hstatic.net/200000182297/product/4_9b9b62ea47b54830a0af05cef65ba88b_master.jpg"
                    alt=""
                  />
                  <div className="d-flex flex-column justify-content-between align-items-center ms-2 fw-semibold">
                    <p style={{ fontSize: "18px" }} className="m-0">
                      Ao da nau
                    </p>
                    <div className="d-flex">
                      <p className="m-0 text-danger">1.000.000đ</p>
                      <del style={{fontSize: '12px'}} className="ms-1 mt-0 mb-0 me-0 text-secondary">1.000.000đ</del>
                    </div>
                  </div>
                </div>
                <div
                  style={{ width: "25%", height: "120px" }}
                  className="d-flex border rounded-3 bg-white m-3 shadow-sm p-2"
                >
                  <img
                    style={{ width: "30%" }}
                    src="https://product.hstatic.net/200000182297/product/3_13a51c6c04d04f818f70f02e784db963_master.jpg"
                    alt=""
                  />
                  <div className="d-flex flex-column justify-content-between align-items-center ms-2 fw-semibold">
                    <p style={{ fontSize: "18px" }} className="m-0">
                      Ao da nau
                    </p>
                    <div className="d-flex">
                      <p className="m-0 text-danger">1.000.000đ</p>
                      <del style={{fontSize: '12px'}} className="ms-1 mt-0 mb-0 me-0 text-secondary">1.000.000đ</del>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "30%" }} className="h-100 border-start">
              3
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
