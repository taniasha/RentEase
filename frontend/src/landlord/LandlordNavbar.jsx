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
          <Link to="/landlord-dashboard" className="nav-link">Home</Link>
          <Link to="/addproperty" className="nav-link">Add Property</Link>
          <Link to="/mytenants" className="nav-link">My Tenants</Link>
          <Link to="/landlord-profile" className="nav-link">Profile</Link>
          <Link to="/manage-properties" className="nav-link">Manage</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
