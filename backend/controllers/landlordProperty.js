const Rental = require("../models/RentalModel.js");
const Property = require("../models/PropertyModel.js");

exports.getLandlordProperties = async (req, res) => {
  try {
    const landlordId = req.user.id;

    const properties = await Property.find({ landlordId });

    const result = await Promise.all(
      properties.map(async (p) => {
        const rental = await Rental.findOne({ propertyId: p._id })
          .populate("tenantId", "name email phone");

        return {
          ...p.toObject(),
          tenant: rental ? rental.tenantId : null
        };
      })
    );

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

