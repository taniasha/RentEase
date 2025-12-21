import React from 'react';

function PropertyCard({ property }) {
  return (
    <div className="card shadow-sm">
      <img src={property.img} className="card-img-top" alt={property.name} />
      <div className="card-body">
        <h5 className="card-title">{property.name}</h5>
        {/* <p className="card-text">{property.price}</p> */}
        {/* <a href="#" className="btn btn-primary w-100">View Details</a> */}
      </div>
    </div>
  );
}

export default PropertyCard;
