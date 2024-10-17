import { InputText } from 'primereact/inputtext'
import { Menubar } from 'primereact/menubar';
import { TabMenu } from 'primereact/tabmenu';
import { TabPanel, TabView } from 'primereact/tabview';
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import { Form } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Invoice {
  id: number;
  products: Product[];
}

export default function Sale() {
  const [activeIndex, setActiveIndex] = useState(0); 
  const handleDeleteInvoice = (id: number) => {
    const updatedInvoices = invoices.filter(invoice => invoice.id !== id);
    setInvoices(updatedInvoices);

    
    if (activeIndex >= updatedInvoices.length) {
      setActiveIndex(updatedInvoices.length - 1);
    }
  };
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 1,
      products: [
        { id: 1, name: "Product A", quantity: 2, price: 10.0 },
        { id: 2, name: "Product B", quantity: 1, price: 20.0 },
      ],
    },
  ]);
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-home'
  },
  {
      label: 'Features',
      icon: 'pi pi-star'
  },
    
];
  return (
    <div className="container d-flex position-relative">
  <div className="page-header d-flex justify-content-between w-100">
    {/* Left section */}
    <div className="d-flex">
      <div className="left-div">
        <div className="d-flex">
          <InputText placeholder="Tìm sản phẩm" />
        </div>
      </div>
    </div>

    {/* Right section */}
    <div className="right-div d-flex">
      <div className="cart-tabs">
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          {/* Các tab của bạn sẽ ở đây */}
        </TabView>
      </div>
    </div>
  </div>

  {/* Page Content */}
  <div className="page-content mt-3">
    {invoices.map((invoice) => (
      <TabPanel
        key={invoice.id}
        header={
          <div className="d-flex justify-content-between align-items-center">
            <span>{`Order ${invoice.id}`}</span>
            <button
              className="btn btn-sm btn-link text-danger ms-2"
              style={{ fontSize: "0.8rem" }}
              onClick={() => handleDeleteInvoice(invoice.id)} // Thêm chức năng xóa
            >
              <i className="bi bi-x"></i>
            </button>
          </div>
        }
      >
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {invoice.products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>${(product.quantity * product.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </TabPanel>
    ))}
  </div>
</div>

  )
}
