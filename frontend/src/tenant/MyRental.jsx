import React, { useEffect, useState } from "react";
import TenantNavbar from "./TenantNavbar";
import axios from "axios";

export default function MyRental() {
  const [rentals, setRentals] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/my-rentals", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setRentals(res.data))
    .catch(err => console.log(err));
  }, []);

  return (
    <>
      <TenantNavbar />
      <div className="container mt-5 pt-5">
        <h4 className="m-3">My Rentals</h4>

        {rentals.length === 0 && <p>No rentals yet.</p>}

        {rentals.map((r, i) => (
          <div key={i} className="card p-3 mb-3 shadow-sm">
            <h5>{r.propertyId?.title}</h5>
            <p>{r.propertyId?.location}</p>
            <p>₹{r.rentAmount}</p>
            <p>
              Month:{" "}
              {new Date(r.month + "-01").toLocaleString("default", {
                month: "long",
                year: "numeric"
              })}
            </p>

            <span className="badge bg-success p-2">Paid</span>
          </div>
        ))}
      </div>
    </>
  );
}
