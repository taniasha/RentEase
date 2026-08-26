const Rental = require("../models/RentalModel.js");
const Property = require("../models/PropertyModel.js");

exports.getLandlordProperties = async (req, res) => {
  try {
    const landlordId = req.user.id;

    // Automatically clean up any legacy dummy self-rentals where the landlord was saved as tenant
    await Rental.deleteMany({
      landlordId,
      $expr: { $eq: ["$tenantId", "$landlordId"] },
    });
    await Property.updateMany(
      { landlordId, tenant: landlordId },
      { $unset: { tenant: "" } }
    );

    const properties = await Property.find({ landlordId });

    const result = await Promise.all(
      properties.map(async (p) => {
        // Only fetch valid rentals belonging to a real tenant (not the landlord)
        const rental = await Rental.findOne({
          propertyId: p._id,
          tenantId: { $ne: landlordId },
        })
          .populate("tenantId", "name email phone address")
          .sort({ createdAt: -1 });

        const validTenant =
          rental &&
          rental.tenantId &&
          rental.tenantId._id &&
          rental.tenantId._id.toString() !== landlordId.toString()
            ? rental.tenantId
            : null;

        return {
          ...p.toObject(),
          tenant: validTenant,
          rentalDetails:
            validTenant && rental
              ? {
                  rentAmount: rental.rentAmount,
                  month: rental.month,
                  paidAt: rental.createdAt,
                  paymentId: rental.paymentId,
                }
              : null,
        };
      })
    );

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
