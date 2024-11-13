import React, { useState, useEffect } from "react";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

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
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5obmUzIiwiZXhwIjoxNzMwOTgwNTk2LCJpYXQiOjE3MzA5NzY5OTYsInNjb3BlIjoiUk9MRV9VU0VSIn0.s4iKoHAKqT6hv5OIBvi8WX08p8k8CUB1pP8S_JsKV2a7HNK96qv38XAB1KQTA2FOaKNTmomLKrkxqOHKZvaenQ";
    
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
      <h1 className="text-4xl text-center pb-4">Thông Tin Discount</h1>

      <div>
        <form className="mb-4">
          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">Discount Value</label>
                <input type="number" className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Discount Type</label>
                <input type="text" className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input type="date" className="form-control" required />
              </div>
            </div>

            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input type="date" className="form-control" required />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <input type="text" className="form-control" required />
              </div>
              {/* <div className="mb-3">
              <label className="form-label">Description</label>
              <input type="text" className="form-control" required />
            </div> */}
            </div>
            <div className="">
              <button type="submit" className="btn btn-primary w-20">
                Create Discount
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="">
        <table className="table w-full pb-5">
          <thead>
            <tr className="text-md px-6 py-3">
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
                <tr key={discount.discountId} className="text-md px-6 py-3">
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
        <div className="d-flex justify-content-between pt-3">
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
    </div>
  );
}
