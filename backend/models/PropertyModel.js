const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: String,
  location: String,
  type: String,
  price: String,
  negotiable: Boolean,
  bedrooms: Number,
  bathrooms: Number,
  area: String,
  availableFrom: String,
  furnishing: String,
  age: Number,
  amenities: [String],
  description: String,
  images: [String],
  ownerName: { type: String, required: true },
  ownerEmail: { type: String, required: true },
  ownerPhone: { type: String, required: true },
  landlordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  status: {
    type: String,
    enum: ["available", "pending", "rented"],
    default: "available"
  },
});

module.exports = mongoose.model("Property", propertySchema);
