import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { OrderModel } from '../../model/OrderMoldel';
import axios from 'axios';
import { Tag } from 'primereact/tag';

export default function Order() {
    const token = localStorage.getItem("authToken");
    const [orders, setOrders] = useState<OrderModel[]>([]);
    useEffect(() => {
        axios
          .get(`http://localhost:8081/orders/all-orders`, {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }) // API từ Spring Boot
          .then((response) => {
            setOrders(response.data.data);
            console.log(response.data.data);
          })
          .catch((error) => {
            console.log("There was an error fetching the products!", error);
          });
      }, []);
      const statusBodyTemplate = (order:OrderModel) => {
        return <Tag value={getStatus(order)} severity={getSeverity(order)}></Tag>;
    };

    const getStatus = (order:OrderModel) => {
        switch (order.status) {
            case '1':
                return 'Đã thanh toán';

            case '-1':
                return 'Đã hủy';
            default:
                return null;
        }
    };
    const getSeverity = (order:OrderModel) => {
        switch (order.status) {
            case '1':
                return 'info';

            case '-1':
                return 'danger';
            default:
                return null;
        }
    };
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(value);
    };
    return (
        <>
        <h3>Hóa đơn</h3>
        <div className="card">
            <DataTable value={orders} tableStyle={{ minWidth: '50rem' }}>
                <Column header="STT" body={(rowData, options) => options.rowIndex + 1}></Column>
                <Column field="customer.fullName" header="Khách hàng"></Column>
                <Column field="customer.phoneNumber" header="SDT"></Column>
                <Column field="createdDate" header="Ngày tạo"></Column>
                <Column header="Trạng thái" body={statusBodyTemplate}></Column>
                <Column
                        field="totalPrice"
                        header="Tổng tiền"
                        body={(rowData) => formatCurrency(rowData.totalPrice)}
                    ></Column>
            </DataTable>
        </div>
        </>       
  )
}
