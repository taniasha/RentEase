import React from "react";

export default function PropertyList() {
  const properties = [
    {
      id: 1,
      name: "Luxury Apartment",
      img: "https://www.souciehorner.com/wp-content/uploads/2017/04/Kitchen3-1536.jpg",
    },
    {
      id: 2,
      name: "Cozy Studio",
      img: "https://www.decorilla.com/online-decorating/wp-content/uploads/2021/04/cozy-basement-studio-apartment-decor.jpeg",
    },
    {
      id: 3,
      name: "Pg",
      img: "https://phsgirlspgnoida.com/wp-content/uploads/2021/07/2bed_new-1024x765.jpg",
    },
  ];

  return (
    <div className="row container m-auto">
      {properties.map((p) => (
        <div className="col-md-4  hover" key={p.id}>
          <div className="card shadow-sm property-card card-hover-property">
            <img
              src={p.img}
              className="card-img-top"
              alt={p.name} 
              style={{ height: "220px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{p.name}</h5>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
