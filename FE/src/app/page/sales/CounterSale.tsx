import {
  AutoComplete,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { CategoriModel, ColorModel, ProductDetailModel, ProductModel, SizeModel } from "../../model/ProductModel";
import { OrderItemModel, OrderModel } from "../../model/OrderMoldel";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store/store";
import { addOrder, addOrderItem, removeOrder,removeOrderItem } from "../../reducer/orderSlice";
export default function CounterSale() {
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.order);
  const [count, setCount] = useState<number>(1);
  const [value, setValue] = useState<number>(1);
  const [activeOrder, setActiveOrder] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const [ProductDetails, setProductDetails] = useState<ProductDetailModel[]>([]);
  const [selectedColor, setSelectedColor] = useState<ColorModel | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<SizeModel | undefined>(undefined);
  const [selectedProductDetail, setSelectedProductDetail] = useState<ProductDetailModel>(); // State để lưu trữ ProductDetail được chọn
  const [Products, setProducts] = useState<ProductModel[]>([]);
  const [productName, setProductName] = useState<string | undefined>();
  
  const addNewOrder = () => {
    const newOrder = new OrderModel((order.orders.length + 1), "newUserId"); // tạo Order mới
    dispatch(addOrder(newOrder));
  };
  
  const deleteOrder = (orderId: number) => {   
    dispatch(removeOrder(orderId));
  };
  const handleRemoveOrderItem  = (orderItemId: number) => {   
    dispatch(removeOrderItem({orderId: activeOrder,orderItemId}));
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get("http://localhost:8081/product/getall", {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào headers
        },
      }) // API từ Spring Boot
      .then((response) => {
        setProducts(response.data.data.content);
        // console.log(response.data.data.content);
      })
      .catch((error) => {
        console.log("There was an error fetching the products!", error);
      });
  }, [activeOrder,order]);
    const handleActiveOrder = (id: any) => {
    setActiveOrder(id);
  };
  const handleGetProductDetail = (productDetails: any) => {  
    setProductDetails(productDetails);
    setVisible(true);
  };
  
  useEffect(() => {
    if (selectedColor && selectedSize) {
      const foundProductDetail = ProductDetails.find(
        (productDetail) =>
          productDetail.colors?.colerId === selectedColor.colerId &&
          productDetail.sizes?.sizesId === selectedSize.sizesId
      );
      setSelectedProductDetail(foundProductDetail);
    }
  }, [selectedColor, selectedSize, ProductDetails]);

  const handleMinus = () => {
    if (value > 1){setValue(value-1);}     
  };
  const handlePlus = () => {
    if (selectedProductDetail?.quantity && value < selectedProductDetail.quantity) {
      setValue(value + 1);     
    }     
  };
  
  const uniqueColors = Array.from(
    new Set(ProductDetails.map((product) => product.colors?.colorCode))
  ).map((colorCode) => {
    return ProductDetails.find((product) => product.colors?.colorCode === colorCode)?.colors;
  });

  const uniqueSizes = Array.from(
    new Set(ProductDetails.map((product) => product.sizes?.sizesName))
  ).map((sizeName) => {
    return ProductDetails.find((product) => product.sizes?.sizesName === sizeName)?.sizes;
  });
  const availableSizes = selectedColor
  ? ProductDetails.filter((product) => product.colors?.colorCode === selectedColor.colorCode)
      .map((product) => product.sizes)
  : uniqueSizes;

  const availableColors = selectedSize
    ? ProductDetails.filter((product) => product.sizes?.sizesName === selectedSize.sizesName)
        .map((product) => product.colors)
    : uniqueColors;

  const handleConfirm = () => {
      console.log("Selected Product Detail:", selectedProductDetail); 
      setCount(count+1);
      const newItem: OrderItemModel = {
        orderItemId: count, 
        orderId: activeOrder,
        productDetailId: selectedProductDetail,
        productName: productName,
        quantity: value,
        unitPrice: 50,
        discountPrice: 0,
        totalPrice: 100,
    };
      dispatch(addOrderItem({ orderId:activeOrder, item: newItem }));   
      setVisible(false);
      setValue(0);  
      console.log(order);
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
        onClick={handleConfirm}   
        autoFocus
      />
    </div>
  );

  return (
    <>
      <Dialog
        header= {productName}
        visible={visible}
        footer={footerContent}
        style={{ width: "35vw",textAlign: "center"}}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="d-flex">
        <div className="d-flex mt-2" style={{ width: "17%" }}>
          <p>Color:</p>
        </div>
        <div className="d-flex">
          {availableColors.map((color) => (
            <div
              key={color?.colerId}
              className={`circle ${selectedColor === color ? "selected" : ""}`}
              style={{
                backgroundColor: color?.colorCode,
                border: selectedColor === color ? "2px solid blue" : "1px solid gray",
              }}
              onClick={() => {
                setSelectedColor(color);   
                setSelectedSize(undefined);            
              }}
            >
              <p>{color?.colorName}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex mt-2">
        <div className="d-flex mt-2" style={{ width: "17%" }}>
          <p>Size:</p>
        </div>
        <div className="d-flex">
          {availableSizes.map((size) => (
            <div
              key={size?.sizesId}
              className={`size ${selectedSize === size ? "selected" : ""}`}
              style={{
                border: selectedSize === size ? "2px solid blue" : "1px solid gray",
              }}
              onClick={() => {
                setSelectedSize(size);
                // setSelectedColor(undefined); 
              }}
            >
              {size?.sizesName}
            </div>
          ))}
        </div>
      </div>
      <div className="d-flex">
        <div className="d-flex mt-2" style={{ width: "17%" }}>
          <p>Số lượng:</p>
        </div>
        <div className="number-input">
          <button className="minus fw-bold" onClick={handleMinus}>-</button>
          <input
            className="fw-semibold"
            type="number"
            id="inputNumber"
            value={value}                    
          />
          <button className="plus fw-bold" onClick={handlePlus}>+</button>
        </div>
      </div>
      <div className="d-flex mt-2">
        <p className="">Số lượng tồn: </p>
        <span className="ms-5 ">{selectedProductDetail?.quantity}</span>
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
                    {order.orders.map((o) => (
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
              
              <div className="row bg-white mt-3" style={{ padding: ".5rem" }}>
                {/* product list  */}                
                <h4>Danh sách sản phẩm</h4>
                  {/* product 1 */}
                {Products.map((product) => (                  
                  <div
                  key={product.productId}
                  className="p-1 col-xl-3 col-lg-4 col-md-6 pointer"                 
                  onClick={() =>{ handleGetProductDetail(product.productDetails);
                                  setProductName(product.productName);
                  }}
                >
                  <div
                    style={{ height: "120px" }}
                    className="d-flex border rounded-3 bg-white shadow-sm p-2"
                  >
                    <img
                      style={{ width: "30%" }}
                      src= {product.thumbnail}
                      alt=""
                    />
                    <div className="d-flex flex-column justify-content-between align-items-center ms-2 fw-semibold">
                      <p style={{ fontSize: "18px" }} className="m-0">
                        {product.productName}
                      </p>
                      <div className="d-flex">
                        <p className="m-0 text-danger">{product.discountPrice}</p>
                        <del
                          style={{ fontSize: "12px" }}
                          className="ms-1 mt-0 mb-0 me-0 text-secondary"
                        >
                          {product.unitPrice}
                        </del>
                      </div>
                    </div>
                  </div>
                </div> 
                ))}
                
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
              
                {order.orders[activeOrder-1]?.orderItems?.map((orderItem) => (
                  <div className="p-2" key={orderItem.orderItemId}>
                    <div className="border rounded-3 d-flex justify-content-between p-2">
                      <div>
                        <a className="pointer" onClick={()=>{handleRemoveOrderItem(orderItem.orderItemId ||0)}}>
                          <i className="fa fa-trash text-danger" ></i>
                        </a>
                      </div>
                      {/* name size color product */}
                      <div style={{ maxWidth: "40%" }}>
                        <p className="fw-semibold m-0">
                          {orderItem.productName || "Tên sản phẩm không khả dụng"}
                        </p>
                        <div className="d-flex align-items-center fw-semibold">
                          <div
                            className="color-product" 
                            style={{
                              background: orderItem.productDetailId?.colors?.colorCode || "transparent",
                            }}
                          ></div>
                          /Size: {orderItem.productDetailId?.sizes?.sizesName || "N/A"}
                        </div>
                      </div>
                      <div className="number-input">
                        <button className="minus fw-bold">-</button>
                        <input
                          className="fw-semibold"
                          type="number"
                          id="inputNumber"
                          value={orderItem.quantity || 1} // Giá trị mặc định là 1 nếu quantity bị null
                        />
                        <button className="plus fw-bold">+</button>
                      </div>
                      <div className="text-center">
                        <p className="fw-semibold">{orderItem.unitPrice || 0} đ</p>
                        <del>
                          <small>{orderItem.discountPrice || 0} đ</small>
                        </del>
                      </div>
                      <div>                      
                        <p className="fw-semibold">                    
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((orderItem.unitPrice || 0) * (orderItem.quantity || 0))}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                
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
