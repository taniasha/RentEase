const Rental = require("../models/RentalModel");
const Property = require("../models/PropertyModel");

// fetch tenant rental history with landlord and property details
const myrentals = async (req, res) => {
  try {
    const rentals = await Rental.find({ tenantId: req.user.id })
      .populate("propertyId")
      .populate("landlordId", "name email phone")
      .sort({ createdAt: -1 });
    res.json(rentals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch rentals" });
  }
};

module.exports = { myrentals };
