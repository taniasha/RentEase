import React, { useState } from "react";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PropertyList from "./components/PropertyList";
import PropertySection from "./components/PropertySection";
import AddProp from "./Pages/AddProp";
import LandingPage from "./components/LandingPage";
import AboutUs from "./components/AboutUs";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import TenantLandingPage from "./tenant/TenantLandingPage";
import ExploreProperty from "./tenant/ExploreProperty";
import TenantProfile from "./tenant/TenantProfile";
import PropertyDetail from "./components/PropertyDetail";
import Payment from "./tenant/Payments";
import LandlordLandingPage from "./landlord/LandlordLandingPage";
import MyRental from "./tenant/MyRental";
import MyRentHolders from "./landlord/MyRentHolders";
import LandlordProfile from "./landlord/LandlordProfile";
import ManageProperties from "./landlord/ManageProperties";
import NotFound from "./Pages/NotFound";
import ProtectedRoute from "./Pages/ProtectedRoute";

function App() {
  return (
    <>
      <ToastContainer/>
      <BrowserRouter>
       <Routes>
          <Route element={<LandingPage />} path="/" />
          <Route element={<AddProp />} path="/addproperty" />
          <Route element={<AboutUs />} path="/about-us" />
          <Route element={<Signup />} path="/signup" />
          <Route element={<Login />} path="/login" />

          {/* Tenant routes */}
          <Route path="/tenant-dashboard" element={<ProtectedRoute role="tenant"><TenantLandingPage /></ProtectedRoute>} />
          <Route path="/explore" element={<ProtectedRoute role="tenant"><ExploreProperty /></ProtectedRoute>} />
          <Route path="/tenant-profile" element={<ProtectedRoute role="tenant"><TenantProfile /></ProtectedRoute>} />
          <Route path="/property/:id" element={<ProtectedRoute role="tenant"><PropertyDetail /></ProtectedRoute>} />
          <Route path="/payment" element={<ProtectedRoute role="tenant"><Payment /></ProtectedRoute>} />
          <Route path="/my-rental" element={<ProtectedRoute role="tenant"><MyRental /></ProtectedRoute>} />

          {/* Landlord routes */}
          <Route path="/landlord-dashboard" element={<ProtectedRoute role="landlord"><LandlordLandingPage /></ProtectedRoute>} />
          <Route path="/mytenants" element={<ProtectedRoute role="landlord"><MyRentHolders /></ProtectedRoute>} />
          <Route path="/landlord-profile" element={<ProtectedRoute role="landlord"><LandlordProfile /></ProtectedRoute>} />
          <Route path="/manage-properties" element={<ProtectedRoute role="landlord"><ManageProperties /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
