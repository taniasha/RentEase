const Rental = require("../models/RentalModel");
const Property = require("../models/PropertyModel");

// fetch tenant rental history.

const myrentals = async (req, res) => {
  try {
    const rentals = await Rental.find({ tenantId: req.user.id })
      .populate("propertyId");
    res.json(rentals);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch rentals" });
  }
};

module.exports = { myrentals };
