import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [newDiscount, setNewDiscount] = useState({
    discountValue: "",
    discountType: "",
    startDate: "",
    endDate: "",
    status: "",
    description: "",
  });

  const auToken = localStorage.getItem("authToken") || "";

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
  }, [page, size, auToken]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewDiscount({
      ...newDiscount,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/discounts/add-discounts", newDiscount, {
        headers: {
          Authorization: `Bearer ${auToken}`, // Add the token to the header
        },
      })
      .then((response) => {
        setDiscounts([...discounts, response.data]);
        setNewDiscount({
          discountValue: "",
          discountType: "",
          startDate: "",
          endDate: "",
          status: "",
          description: "",
        });
      })
      .catch((error) => {
        console.error("Error creating discount:", error);
      });
  };

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
        <form className="mb-4" onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">Discount Value</label>
                <input
                  type="number"
                  className="form-control"
                  name="discountValue"
                  value={newDiscount.discountValue}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Discount Type</label>
                <input
                  type="text"
                  className="form-control"
                  name="discountType"
                  value={newDiscount.discountType}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={newDiscount.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="col-6">
              <div className="mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={newDiscount.endDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  name="status"
                  value={newDiscount.status}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select status</option>
                  <option value="active">active</option>
                  <option value="expired">expired</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  value={newDiscount.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="">
              <button type="submit" className="btn btn-primary w-40">
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
              <th>Value</th>
              <th>Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {discounts.length > 0 ? (
              discounts.map((discount) => (
                <tr
                  key={discount.discountId}
                  className={`text-md ${
                    discount.status === "Hoạt động"
                      ? "text-yellow-200"
                      : "text-red-200"
                  }`}
                >
                  <td>{discount.discountValue}%</td>
                  <td>{discount.discountType}</td>
                  <td>{discount.startDate}</td>
                  <td>{discount.endDate}</td>
                  <td>{discount.description}</td>
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
