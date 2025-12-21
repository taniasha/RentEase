import React from "react";
import "../index.css"; // for any custom styling
import banner from "../assets/landlord.jpg";
import LandlordNavbar from "../landlord/LandlordNavbar";
import Footer from "../components/Footer";

function LandlordLandingPage() {
  return (
    <>
    <LandlordNavbar/>
    <div className="landlord-dashboard">
      {/* Banner Section */}
        <div className="container mt-5 pt-5">
            <div className="rounded shadow overflow-hidden">
                <img 
                src={banner}
                alt="Banner"
                className="img-fluid w-100"
                style={{
                    height: "400px",
                    objectFit: "cover",
                    borderRadius: "20px"
                }}
                />
            </div>
        </div>

      {/* Info Text Section */}
      <section className="container my-5 text-center">
        <h2>How it Works</h2>
        <p className="mb-4">
          List your properties, track tenants, and manage rent all in one place. 
          Our dashboard helps you keep everything organized and stress-free.
        </p>

        {/* Cards Section */}
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Add Properties</h5>
                <p className="card-text">Easily add new properties with photos, rent details, and availability.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Manage Tenants</h5>
                <p className="card-text">Keep track of your tenants, their contact details, and rental agreements.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body text-center">
                <h5 className="card-title">Track Rent</h5>
                <p className="card-text">Monitor rent payments, due dates, and generate monthly reports easily.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
</>
  );
}

export default LandlordLandingPage;
