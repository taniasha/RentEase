// LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import logo from '../assets/logo.jpg';
import '../App.css';
import img2 from '../assets/img2.jpg';
import CountUpCard from './CountUpCard';
import PropertySection from './PropertySection';
import PropertyList from './PropertyList';
import Footer from './Footer';

function LandingPage() {
  const navigate = useNavigate();

  const handleTenantClick = () => {
    navigate('/signup'); // or tenant dashboard after login
  };

  const handleLandlordClick = () => {
    navigate('/signup'); // or landlord dashboard after login
  };

  return (
  <>
    <Navbar/>

    {/* Banner Image Section */}
    <section className="hero-banner">
        <img src={img2} alt="Real Estate Banner" className="hero-img" />
        <div className="hero-text">
          <h1>Find Your Perfect Rental Home</h1>
          <p>Smart, simple & seamless renting for tenants and landlords.</p>
          <button className="hero-btn">Explore Properties</button>
        </div>
    </section>


   {/* Stats section */}
   <CountUpCard/>

     {/* welcome */}
      <section className="hero-landingpage text-center">
        <h1 className="display-4 mb-3 fw-bold"  style={{color:"#1e405fff"}}> <i class="bi bi-house-door-fill me-3"></i>Welcome to RentEase</h1>
        <img src={logo} alt="logo" height="110" className='my-3'/>
        <p className="lead mb-4">Find your dream home or list your property easily!</p>
        <div>
          <button className="btn hero-btn me-3" onClick={handleTenantClick}>
            I want to rent
          </button>
          <button className="btn hero-btn" onClick={handleLandlordClick}>
            I want to list my property
          </button>
        </div>
      </section>

    <PropertyList/>

      {/* Features Section */}
      <section className="hero-features container mb-5">
        <h3 className="display-4 mb-3 fw-bold text-center mb-4" style={{color:"#1e405fff"}}><i class="bi bi-lightbulb-fill me-3"></i>
           Why RentEase?</h3>
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card h-100 p-3">
              <h3 className="card-title fw-bold">For Tenants</h3>
              <p className="card-text">
                Browse verified properties, contact landlords directly, and manage your rentals easily.
              </p>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card h-100 p-3">
              <h3 className="card-title fw-bold">For Landlords</h3>
              <p className="card-text">
                Upload your properties, keep track of tenants, record payments, and manage everything in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

    
      {/* How It Works */}
      <section className="how-it-works container bg-light my-5">
        <div className="container">
          <h3 className="text-center mb-4 display-5 fw-bold" style={{color:"#1e405fff"}}><i class="bi bi-rocket-takeoff me-3"></i>
             How It Works</h3>
          <div className="row text-center">
            <div className="col-md-4 mb-3">
              <h5>Step 1</h5>
              <p>Sign up as a tenant or landlord.</p>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Step 2</h5>
              <p>Landlords list properties / tenants browse listings.</p>
            </div>
            <div className="col-md-4 mb-3">
              <h5>Step 3</h5>
              <p>Contact, rent, and manage payments securely.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Call to Action */}
      <section className="cta text-center py-2">
        <h3 className="mb-3">Get Started Today!</h3>
        <button className="btn btn-primary me-3" onClick={handleTenantClick} style={{backgroundColor: "#19437e", borderColor: "#19437e"}}>
          Browse Properties
        </button>
      </section>

      <Footer/>
    </>
  );
}

export default LandingPage;
