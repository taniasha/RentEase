import React from "react";
import TenantNavbar from "./TenantNavbar";
import banner from "../assets/tenantbanner.jpg";
import PropertyList from "../components/PropertyList";
import Footer from "../components/Footer";

function TenantLandingPage() {
  return (
    <>
      <TenantNavbar />

         {/* Banner Section */}
        <div className="container mt-5 pt-5">
            <div className="rounded shadow overflow-hidden">
                <img 
                src={banner}
                alt="Banner"
                className="img-fluid w-100"
                style={{
                    height: "300px",
                    objectFit: "cover",
                    borderRadius: "20px"
                }}
                />
            </div>
        </div>

        
      {/* Hero Section */}
      <div className="container mt-5 mb-5 text-center">
        <h1 className="fw-bold mb-3" style={{ color: "#1e405fff" }}>
          Welcome Back, Tenant 👋
        </h1>
        <p className="text-muted fs-5">
          Explore properties, track your rent and manage your stay easily.
        </p>
      </div>

      {/* Status Overview */}
      <div className="container mb-5">
        <div className="row text-center g-4">
          
          <div className="col-md-4">
            <div className="p-4 rounded shadow-sm">
              <h4 className="fw-bold">Current Property</h4>
              <p className="text-muted">1 Active</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 rounded shadow-sm">
              <h4 className="fw-bold">Rent Status</h4>
              <p className="text-muted">Paid / Pending</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 rounded shadow-sm">
              <h4 className="fw-bold">Issues</h4>
              <p className="text-muted">0 Open</p>
            </div>
          </div>

        </div>
      </div>

      {/* Section Heading */}
      <div className="container mb-5 mt-5">
        <h2 className="fw-bold" style={{ color: "#1e405fff" }}>
          Find Your Perfect Rental
        </h2>
        <p className="text-muted">Choose from the options below</p>
      </div>
         <PropertyList/>
      {/* Property Cards */}
      {/* <div className="container mb-5">
        <div className="row g-4">

          {[house1, house2, house3, house4, house5, house6].map((img, idx) => (
            <div className="col-md-4" key={idx}>
              <div className="card shadow rounded">
                <img 
                  src={img} 
                  className="card-img-top" 
                  alt="Property" 
                  height="200" 
                  style={{ objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold">2BHK Apartment</h5>
                  <p className="text-muted mb-2">Delhi, India</p>
                  <p className="fw-semibold">₹10,000/month</p>
                  <button 
                    className="btn w-100" 
                    style={{ backgroundColor: "#1e405fff", color: "#fff" }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div> */}

      <Footer/>
    </>
  );
}

export default TenantLandingPage;
