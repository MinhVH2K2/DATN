import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ProductDetailModel, ProductModel } from "../../model/ProductModel";
import { OrderItemModel, OrderModel } from "../../model/OrderMoldel";

interface OrderItem {
  quantity: number;
  price: number; // Giả sử mỗi item có thuộc tính price
}

interface Order {
  id: string;
  items?: OrderItem[];
  totalPrice: number; // Giả sử mỗi đơn hàng có tổng số tiền trong totalAmount
}

export default function Statistical() {
  const [totalProducts, setTotalProducts] = useState<number | null>(null);
  const [totalRevenue, setTotalRevenue] = useState<number | null>(null); // State lưu tổng số tiền
  const navigate = useNavigate();
  const [Products, setProducts] = useState<ProductModel[]>([]);
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [productName, setProductName] = useState<string | undefined>();
  const token = localStorage.getItem("authToken");
  const [ProductDetails, setProductDetails] = useState<ProductDetailModel[]>(
    []
  );
  const [visible, setVisible] = useState(false);
  const handleGetProductDetail = (productDetails: any) => {
    setProductDetails(productDetails);
    setVisible(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    axios
      .get("http://localhost:8081/product/getall/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data?.data?.content || [];
        console.log("API Response: ", data); // Log toàn bộ dữ liệu để kiểm tra

        // Tính tổng số lượng sản phẩm và tổng doanh thu từ orderItems trong OrderModel
        const { totalProductsCalc, totalRevenueCalc, updatedProducts } =
          data.reduce(
            (
              acc: {
                totalProductsCalc: number;
                totalRevenueCalc: number;
                updatedProducts: any[];
              },
              product: any
            ) => {
              // Tính tổng số lượng và doanh thu từ OrderItemModel trong OrderModel
              const { totalQuantity, revenue } = product.orders?.reduce(
                (
                  orderAcc: { totalQuantity: number; revenue: number },
                  order: OrderModel
                ) => {
                  order.orderItems?.forEach((orderItem: OrderItemModel) => {
                    if (
                      orderItem.productDetail?.products === product.productId
                    ) {
                      orderAcc.totalQuantity += orderItem.quantity || 0; // Tổng số lượng bán được
                      orderAcc.revenue +=
                        orderItem.totalPrice ||
                        (orderItem.quantity || 0) * (orderItem.unitPrice || 0); // Tổng doanh thu
                    }
                  });
                  return orderAcc;
                },
                { totalQuantity: 0, revenue: 0 }
              ) || { totalQuantity: 0, revenue: 0 };

              // Cập nhật tổng số lượng và doanh thu
              acc.totalProductsCalc += totalQuantity;
              acc.totalRevenueCalc += revenue;

              // Thêm thông tin tổng số lượng và doanh thu vào sản phẩm
              acc.updatedProducts.push({
                ...product,
                totalQuantity,
                revenue,
              });

              return acc;
            },
            {
              totalProductsCalc: 0,
              totalRevenueCalc: 0,
              updatedProducts: [],
            }
          );

        // Cập nhật state
        setProducts(updatedProducts); // Danh sách sản phẩm với dữ liệu đã tính toán
        setTotalProducts(totalProductsCalc); // Lưu tổng số lượng sản phẩm
        setTotalRevenue(totalRevenueCalc); // Lưu tổng doanh thu
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [token]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get(`http://localhost:8081/orders/all-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const orders: Order[] = response.data.data;
        // Tính tổng số lượng sản phẩm bán được
        const productCount = orders.length;
        // Tính tổng doanh thu từ tổng số tiền của các đơn hàng
        const revenue = orders.reduce(
          (sum, order) => sum + (order.totalPrice || 0),
          0
        );

        setTotalProducts(productCount);
        setTotalRevenue(revenue); // Cập nhật tổng doanh thu
        // console.log("Calculated Product Count:", productCount);
        // console.log("Calculated Total Revenue:", revenue);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);
  // product

  return (
    <>
      <div className="pagetitle">
        <h1>Statistical</h1>
      </div>
      <section className="section dashboard">
        <div className="row">
          {/* Card hiển thị tổng số lượng sản phẩm */}
          <div className="col-xxl-4 col-md-6">
            <div className="card info-card shadow-md sales-card">
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown">
                  <i className="bi bi-three-dots"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Today
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      This Month
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      This Year
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  Sales <span>| Today</span>
                </h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-cart"></i>
                  </div>
                  <div className="ps-3">
                    <h6>
                      {totalProducts !== null && totalProducts > 0
                        ? totalProducts
                        : "No products sold"}
                    </h6>
                    <span className="text-muted small pt-2 ps-1">Product</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card hiển thị tổng số tiền doanh thu */}
          <div className="col-xxl-4 col-md-6">
            <div className="card info-card shadow-md revenue-card">
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown">
                  <i className="bi bi-three-dots"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Today
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      This Month
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      This Year
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  Revenue <span>| This Month</span>
                </h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-currency-dollar"></i>
                  </div>
                  <div className="ps-3">
                    <h6>
                      $
                      {totalRevenue !== null && totalRevenue > 0
                        ? totalRevenue.toLocaleString() // Định dạng số tiền
                        : "No revenue"}
                    </h6>
                    <span className="text-success small pt-1 fw-bold">8%</span>
                    <span className="text-muted small pt-2 ps-1">increase</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* end card doanh thu*/}
          <div className="col-12">
            <div className="card top-selling overflow-auto">
              <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown">
                  <i className="bi bi-three-dots"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                  <li className="dropdown-header text-start">
                    <h6>Filter</h6>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Today
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      This Month
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      This Year
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body pb-0">
                <h5 className="card-title">
                  Top Selling <span>| Today</span>
                </h5>
                <table className="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">Preview</th>
                      <th scope="col">Product</th>
                      <th scope="col">Price</th>
                      <th scope="col">Sold</th>
                      <th scope="col">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.isArray(Products) && Products.length > 0 ? (
                      Products.map((product) => (
                        <tr key={product.productId}>
                          {/* Ảnh sản phẩm */}
                          <td>
                            <img
                              src={
                                product.thumbnail ||
                                "assets/img/default-product.jpg"
                              }
                              alt={product.productName}
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                          </td>
                          {/* Tên sản phẩm */}
                          <td>{product.productName}</td>
                          {/* Giá */}
                          <td>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(product.unitPrice || 0)}
                          </td>
                          {/* Tổng số lượng đã bán */}
                          <td>{product.totalQuantity || 0}</td>
                          {/* Doanh thu */}
                          <td>
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(product.revenue || 0)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="text-center" colSpan={5}>
                          No products available.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              {/* end prodcut */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
