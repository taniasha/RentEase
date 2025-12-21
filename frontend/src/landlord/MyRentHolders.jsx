import React, { useEffect, useState } from "react";
import axios from "axios";
import LandlordNavbar from "./LandlordNavbar";

export default function MyRentHolders() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("http://localhost:5000/api/landlord-properties", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => setProperties(res.data || []))
    .catch(err => console.error(err));
  }, []);

  const safeProperties = properties.filter(p => p && p._id);

  return (
    <>
      <LandlordNavbar />
      <div className="container" style={{ marginTop: "100px" }}>
        <h3>My Tenants</h3>

        {safeProperties.length === 0 && <p>No properties added.</p>}

        {safeProperties.map(p => (
          <div key={p._id} className="card p-3 mb-3 shadow-sm">
            <h5>{p.title}</h5>
            <p>₹{p.price}</p>

            {p.tenant ? (
              <>
                <hr />
                <h6>Tenant Details</h6>
                <p>Name: {p.tenant.name}</p>
                <p>Email: {p.tenant.email}</p>
                <p>Phone: {p.tenant.phone}</p>
              </>
            ) : (
              <p>No tenant yet</p>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
