import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./src/css/tailwind.css" ;

type Discount = {
  discountId: string;
  discountValue: number;
  discountType: string;
  startDate: string;
  endDate: string;
  status: string;
  description: string;
};

type DiscountResponse<T> = {
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  data: T[];
};

export default function Discounts() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const auToken =
    localStorage.getItem("authToken") ||
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5obmUzIiwiZXhwIjoxNzMwMTk2NzQ1LCJpYXQiOjE3MzAxOTMxNDUsInNjb3BlIjoiUk9MRV9VU0VSIn0.IhqZQvSM7Kspv9U3y2RVaEu29Nx8g8SwlD_3M2VRC33uwfz9fPPHrkES4cJovvLTzCnEzkM15coISfv7bp0xEw";

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get<DiscountResponse<Discount>>(
          "http://localhost:8081/discounts/all-discounts",
          {
            headers: {
              Authorization: `Bearer ${auToken}`, // Add the token to the header
            },
            params: {
              page,
              size,
            },
          }
        );
        console.log(response.data); // Log the response data
        setDiscounts(response.data.data);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching discounts:", error);
      }
    };
    fetchDiscounts();
  }, [page, size]);

  const handlePreviousPage = () => {
    setPage(Math.max(0, page - 1));
  };

  const handleNextPage = () => {
    setPage(Math.min(totalPages - 1, page + 1));
  };

  return (
    <div className="container py-4">
      <h2 className="bg-slate-600">Discounts</h2>
      
      <table className="table-column">
        <thead>
          <tr>
            <th>Description</th>
            <th>Value</th>
            <th>Type</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {discounts.length > 0 ? (
            discounts.map((discount) => (
              <tr key={discount.discountId}>
                <td>{discount.description}</td>
                <td>{discount.discountValue}%</td>
                <td>{discount.discountType}</td>
                <td>{discount.startDate}</td>
                <td>{discount.endDate}</td>
                <td>{discount.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No discounts available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={handlePreviousPage}
          disabled={page === 0}
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          className="btn btn-primary"
          onClick={handleNextPage}
          disabled={page >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}
