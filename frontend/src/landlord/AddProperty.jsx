import React, { useState } from 'react';
import axios from 'axios';
import LandlordNavbar from './LandlordNavbar';

function AddProperty({ ownerId }) { // pass the logged-in user's id
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'rent',      // rent or sell
    price: '',
    negotiable: false,
    bedrooms: '',
    bathrooms: '',
    area: '',
    availableFrom: '',
    furnishing: '',
    age: '',
    amenities: '',    
    description: '',
    images: '' ,        
    ownerName: '',
   ownerEmail: '',
   ownerPhone: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: Number(formData.price),
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      area: Number(formData.area),
      age: Number(formData.age),
      amenities: formData.amenities.split(',').map(a => a.trim()),
      images: formData.images.split(',').map(img => img.trim()),
    };

    try {
      const res = await axios.post('http://localhost:5000/api/add-property', payload,  {
    headers: {
      Authorization: `Bearer ${token}`
    }});
      if (res.status === 200) {
        alert('Property added successfully!');
        setFormData({
          title: '',
          location: '',
          type: 'rent',
          price: '',
          negotiable: false,
          bedrooms: '',
          bathrooms: '',
          area: '',
          availableFrom: '',
          furnishing: '',
          age: '',
          amenities: '',
          description: '',
          images: '',
          ownerName: '',
          ownerEmail: '',
          ownerPhone: '',
        });
      }
      console.log('Form submitted', formData); 
    } catch (err) {
      console.error(err);
      alert('Error adding property.');
    }
  };

  return (
    <>
    <LandlordNavbar/>
    <div className="container" style={{ width:"850px",marginTop:"100px",backgroundColor:"#e4e3e3ff", marginBottom:"40px",border: "2px solid #adababff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)"}}>
      <h4 className="mb-4">Add Your Property</h4>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Owner's Name</label>
          <input type="text" name="ownerName" className="form-control" value={formData.ownerName} onChange={handleChange} required />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Owner Email</label>
          <input type="text" name="ownerEmail" className="form-control" value={formData.ownerEmail} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Owner Phone</label>
          <input type="text" name="ownerPhone" className="form-control" value={formData.ownerPhone} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <label className="form-label">Type</label>
          <select name="type" className="form-select" value={formData.type} onChange={handleChange}>
            <option value="rent">Rent</option>
            <option value="sell">Sell</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input type="number" name="price" className="form-control" value={formData.price} onChange={handleChange} required />
        </div>

        <div className="form-check mb-3">
          <input type="checkbox" name="negotiable" className="form-check-input" checked={formData.negotiable} onChange={handleChange} />
          <label className="form-check-label">Negotiable</label>
        </div>

        <div className="mb-3">
          <label className="form-label">Bedrooms</label>
          <input type="number" name="bedrooms" className="form-control" value={formData.bedrooms} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Bathrooms</label>
          <input type="number" name="bathrooms" className="form-control" value={formData.bathrooms} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Area (sq.ft)</label>
          <input type="number" name="area" className="form-control" value={formData.area} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Available From</label>
          <input type="date" name="availableFrom" className="form-control" value={formData.availableFrom} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Furnishing</label>
          <select name="furnishing" className="form-select" value={formData.furnishing} onChange={handleChange}>
            <option value="">Select</option>
            <option value="furnished">Furnished</option>
            <option value="semi-furnished">Semi-Furnished</option>
            <option value="unfurnished">Unfurnished</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Age of Property (years)</label>
          <input type="number" name="age" className="form-control" value={formData.age} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Amenities (comma-separated)</label>
          <input type="text" name="amenities" className="form-control" value={formData.amenities} onChange={handleChange} placeholder="parking, gym, balcony" />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} />
        </div>

        <div className="mb-3">
          <label className="form-label">Images (comma-separated URLs)</label>
          <input type="text" name="images" className="form-control" value={formData.images} onChange={handleChange} placeholder="https://example.com/1.jpg, https://example.com/2.jpg" />
        </div>

        <button type="submit" className="btn" style={{backgroundColor: "#143938", color: "#fff"}}>Add Property</button>
      </form>
    </div>
  </>
  );
}

export default AddProperty;
