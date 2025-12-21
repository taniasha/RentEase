import React, { useEffect, useState } from "react";
import axios from "axios";
import LandlordNavbar from "./LandlordNavbar";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ManageProperties() {
  const [properties, setProperties] = useState([]);
  const [editProperty, setEditProperty] = useState(null); // store property being edited
  const [form, setForm] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = () => {
    axios
      .get("http://localhost:5000/api/landlord-properties", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setProperties(res.data))
      .catch((err) => console.error(err));
  };

  const startEdit = (property) => {
    setEditProperty(property);
    setForm({
      title: property.title,
      price: property.price,
      location: property.location,
      type: property.type,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      availableFrom: property.availableFrom,
      furnishing: property.furnishing,
      age: property.age,
      amenities: property.amenities.join(", "),
      description: property.description,
      images: property.images.join(", ")
    });
  };

  const saveEdit = async () => {
    const updatedProperty = {
      ...form,
      amenities: form.amenities.split(",").map(a => a.trim()),
      images: form.images.split(",").map(img => img.trim())
    };
    await axios.put(
      `http://localhost:5000/api/update-property/${editProperty._id}`,
      updatedProperty,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setEditProperty(null);
    fetchProperties();
  };

  const deleteProperty = async (id) => {
    if (!window.confirm("Are you sure to delete this property?")) return;
    await axios.delete(`http://localhost:5000/api/deleteproperty/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProperties();
  };

  return (
    <>
      <LandlordNavbar />
      <div className="container" style={{ marginTop: "130px" }}>
        <h3 className="mb-4">Manage Properties</h3>

        <div className="d-flex flex-wrap gap-3">
          {properties.map((p) => (
            <div key={p._id} className="card p-2 shadow-sm" style={{ width: "300px", position: "relative" }}>
              {p.images[0] && (
                <img src={p.images[0]} alt={p.title} style={{ objectFit: "cover", borderRadius: "4px" }} />
              )}
              <h6 className="mt-2">{p.title}</h6>
              <p className="mb-1" style={{ fontSize: "0.85rem" }}>₹{p.price}</p>
              <p className="mb-1" style={{ fontSize: "0.75rem" }}>{p.location}</p>
              <p className="mb-1" style={{ fontSize: "0.75rem", color: p.tenant ? "green" : "gray" }}>
                {p.tenant ? "Rented" : "Available"}
              </p>

              {/* small icon buttons */}
              <div style={{ position: "absolute",fontSize:"2rem", top: "10px", right: "15px", display: "flex", gap: "5px" }}>
                <FaEdit style={{ cursor: "pointer" }} title="Edit" onClick={() => startEdit(p)} />
                <FaTrash style={{ cursor: "pointer", color: "red" }} title="Delete" onClick={() => deleteProperty(p._id)} />
              </div>
            </div>
          ))}
        </div>

        {/* Edit Form Modal */}
        {editProperty && (
          <div className="edit-form mt-4 p-3 shadow-sm border rounded" style={{ background: "#f8f9fa" }}>
            <h5>Edit Property: {editProperty.title}</h5>
            <input className="form-control mb-2" placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <input className="form-control mb-2" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            <input className="form-control mb-2" placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
            <input className="form-control mb-2" placeholder="Type" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })} />
            <input className="form-control mb-2" placeholder="Bedrooms" value={form.bedrooms} onChange={e => setForm({ ...form, bedrooms: e.target.value })} />
            <input className="form-control mb-2" placeholder="Bathrooms" value={form.bathrooms} onChange={e => setForm({ ...form, bathrooms: e.target.value })} />
            <input className="form-control mb-2" placeholder="Area" value={form.area} onChange={e => setForm({ ...form, area: e.target.value })} />
            <input className="form-control mb-2" placeholder="Available From" value={form.availableFrom} onChange={e => setForm({ ...form, availableFrom: e.target.value })} />
            <input className="form-control mb-2" placeholder="Furnishing" value={form.furnishing} onChange={e => setForm({ ...form, furnishing: e.target.value })} />
            <input className="form-control mb-2" placeholder="Age" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
            <input className="form-control mb-2" placeholder="Amenities (comma separated)" value={form.amenities} onChange={e => setForm({ ...form, amenities: e.target.value })} />
            <input className="form-control mb-2" placeholder="Images URLs (comma separated)" value={form.images} onChange={e => setForm({ ...form, images: e.target.value })} />
            <textarea className="form-control mb-2" placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}></textarea>

            <button className="btn btn-success btn-sm me-2" onClick={saveEdit}>Save</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setEditProperty(null)}>Cancel</button>
          </div>
        )}
      </div>
    </>
  );
}
