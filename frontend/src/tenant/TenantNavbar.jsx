// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import logo2 from '../assets/logo2.jpg';

function Navbar() {
  return (
    <nav className="custom-navbar shadow">
      <div className="container navbar-collect d-flex">
        <div className='d-flex'>
        <Link to="/" className="navbar-logo">
          <img src={logo2} alt="RentEase Logo" height="60" />
        </Link>
        <h1 className='mt-1' style={{color:"#1e405fff"}}>Rent<span>E</span>ase</h1>
      </div>

        <div className="nav-links">
          <Link to="/tenant-dashboard" className="nav-link">Home</Link>
          <Link to="/explore" className="nav-link">Explore</Link>
          <Link to="/my-rental" className="nav-link">My Rentals</Link>
         <Link to="/tenant-profile" className="nav-link">Profile</Link>
          {/* <Link to="/payment" className="nav-link">Payment</Link> */}


        </div>
      </div>
    </nav>
  );
}

export default Navbar;
