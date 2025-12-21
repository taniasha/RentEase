const Property = require("../models/PropertyModel");
const Rental = require("../models/RentalModel");

exports.getLandlordDashboard = async (req, res) => {
  try {
    const landlordId = req.user.id;

    // 1️⃣ Get landlord properties
    const properties = await Property.find({ landlordId });

    // 2️⃣ Get all rentals for landlord
    const rentals = await Rental.find({ landlordId })
      .populate("tenantId", "name email phone")
      .populate("propertyId", "title location");

    // 3️⃣ Attach rentals to properties
    const result = properties.map(prop => {
      const propRentals = rentals.filter(
        r => r.propertyId._id.toString() === prop._id.toString()
      );

      return {
        ...prop.toObject(),
        tenants: propRentals.map(r => ({
          tenant: r.tenantId,
          month: r.startMonth,
          rentAmount: r.rentAmount,
          status: r.rentalStatus
        }))
      };
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
