const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    landlordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
      required: true,
    },

    rentAmount: {
      type: Number,
      required: true,
    },

    month: {
      type: String, // "2025-09"
      required: true,
    },

    paymentId: {
      type: String, // Razorpay/Stripe id
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rental", rentalSchema);
