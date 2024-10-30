import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { CategoriModel } from "../../model/ProductModel";
import { OrderModel } from "../../model/OrderMoldel";
export default function CounterSale() {
  // Autocomplete
  const [value, setValue] = useState<string>("");
  const [items, setItems] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState<OrderModel[]>([new OrderModel("1", "1")]);
  const addNewOrder = () => {
    const newOrder = new OrderModel((order.length + 1).toString(), "newUserId"); // tạo Order mới
    setOrder([...order, newOrder]); // thêm Order mới vào danh sách
    console.log(order);
  };
  const deleteOrder = (orderId: string) => {
    const updatedOrders = order.filter((o) => o.orderId !== orderId);
    setOrder(updatedOrders);
  };

  const footerContent = (
    <div className="d-flex justify-content-center">
      <Button
        label="Đóng"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Xác nhận"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );
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
  const [CategoriModel, setCategoriModel] = useState<CategoriModel[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get("http://localhost:8081/categori/getAll-categori", {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
      }) // API từ Spring Boot
      .then((response) => {
        setCategoriModel(response.data);
        console.log(CategoriModel);
      })
      .catch((error) => {
        console.log("There was an error fetching the products!", error);
      });
  }, []);
  const handleActiveCategori = (id: any) => {
    setActiveCategory(id);
  };
  const handleActiveOrder = (id: any) => {
    setActiveOrder(id);
  };

  return (
    <>
      <Dialog
        header="Header"
        visible={visible}
        footer={footerContent}
        style={{ width: "35vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="d-flex">
          <div className="d-flex mt-2" style={{ width: "17%" }}>
            <p>Color:</p>
          </div>
          <div className="circle" style={{ backgroundColor: "red" }}></div>
        </div>
        <div className="d-flex mt-2">
          <div className="d-flex mt-2" style={{ width: "17%" }}>
            <p>Size:</p>
          </div>
          <div className="sizes">
            <div className="size">S</div>
            <div className="size">M</div>
            <div className="size">L</div>
            <div className="size">XL</div>
            <div className="size">2XL</div>
          </div>
        </div>
        <div className="d-flex">
          <div className="d-flex mt-2" style={{ width: "17%" }}>
            <p>Số lượng:</p>
          </div>
          <div className="number-input">
            <button className="minus fw-bold">-</button>
            <input
              className="fw-semibold"
              type="number"
              id="inputNumber"
              value="0"
            />
            <button className="plus fw-bold">+</button>
          </div>
        </div>
      </Dialog>

      <div style={{ height: "89vh" }} className="d-flex flex-column">
        <div className="flex-grow-10">
          <div className="d-flex h-100">
            {/* Category */}
            <div
              // style={{ width: "60%", backgroundColor: "#f1f3f5" }}
              style={{ width: "60%" }}
              className="h-100 border-end overflow-hidden pe-2"
            >
              {/* Category name */}
              <div className="px-3 pt-3 bg-white rounded-3 px-4 py-3 border fw-semibold shadow-sm">
                <div className="d-flex justify-content-between mb-2">
                  <h4>Hóa đơn chờ</h4>
                  <div className="d-flex justify-content-center align-items-center">
                    <a onClick={addNewOrder} className="pointer">
                      <i className="fa fa-plus-circle fs-2"></i>
                    </a>
                  </div>
                </div>
                <div className="w-100 overflow-x-auto">
                  <div className="d-flex">
                    {order.map((o) => (
                      <div
                        key={o.orderId}
                        className={`cs-order ${
                          activeOrder === o.orderId ? "active" : ""
                        }`}
                      >
                        <span
                          className="me-2"
                          onClick={() => handleActiveOrder(o.orderId)}
                        >
                          Hóa đơn {o.orderId}
                        </span>
                        <i
                          className="fa fa-xmark"
                          onClick={() => deleteOrder(o.orderId!)}
                        ></i>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Products in category */}
              <div className="row bg-white mt-3" style={{ padding: ".5rem" }}>
                {/* product list  */}
                {/* product 1 */}
                <h4>Danh sách sản phẩm</h4>
                <div
                  className="p-1 col-xl-3 col-lg-4 col-md-6 pointer"
                  onClick={() => setVisible(true)}
                >
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
              style={{ width: "40%" }}
              className="d-flex flex-column justify-content-between"
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
