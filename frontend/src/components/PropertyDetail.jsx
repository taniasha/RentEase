import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../index.css";
import { useNavigate } from "react-router-dom";


function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/${id}`)
      .then(res => setProperty(res.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!property) return <div>Loading...</div>;
console.log("sending id:", property._id);
  return (
    <div className="container mt-4">
      {/* ---------- Title ---------- */}
      <h2 className="my-5" style={{color:"#19437eff"}}><i className="bi bi-house-door me-2"></i>{property.title}</h2>

      {/* ---------- Image Carousel ---------- */}
      {property.images?.length > 0 && (
        <div
          id="propertyCarousel"
          className="carousel slide mb-4 shadow-sm rounded"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {property.images.map((img, idx) => (
              <div className={`carousel-item ${idx === 0 ? "active" : ""}`} key={idx}>
                <img
                  src={img}
                  className="d-block w-100 rounded shadow-sm"
                  alt={`Property ${idx + 1}`}
                  style={{ width: "100%", maxHeight: "450px", objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
          {property.images.length > 1 && (
            <>
              <button className="carousel-control-prev" type="button" data-bs-target="#propertyCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#propertyCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
              </button>
            </>
          )}
        </div>
      )}

      {/* ---------- Property Details ---------- */}
      <div className="card p-4 mb-4 shadow-sm hover-card">
        <h5 className="mb-3 text-secondary"><i className="bi bi-info-circle me-2"></i>Property Details</h5>
        <div className="row">
          <div className="col-md-6">
            <p><i className="bi bi-geo-alt me-2 color-icon"></i><strong>Location:</strong> {property.location}</p>
            <p><i className="bi bi-building me-2 color-icon"></i><strong>Type:</strong> {property.type}</p>
            <p><i className="bi bi-cash-stack me-2 color-icon"></i><strong>Price:</strong> ₹{property.price} {property.negotiable && "(Negotiable)"}</p>
            <p><i className="bi bi-door-open me-2 color-icon"></i><strong>Bedrooms:</strong> {property.bedrooms}</p>
            <p><i className="bi bi-bucket me-2 color-icon"></i><strong>Bathrooms:</strong> {property.bathrooms}</p>
          </div>
          <div className="col-md-6">
            <p><i className="bi bi-arrows-fullscreen me-2 color-icon"></i><strong>Area:</strong> {property.area} sq. ft.</p>
            <p><i className="bi bi-calendar2-check me-2 color-icon"></i><strong>Available From:</strong> {property.availableFrom}</p>
            <p><i className="bi bi-fan me-2 color-icon"></i><strong>Furnishing:</strong> {property.furnishing}</p>
            <p><i className="bi bi-clock me-2 color-icon"></i><strong>Age:</strong> {property.age} years</p>
          </div>
        </div>
      </div>

      {/* ---------- Amenities ---------- */}
      <div className="mb-4">
        <h5 className="text-secondary mb-2"><i className="bi bi-list-ul me-2"></i>Amenities / Facilities</h5>
        {property.amenities?.map((amenity, index) => (
          <span key={index} className="badge me-2 mb-2 p-3 amenity-badge" style={{backgroundColor:"#072857", color:"white"}}>
            <i className="bi bi-check-circle me-1"></i>{amenity}
          </span>
        ))}
      </div>

      {/* ---------- Description ---------- */}
      <div className="card p-4 mb-4 shadow-sm hover-card">
        <h5 className="text-secondary mb-3"><i className="bi bi-file-text me-2"></i>Description</h5>
        <p style={{ lineHeight: "1.6", fontSize: "1rem", color: "#333" }}>{property.description}</p>
      </div>

      {/* ---------- Owner Info ---------- */}
      <div className="card p-4 mb-4 shadow-sm hover-card">
        <h5 className="text-secondary mb-3"><i className="bi bi-person-lines-fill me-2"></i>Owner Information</h5>
        <p><i className="bi bi-person me-2"></i><strong>Name:</strong> {property.ownerName}</p>
        <p><i className="bi bi-envelope me-2"></i><strong>Email:</strong> {property.ownerEmail}</p>
        <p><i className="bi bi-telephone me-2"></i><strong>Phone:</strong> {property.ownerPhone}</p>
        <button className="btn rent-btn text-light mt-2"><i className="bi bi-chat-dots me-1"></i>Contact Owner</button>
      </div>

      {/* ---------- Rent/Buy Button ---------- */}
       <button
  className="btn rent-btn w-100 mt-3 mb-5 text-light"
  onClick={() => {
    // Save selected property in localStorage or state
    localStorage.setItem("selectedProperty", JSON.stringify({
      _id: property._id,
      rentAmount: property.price, // or any specific rent
      title: property.title
    }));
    // Navigate to Payment page
    navigate("/payment");
  }}
>
  <i className="bi bi-cart-check me-2"></i>Rent/Buy Facilities
</button>


    </div>
  );
}

export default PropertyDetail;
