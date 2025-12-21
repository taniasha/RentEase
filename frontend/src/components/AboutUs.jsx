import React from "react";
import '../App.css';
import Navbar from "./Navbar";
import Footer from "./Footer";

// import "bootstrap-icons/font/bootstrap-icons.css";

export default function AboutUs() {
  return (
    <>
        <Navbar/>

        <section className="about-section mt-5">
            <div className="container mt-5">
                <div className="text-center intro mb-5">
                <h2 className="title">About RentEase</h2>
                <p className="lead">
                    RentEase simplifies renting for Owners, Tenants and Agents — clear,
                    trustworthy, and fast. Pick your role below to get started.
                </p>
                </div>


                <div className="why-card p-4 rounded shadow-sm mb-5 floating-bg">
                    {/* floating balls inside the card */}
                    <div className="ball" style={{ left: "10%", animationDelay: "0s" }}></div>
                    <div className="ball small" style={{ left: "70%", animationDelay: "3s" }}></div>
                    <div className="ball" style={{ left: "40%", animationDelay: "6s" }}></div>

                    <h4 className="why-title">Why RentEase?</h4>
                    <p className="why-text">
                        We eliminate confusion in renting — secure payments, verified listings,
                        and simple communication. Built to save time and headaches.
                    </p>
                </div>



                <h4 className="text-center section-subtitle mb-4">Choose Your Role</h4>
                <div className="row gy-4">
                <div className="col-md-6">
                    <div className="role-card owner-card h-100 text-center p-3">
                    <i className="bi bi-building role-icon"></i>
                    <h5 className="role-title">Property Owner</h5>
                    <p className="role-desc">
                        List properties, manage tenants, and get automated reminders.
                    </p>
                    <a href="/signup?role=owner" className="btn btn-primary pill-btn">
                        Sign up as Owner
                    </a>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="role-card tenant-card h-100 text-center p-3">
                    <i className="bi bi-person-circle role-icon"></i>
                    <h5 className="role-title">Tenant</h5>
                    <p className="role-desc">
                        Find verified listings, track rent, and share documents easily.
                    </p>
                    <a href="/signup?role=tenant" className="btn btn-success pill-btn">
                        Sign up as Tenant
                    </a>
                    </div>
                </div>
                </div>
            </div>
        </section>

        <Footer/>
    </>
  );
}
