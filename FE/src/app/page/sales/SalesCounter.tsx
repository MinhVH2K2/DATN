import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import { Button, Modal, Form } from 'react-bootstrap';

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

function SalesScreen() {
  const [show, setShow] = useState(false); 
  const handleShow = () => setShow(true); 
  const handleClose = () => setShow(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Product A",
      quantity: 10,
      price: 20.0,
    },
    {
      id: 2,
      name: "Product b",
      quantity: 11,
      price: 20.0,
    },
    {
      id: 3,
      name: "Product c",
      quantity: 14,
      price: 20.0,
    },
    {
      id: 4,
      name: "Product d",
      quantity: 15,
      price: 20.0,
    },
  ]);
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: 1,
      products: [
        { id: 1, name: "Product A", quantity: 2, price: 10.0 },
        { id: 2, name: "Product B", quantity: 1, price: 20.0 },
      ],
    },
  ]);
  const [activeIndex, setActiveIndex] = useState(0); 
  const MAX_ORDERS = 5;

  
  const handleAddInvoice = () => {
    if (invoices.length >= MAX_ORDERS) {
      alert("Bạn chỉ có thể thêm tối đa 10 hóa đơn.");
      return;
    }

    const newInvoice: Invoice = {
      id: invoices.length + 1,
      products: [
        { id: 1, name: "Product A", quantity: 1, price: 10.0 }, 
      ],
    };
    setInvoices([...invoices, newInvoice]);
    setActiveIndex(invoices.length); 
  };

  
  const handleDeleteInvoice = (id: number) => {
    const updatedInvoices = invoices.filter(invoice => invoice.id !== id);
    setInvoices(updatedInvoices);

    
    if (activeIndex >= updatedInvoices.length) {
      setActiveIndex(updatedInvoices.length - 1);
    }
  };

  return (
    <div className="container ">
      <div className="row">
        {/* Cột chứa TabView */}
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-2">
            {/* TabView */}
            <div className="position-relative w-100">
              <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                {invoices.map((invoice) => (
                  <TabPanel
                    key={invoice.id}
                    header={
                      <div className="d-flex justify-content-between align-items-center">
                        <span>{`Order ${invoice.id}`}</span>
                       
                        <button
                          className="btn btn-sm btn-link text-danger ms-2"
                          style={{ fontSize: "0.8rem" }} 
                          onClick={(e) => {
                            e.stopPropagation(); // Ngăn chọn tab khi bấm xóa
                            handleDeleteInvoice(invoice.id);
                          }}
                        >
                          <i className="bi bi-x"></i>
                        </button>
                      </div>
                    }
                  >
                    {/* Bảng giỏ hàng */}
                    <div >
                    <a onClick={handleShow} className="btn btn-primary ">Chọn sản phẩm</a>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Tìm kiếm sản phẩm</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          {/* Form tìm kiếm sản phẩm */}
                          <Form>
                            <Form.Group controlId="searchProduct">
                              <Form.Label>Nhập tên sản phẩm</Form.Label>
                              <Form.Control type="text" placeholder="Tên sản phẩm" />
                            </Form.Group>
                          </Form>
                          <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Product Name</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Price</th>                          
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.quantity}</td>
                            <td>${product.price.toFixed(2)}</td>
                            
                            <Button variant="secondary" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', borderRadius: '5px' }} >
                            +
                          </Button>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Đóng
                          </Button>
                          <Button variant="primary">
                            Tìm kiếm
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                    
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
              </TabView>
                
             
              <button
                className="btn btn-primary position-absolute"
                onClick={handleAddInvoice}
                disabled={invoices.length >= MAX_ORDERS} 
                style={{
                  top: "5px", 
                  right: "10px",
                  zIndex: 10, 
                }}
              >
                <i className="bi bi-plus-lg"></i>
              </button>
              
            </div>
          </div>
        </div>

        {/* form thanh toán */}
        <div className="col-md-4">
          <form className="bg-light p-3 rounded">
            <h5>Thông tin thanh toán</h5>

            <div className="mb-3">
              <label htmlFor="customerName" className="form-label">Tên khách hàng</label>
              <input type="text" className="form-control" id="customerName" placeholder="Nhập tên khách hàng" />
            </div>

            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Số điện thoại</label>
              <input type="text" className="form-control" id="phoneNumber" placeholder="Nhập số điện thoại" />
            </div>

            <div className="mb-3">
              <label  className="form-label">Tổng hóa đơn</label>
              <input type="text" className="form-control" id="address" disabled />
            </div>
            
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Tiền khách đưa</label>
              <input type="text" className="form-control" id="phoneNumber" placeholder="Nhập tiền khách đưa" />
            </div>
            

            <button type="submit" className="btn btn-success w-100">Xác nhận thanh toán</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalesScreen;
