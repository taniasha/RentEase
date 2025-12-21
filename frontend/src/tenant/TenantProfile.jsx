import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./tenant.css";
import TenantNavbar from "./TenantNavbar";
import "../index.css";
import { useNavigate } from "react-router-dom";

export default function TenantProfile() {
  const [user, setUser] = useState(null);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch tenant profile
  useEffect(() => {
    if (!userId) return;

    axios.get(`http://localhost:5000/api/tenant-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setUser(res.data))
    .catch(err => {
      console.log(err);
      toast.error("Failed to fetch profile");
    });
  }, [userId, token]);

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out");

    setTimeout(() => {
      navigate("/", { replace: true });
    }, 500);
  };

  if (!user) return <div className="container mt-4">Loading...</div>;

  const initials = user.name
    ? user.name
        .split(" ")
        .map(n => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <>
      <TenantNavbar />
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="container tenant-profile-section">
        <div className="profile-card">
          <div className="profile-pic">{initials}</div>
           <button
              className="logout-btn"
              onClick={handleLogout}
              title="Logout"
            >
              ⎋
            </button>
          <div className="profile-info">
            <p><strong>Name:</strong> <span>{user.name}</span></p>
            <p><strong>Email:</strong> <span>{user.email}</span></p>
            <p><strong>Phone:</strong> <span>{user.phone || "Not added"}</span></p>
            <p><strong>Address:</strong> <span>{user.address || "Not added"}</span></p>
            <p><strong>Role:</strong> <span>{user.role}</span></p>
          </div>

          <button className="edit-btn glow-button">Edit Profile</button>
        </div>
      </div>
    </>
  );
}
