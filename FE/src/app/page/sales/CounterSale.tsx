import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { ColorModel, ProductDetailModel, ProductModel, SizeModel } from "../../model/ProductModel";
import { DiscountModel, OrderItemModel, OrderModel } from "../../model/OrderMoldel";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store/store";
import { addOrder, addOrderItem,removeOrderItem, updateOrder, updateOrderItem } from "../../reducer/orderSlice";
import OrderToPdf from "./OrderToPdf ";
import { UserModel } from "../../model/LoginModel";
export default function CounterSale() {
  const dispatch = useDispatch();
  const order = useSelector((state: RootState) => state.order);
  const [count, setCount] = useState<number>(1);
  const [index, setIndex] = useState<number>(0);
  const [countOrder, setCountOrder] = useState<number>(1);
  const [value, setValue] = useState<number>(1);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [activeOrder, setActiveOrder] = useState<number>(0);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [ProductDetails, setProductDetails] = useState<ProductDetailModel[]>([]);
  const [selectedColor, setSelectedColor] = useState<ColorModel | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<SizeModel | undefined>(undefined);
  const [selectedProductDetail, setSelectedProductDetail] = useState<ProductDetailModel>(); 
  const [Products, setProducts] = useState<ProductModel[]>([]);
  const [productName, setProductName] = useState<string | undefined>();
  const [customerPaidAmount, setCustomerPaidAmount] = useState<number | ''>('');
  const [changeAmount, setChangeAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [discounts, setDiscounts] = useState<DiscountModel[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<DiscountModel | null>();
  const [customers , setCustomers] = useState<UserModel[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<UserModel | null>();
  const token = localStorage.getItem("authToken");
  const orderPending = order.orders.filter(order => order.status=== "0");
  useEffect(() => {
    const index = order.orders.findIndex(order => order.orderId === activeOrder); 
    setIndex(index);
  },[activeOrder]);
  const addNewOrder = () => {
    const newOrder: OrderModel = {
      orderId: countOrder,
      status: "0" ,
      createdDate: new Date(),
      createdBy: "Admin",
    }// tạo Order mới
    dispatch(addOrder(newOrder));
    setCountOrder(countOrder+1);
  };
  const handleUpdateOrderItem = (orderId: number, orderItemId: number, quantity: number) => {
    if(quantity > 0)  dispatch(updateOrderItem({ orderId, orderItemId, quantity }));    
    setValue(quantity);
  };
  const deleteOrder = (orderId: number) => {  
    setActiveOrder(-1); 
    const index = order.orders.findIndex(order => order.orderId === activeOrder); 
      let selectedItem = order.orders[index] ;
      selectedItem = {...selectedItem,       
        status: "-1"
      } ;
    dispatch(updateOrder(selectedItem));
     
  };
  const handleRemoveOrderItem  = (orderItemId: number) => {   
    dispatch(removeOrderItem({orderId: activeOrder,orderItemId})); 
    setValue(value-1);
  };
  useEffect(() => {
    axios
      .get("http://localhost:8081/product/getall", {
        headers: {
          Authorization: `Bearer ${token}`, 
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
  useEffect(() => {
    axios
      .get("http://localhost:8081/getallcustomer", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }) // API từ Spring Boot
      .then((response) => {
        setCustomers(response.data.data);
        // console.log(response.data.data);
        
      })
      .catch((error) => {
        console.log("There was an error fetching the products!", error);
      });
    }, []);
    const handleActiveOrder = (id: any) => {
    setActiveOrder(id);
    setCustomerPaidAmount('');
    setChangeAmount(0);
    setValue(0);
    setSubtotal(0);
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
  }, [selectedColor, selectedSize, ProductDetails, subtotal])

  useEffect(() => {    
    if (order.orders[index]?.orderItems) {
      const calculatedSubtotal = order.orders[index].orderItems?.reduce(
        (sum, item) => sum + (item.totalPrice||0),0
      ) || 0;
      const discountValue = selectedDiscount?.discountValue || 0;
      setSubtotal(calculatedSubtotal - discountValue);
    }
    else { setSubtotal(0)};
  }, [value, activeOrder,selectedProductDetail,selectedDiscount,index]);

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
        orders: order.orders[index],
        productDetail: selectedProductDetail,
        productName: productName,
        quantity: value,
        unitPrice: unitPrice,
        discountPrice: 0,
        totalPrice: unitPrice * value
    };
      dispatch(addOrderItem({ orderId:activeOrder, item: newItem }));   
      setValue(0); 
      setSubtotal(0); 
      setVisible(false);
      console.log(order);
    };
    const handleProceed = () => {
      
      if(index>=0){
      let selectedItem = order.orders[index] ;
      selectedItem = {...selectedItem,
        discounts: selectedDiscount?? undefined,
        totalPrice: subtotal,
        status: "1",
        customer: selectedCustomer?? undefined
      } ;
      dispatch(updateOrder(selectedItem));   
      setVisible1(true);     
      }
      else setVisible1(false);
      
    };

    const handleConfirmPayment = () => {    
      let selectedItem = order.orders[index];
      
      axios
        .post("http://localhost:8081/orders/add-orders", selectedItem, {
          headers: {
            Authorization: `Bearer ${token}`,
           
          },
        })
        .then((response) => {
          console.log(response.data);
          console.log(selectedItem);
        })
        .catch((error) => {
          console.log("There was an error fetching the products!", error);
          console.log(selectedItem);
        });
      setVisible1(false);
      setIndex(-1);
      setSubtotal(0);
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
  const footerContent1 = (
    <div className="d-flex justify-content-center">    
      <Button
        label="Xác nhận"
        icon="pi pi-check"
        onClick={handleConfirmPayment}   
        autoFocus
      />
    </div>
  );
  
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get("http://localhost:8081/discounts/all-discounts", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }) // API từ Spring Boot
      .then((response) => {
        setDiscounts(response.data.content);
        // console.log(response.data.content);
      })
      .catch((error) => {
        console.log("Lỗi khi lấy khuyến mại!", error);
      });
  }, []);
  const handleDiscountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = (event.target.value);
    const discount = discounts.find(d => d.discountId === selectedId);
    if (discount) {     
      if (selectedDiscount?.discountId !== discount.discountId) {
        setSelectedDiscount(discount);       
      }
    } else {     
      console.log('Discount not found');     
      setSelectedDiscount(null); 
    }   
  };
  const handleCustomerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = (event.target.value);
    const customer = customers.find(c => c.id === selectedId);
    if (customer) {     
      if (selectedCustomer?.id !== customer.id) {
        setSelectedCustomer(customer);       
      }
    } else {     
      console.log('Customer not found');     
      setSelectedCustomer(null); 
    }   
    console.log(selectedCustomer);
  };
  // Tính tổng tiền sau giảm giá
  const handleCustomerPaidChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const paidAmount = parseFloat(event.target.value);
    setCustomerPaidAmount(paidAmount);
    
    // Tính tiền thừa trả lại khách
    const calculatedChangeAmount = paidAmount - subtotal;
    setChangeAmount(calculatedChangeAmount > 0 ? calculatedChangeAmount : 0);
  };
  return (
    <>
    <Dialog       
        visible={visible1}  
        footer={footerContent1}     
        style={{ width: "50vw"}}
        onHide={() => {
          if (!visible1) return;
          setVisible1(false);         
        }}
      >
       {index >= 0 && <OrderToPdf order={order.orders[index]} />}
        
      </Dialog>   
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
                    {orderPending.map((o) => (
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
              <h4>Giỏ hàng</h4> 
              <div className="" style={{minHeight: 300}}>
                {order.orders[index]?.orderItems?.map((orderItem) => (
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
                              background: orderItem.productDetail?.colors?.colorCode || "transparent",
                            }}
                          ></div>
                          /Size: {orderItem.productDetail?.sizes?.sizesName || "N/A"}
                        </div>
                      </div>
                      <div className="number-input">
                        <button className="minus fw-bold" onClick={()=>{handleUpdateOrderItem(activeOrder,orderItem.orderItemId||0,(orderItem.quantity || 0)-1)}}>-</button>
                        <input
                          className="fw-semibold"
                          type="number"
                          id="inputNumber"
                          value={orderItem.quantity || 1} // Giá trị mặc định là 1 nếu quantity bị null
                        />
                        <button className="plus fw-bold" onClick={()=>{handleUpdateOrderItem(activeOrder,orderItem.orderItemId||0,(orderItem.quantity || 0)+1)}}>+</button>
                      </div>
                      <div className="text-center fw-semibold d-flex flex-column ">
                        <span>
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((orderItem.unitPrice||0))} 
                        </span>                      
                        {/* <p className="fw-semibold">{orderItem.unitPrice || 0} đ</p> */}
                        <del>
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((orderItem.discountPrice||0))}
                          {/* <small>{orderItem.discountPrice || 0} đ</small> */}
                        </del>
                      </div>
                      <div>                      
                        <p className="fw-semibold">                    
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((orderItem.totalPrice||0))}
                        </p>
                      </div>
                    </div>
                  </div>
                )) || <p>Giỏ hàng trống</p> }
                </div>             
             
                {/* product list  */}                
                <h4>Danh sách sản phẩm</h4>
                <div className="d-flex mt-1 md-3">
                <input className="form-control " style={{width: '50%'}}
                  type="text"
                  id="findProduct"
                  value={customerPaidAmount}
                  onChange={handleCustomerPaidChange}
                  placeholder="Tìm sản phẩm"
                />
                <button className="btn btn-primary ms-2">Tìm kiếm</button>
                </div>
                  {/* product 1 */}
                {Products.map((product) => (                  
                  <div
                  key={product.productId}
                  className="p-1 col-xl-3 col-lg-4 col-md-6 pointer mt-2"                 
                  onClick={() =>{ handleGetProductDetail(product.productDetails);
                                  setProductName(product.productName);
                                  setUnitPrice(product.unitPrice||0);
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
                        <p className="m-0 text-danger">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((product.unitPrice||0))} 
                          {/* {product.unitPrice} */}
                        </p>
                        <del
                          style={{ fontSize: "12px" }}
                          className="ms-1 mt-0 mb-0 me-0 text-secondary"
                        >
                          {/* {product.unitPrice} */}
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
              <div className="ms-3">
              <h3>Thông tin hóa đơn</h3>
                <div className="d-flex justify-content-between border-bottom p-2">
                  <div>
                    <select className="mt-3"
                    id="customerSelect"     
                    onChange={handleCustomerChange}             
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', marginBottom: '15px' }}
                  >
                    {customers.map(customer => (
                      <option key={customer.id} value={customer.id}>
                        {customer.fullName} {customer.phoneNumber}
                     
                      </option>
                    ))}
                  </select>
                    <button className="btn btn-light border fw-semibold me-2">
                      <i className="fa fa-plus me-2"></i>
                      Add customer
                    </button>
                    <button className="btn btn-light border">
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                  {/* <div className="d-flex align-items-center fw-semibold">
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
                  </div> */}
                </div>
                
                <label htmlFor="discountSelect" className="mt-3">Chọn khuyến mại:</label>
                <select className="mt-3"
                  id="discountSelect"
                  onChange={handleDiscountChange}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', marginBottom: '15px' }}
                >
                  {discounts.map(discount => (
                    <option key={discount.discountId} value={discount.discountId}>
                      {discount.description} 
                    </option>
                  ))}
                </select>
                {selectedDiscount && (
                  <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
                    <i className="fa fa-wallet" style={{ fontSize: '2rem', marginRight: '10px' }}></i>
                    <div>
                      <p>Khuyến mại: {selectedDiscount.description||""}</p>
                      <p>Giá trị: {selectedDiscount.discountValue.toLocaleString()} đ</p>
                      <p>Ngày hết hạn: {selectedDiscount ? selectedDiscount.endDate.toString() : 'Không có ngày hết hạn'}</p>
                    </div>
                  </div>
                )}

            
                <label htmlFor="customerPaidAmount" className="mt-2">Tiền khách đưa:</label>
                <input className="form-control mt-2"
                  type="number"
                  id="customerPaidAmount"
                  value={customerPaidAmount}
                  onChange={handleCustomerPaidChange}
                  placeholder="Nhập số tiền khách đưa"
                />

                {/* Tiền thừa trả khách */}
                <div className="mt-3">Tiền thừa trả khách: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(changeAmount)}</div>
      
                <div style={{ marginTop: '15px' }}>
                  <label htmlFor="paymentMethod">Phương thức thanh toán</label>
                  <select
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '4px', marginTop: '5px' }}
                  >
                    <option value="">Chọn phương thức thanh toán</option>
                    <option value="vnpay">VNPAY</option>
                    <option value="momo">MoMo</option>
                    <option value="cash">Tiền mặt</option>
                  </select>
                  </div>
               
              </div>
              <div
                style={{ backgroundColor: "rgb(241, 243, 245)" }}
                className="p-3 border m-3 rounded-3"
              >
                <div className="d-flex justify-content-between">
                  <p className="fw-semibold fs-4">Tổng tiền:</p>
                  <p className="fw-semibold fs-4 text-danger"> 
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format((subtotal||0))}</p>
                </div>
                <div className="d-flex">
                  <div className="w-50 me-2">
                    <textarea
                      className="form-control"
                      placeholder="Ghi chú đơn hàng"
                    ></textarea>
                  </div>
                  <div className="w-50">
                    <button className="btn btn-primary w-100 h-100 fs-4 fw-semibold" onClick={handleProceed}>
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
