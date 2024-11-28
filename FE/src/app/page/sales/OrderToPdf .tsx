import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { OrderModel } from "../../model/OrderMoldel";

const OrderToPdf = ({ order }: { order: OrderModel }) => {
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = async () => {
    const element = pdfRef.current;
    if (!element) return;

    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190; // PDF width
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(data, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`order_${order.orderId}.pdf`);
  };

  return (
    <div className="">
      <div className="text-center text-3xl mb-2 mt-0">
        <h2>Thông tin Đơn hàng</h2>
      </div>
      <div ref={pdfRef} style={{ padding: "20px", background: "#f5f5f5" }}>
        <p>
          <strong>Mã đơn hàng:</strong> {order.orderId}
        </p>
        <p>
          <strong>Ngày tạo:</strong> {order.createdDate?.toString()}
        </p>
        <p>
          <strong>Tên khách hàng:</strong> {order.customer?.fullName}
        </p>
        <p>
          <strong>Số điện thoại:</strong> {order.customer?.phoneNumber}
        </p>
        <div className="text-center text-xl mb-2">
          <h3>Chi tiết sản phẩm</h3>
        </div>
        <div className="w-full">
          <table className="table rounded-lg text-center table-bordered w-full border-3">
            <thead>
              <tr>
                <th>Tên sản phẩm</th>
                <th>Màu sắc</th>
                <th>Size</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody className="">
              {order.orderItems?.map((item, index) => (
                <tr key={index}>
                  <td>{item.productName}</td>
                  <td>{item.productDetail?.colors?.corlorName}</td>
                  <td>{item.productDetail?.sizes?.sizesName}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.unitPrice || 0)}
                  </td>
                  <td>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.totalPrice || 0)}
                  </td>
                </tr>
              ))}
              <tr className="border-collapse rounded-lg">
                <td className="text-xl"> Tổng tiền</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(order.totalPrice || 0)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <button
          className="bg-green-700 border-4 rounded-lg text-white p-1 mt-3"
          onClick={handleDownloadPdf}
        >
          Xuất hóa đơn
        </button>
      </div>
    </div>
  );
};

export default OrderToPdf;
