import React, { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { OrderModel } from '../../model/OrderMoldel';


const OrderToPdf = ({ order }: { order: OrderModel }) => {
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = pdfRef.current;
    if (!element) return;

    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190; // PDF width
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(data, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`order_${order.orderId}.pdf`);
  };
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return ''; // Kiểm tra nếu ngày không tồn tại
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };
  return (
    <div>
      <div ref={pdfRef} style={{ padding: '20px', background: '#f5f5f5' }}>
        <h2>Thông tin Đơn hàng</h2>
        <p><strong>Mã đơn hàng:</strong> {order.orderId}</p>
        <p><strong>Ngày tạo:</strong> {formatDate(order.createdDate?.toString())}</p>
        <p><strong>Tên khách hàng:</strong> {order.customer?.fullName}</p>       
        <p><strong>Số điện thoại:</strong> {order.customer?.phoneNumber}</p>
        

        <h3>Chi tiết sản phẩm</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #000', padding: '8px',textAlign: 'center'  }}>Tên sản phẩm</th>
              <th style={{ border: '1px solid #000', padding: '8px',textAlign: 'center'  }}>Màu sắc</th>
              <th style={{ border: '1px solid #000', padding: '8px',textAlign: 'center'  }}>Size</th>
              <th style={{ border: '1px solid #000', padding: '8px',textAlign: 'center'  }}>Số lượng</th>
              <th style={{ border: '1px solid #000', padding: '8px',textAlign: 'center'  }}>Đơn giá</th>
              <th style={{ border: '1px solid #000', padding: '8px',textAlign: 'center'  }}>Thành tiền</th>            
            </tr>
          </thead>
          <tbody>
            {order.orderItems?.map((item, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{item.productName}</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{item.productDetail?.colors?.corlorName}</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}>{item.productDetail?.sizes?.sizesName}</td>
                <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'center' }}>{item.quantity}</td>
                <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'right' }}>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.unitPrice||0)}
                </td>
                <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'right' }}>
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalPrice||0)}
                </td>
              </tr>
            ))}
            <tr>
                <td style={{ border: '1px solid #000', padding: '8px' }}> Tổng tiền</td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px' }}></td>
                <td style={{ border: '1px solid #000', padding: '8px', textAlign: 'right' }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalPrice||0)}</td>
            </tr>
           </tbody>
        </table>
      </div>
      <button onClick={handleDownloadPdf} style={{ marginTop: '20px' }}>In hóa đơn</button>
    </div>
  );
};

export default OrderToPdf;
