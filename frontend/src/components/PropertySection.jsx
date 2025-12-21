import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function PropertySection() {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/getall")
      .then(res => setProperties(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Available Properties</h3>

      <div className="row">
        {properties.map((p) => (
          <div className="col-md-4 mb-4" key={p._id}>
            <div className="card shadow-sm">

              {/* ---------- IMAGE CAROUSEL ---------- */}
              {p.images && p.images.length > 0 ? (
                <div id={`carousel${p._id}`} className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                    {p.images.map((img, index) => (
                      <div
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                        key={index}
                      >
                        <img
                          src={img}
                          className="d-block w-100"
                          alt={`${p.name} ${index + 1}`}
                          style={{ height: '200px', objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>

                  {p.images.length > 1 && (
                    <>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={`#carousel${p._id}`}
                        data-bs-slide="prev"
                      >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                      </button>
                      <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={`#carousel${p._id}`}
                        data-bs-slide="next"
                      >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <img
                  src="/default.jpg"
                  className="card-img-top"
                  alt={p.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              )}

              {/* ---------- CARD DETAILS ---------- */}
             <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="text-muted">{p.location}</p>
                <p>₹{p.price}</p>

                {/* Description with Read More */}
                <p
                  className="card-text"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: p.showFull ? "unset" : 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {p.description}
                </p>

                <button
                  className="btn btn-link p-0" style={{color:"#4270b6ff", textDecoration:"none"}}
                  onClick={() => {
                    setProperties(prev =>
                      prev.map(item =>
                        item._id === p._id ? { ...item, showFull: !item.showFull } : item
                      )
                    );
                  }}
                >
                  {p.showFull ? "Read Less" : "Read More..."}
                </button>

                 <button
                    className="btn w-100 mt-2"
                    style={{ backgroundColor: "#212b3a", color: "white" }}
                    onClick={() => navigate(`/property/${p._id}`)}
                  >
                    View Details
                  </button>
            </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PropertySection;
