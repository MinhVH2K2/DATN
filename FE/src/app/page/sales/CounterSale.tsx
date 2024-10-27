import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { InputText } from "primereact/inputtext";
import { TabPanel, TabView } from "primereact/tabview";
import React, { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import { CategoriRequest } from "../../model/CategoriModel";
import { Dialog } from "primereact/dialog";

export default function CounterSale() {
  // Autocomplete
  const [value, setValue] = useState<string>("");
  const [items, setItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [visible, setVisible] = useState(false);

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
  const [CategoriModel, setCategoriModel] = useState<CategoriRequest[]>([]);
   
   useEffect(() => {
      const token = localStorage.getItem('authToken');
      axios.get('http://localhost:8081/categori/getAll-categori',{
         headers: {
            Authorization: `Bearer ${token}` // Thêm token vào headers
         }
      })  // API từ Spring Boot
        .then(response => {
          setCategoriModel(response.data);
         console.log(CategoriModel);
        })
        .catch(error => {
          console.log('There was an error fetching the products!', error);
        });
    }, []);
    const handleActiveCategori = (id : any) => {
      setActiveCategory(id);
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
            <div className="d-flex align-items-center p-2">
              <AutoComplete
                value={value}
                suggestions={items}
                inputStyle={{ width: "448px", borderRadius: ".5rem" }}
                completeMethod={search}
                onChange={(e) => setValue(e.value)}
              />
              <a className="pointer text-white ms-3 fs-2">
                {/* <i className="fa fa-qrcode"></i> */}
                <i className="bi bi-upc-scan"></i>
              </a>
            </div>
          </div>
          <div
            style={{ width: "30%" }}
            className="d-flex justify-content-end align-items-center me-3"
          ></div>
          <div className="dropdown d-flex justify-content-end align-items-center mt-1 me-3">
            <button className="btn text-white" onClick={toggleMenu}>
              <i className="fa fa-bars fs-5"></i> {/* Icon nút menu */}
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
              {CategoriModel.map((category) => (
            <div 
            key={category.categoriesId}
            className={`cs-card shadow-1 ${activeCategory === category.categoriesId ? "active" : ""}`}
            onClick={() => handleActiveCategori(category.categoriesId)}
            >
               {category.categoriesName}
            </div>
         ))}
            </div>
            <div
              style={{ width: "55%", backgroundColor: "#f1f3f5" }}
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
              <div className="row" style={{ padding: "1.8rem" }}>
              <Dialog header="Header" visible={visible} maximizable style={{ width: '50vw' }} onHide={() => {if (!visible) return; setVisible(false); }}>
                <p className="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </Dialog>
                {/* product 1 */}                
                <div className="p-1 col-xl-3 col-lg-4 col-md-6 pointer" onClick={() => setVisible(true)}>
                  <div
                    style={{ height: "120px" }}
                    className="d-flex border rounded-3 bg-white shadow-sm p-2"
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
                        <del
                          style={{ fontSize: "12px" }}
                          className="ms-1 mt-0 mb-0 me-0 text-secondary"
                        >
                          800.000đ
                        </del>
                      </div>
                    </div>
                  </div>
                </div>
                {/* product 2 */}
                <div className="p-1 col-xl-3 col-lg-4 col-md-6 pointer pointer">
                  <div
                    style={{ height: "120px" }}
                    className="d-flex border rounded-3 bg-white shadow-sm p-2"
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
                        <del
                          style={{ fontSize: "12px" }}
                          className="ms-1 mt-0 mb-0 me-0 text-secondary"
                        >
                          1.000.000đ
                        </del>
                      </div>
                    </div>
                  </div>
                </div>
                {/* product 3 */}
                <div className="p-1 col-xl-3 col-lg-4 col-md-6 pointer pointer">
                  <div
                    style={{ height: "120px" }}
                    className="d-flex border rounded-3 bg-white shadow-sm p-2"
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
                        <del
                          style={{ fontSize: "12px" }}
                          className="ms-1 mt-0 mb-0 me-0 text-secondary"
                        >
                          1.000.000đ
                        </del>
                      </div>
                    </div>
                  </div>
                </div>
                {/* product 4 */}
                <div className="p-1 col-xl-3 col-lg-4 col-md-6 pointer pointer">
                  <div
                    style={{ height: "120px" }}
                    className="d-flex border rounded-3 bg-white shadow-sm p-2"
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
                        <del
                          style={{ fontSize: "12px" }}
                          className="ms-1 mt-0 mb-0 me-0 text-secondary"
                        >
                          1.000.000đ
                        </del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{ width: "35%" }}
              className="d-flex flex-column justify-content-between h-100 border-start"
            >
              <div>
                <div className="d-flex justify-content-between border-bottom p-2">
                  <div>
                    <button className="btn btn-light border fw-semibold me-2">
                      <i className="fa fa-plus me-2"></i>
                      Add customer
                    </button>
                    <button className="btn btn-light border">
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                  <div className="d-flex align-items-center fw-semibold">
                    <div className="form-check form-check-inline">
                      <input
                        checked
                        className="form-check-input pointer"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio1"
                        value="option1"
                      />
                      <label className="form-check-label">Tại quầy</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input pointer"
                        type="radio"
                        name="inlineRadioOptions"
                        id="inlineRadio2"
                        value="option2"
                      />
                      <label className="form-check-label">Đơn giao</label>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <div className="border rounded-3 d-flex justify-content-between p-2">
                    <div>
                      <a className="pointer">
                        <i className="fa fa-trash text-danger"></i>
                      </a>
                    </div>
                    {/* name size color product */}
                    <div style={{ maxWidth: "40%" }}>
                      <p className="fw-semibold m-0">
                        Ten san pham that dai xem co bi loi khong
                      </p>
                      <div className="d-flex align-items-center fw-semibold">
                        <div className="color-product bg-primary"></div>/Size: M
                      </div>
                    </div>
                    <div className="number-input">
                      <button className="minus fw-bold">-</button>
                      <input
                        className="fw-semibold"
                        type="number"
                        id="inputNumber"
                        value="2"
                      />
                      <button className="plus fw-bold">+</button>
                    </div>
                    <div className="text-center">
                      <p className="fw-semibold">900.000đ</p>
                      <del>
                        <small>1.000.000đ</small>
                      </del>
                    </div>
                    <div>
                      <p className="fw-semibold">1.800.000đ</p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{ backgroundColor: "rgb(241, 243, 245)" }}
                className="p-3 border m-3 rounded-3"
              >
                <div className="d-flex justify-content-between">
                  <p className="fw-semibold fs-4">Sub-total:</p>
                  <p className="fw-semibold fs-4 text-danger">2.000.000đ</p>
                </div>
                <div className="d-flex">
                  <div className="w-50 me-2">
                    <textarea
                      className="form-control"
                      placeholder="Ghi chú đơn hàng"
                    ></textarea>
                  </div>
                  <div className="w-50">
                    <button className="btn btn-primary w-100 h-100 fs-4 fw-semibold">
                      Proceed
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
