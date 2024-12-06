import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useEffect, useState } from "react";
import { OrderModel } from "../../model/OrderMoldel";
import axios from "axios";
import { Tag } from "primereact/tag";

export default function Order() {
  const token = localStorage.getItem("authToken");
  const [orders, setOrders] = useState<OrderModel[]>([]);
  const [totalProducts, setTotalProducts] = useState(0); // Quản lý tổng số sản phẩm

  useEffect(() => {
    axios
      .get(`http://localhost:8081/orders/all-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }) // API từ Spring Boot
      .then((response) => {
        const data = response.data.data;
        setOrders(data);
      })
      .catch((error) => {
        console.log("There was an error fetching the orders!", error);
      });
  }, []);

  const statusBodyTemplate = (order: OrderModel) => {
    return <Tag value={getStatus(order)} severity={getSeverity(order)}></Tag>;
  };

  const getStatus = (order: OrderModel) => {
    switch (order.status) {
      case "1":
        return "Đã thanh toán";

      case "-1":
        return "Đã hủy";
      default:
        return null;
    }
  };

  const getSeverity = (order: OrderModel) => {
    switch (order.status) {
      case "1":
        return "info";

      case "-1":
        return "danger";
      default:
        return null;
    }
  };

  return (
    <>
      {/* Bảng danh sách hóa đơn */}
      <div className="w-full">
        <h3 className="text-2xl">Thông tin Hóa đơn</h3>
      </div>
      <div className="card mt-3">
        <DataTable value={orders} tableStyle={{ minWidth: "50rem" }}>
          <Column
            header="STT"
            body={(rowData, options) => options.rowIndex + 1}
          ></Column>
          <Column field="customer.fullName" header="Khách hàng"></Column>
          <Column field="customer.phoneNumber" header="SDT"></Column>
          <Column field="createdDate" header="Ngày tạo"></Column>
          <Column header="Trạng thái" body={statusBodyTemplate}></Column>
          <Column field="totalPrice" header="Tổng tiền"></Column>
        </DataTable>
      </div>
    </>
  );
}
