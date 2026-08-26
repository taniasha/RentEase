const Razorpay = require("razorpay");
const Rental = require("../models/RentalModel");
const Property = require("../models/PropertyModel");

// Initialize Razorpay with dummy keys
const razorpay = new Razorpay({
  key_id: "rzp_test_Qb9FJurfVY6ULB",
  key_secret: "YN2evifmyeL8T4qYmVresH3k",
});

// Create an order (called from frontend before payment)
exports.createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({ message: "Valid amount is required" });
    }

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100), // rupees → paise
      currency: "INR",
      receipt: "rent_receipt_" + Date.now(),
    });
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};

// Capture payment and save rental
exports.capturePayment = async (req, res) => {
  try {
    const { propertyId, rentAmount, month, razorpayPaymentId } = req.body;
    const tenantId = req.user?.id;
    const role = req.user?.role;

    if (!tenantId) return res.status(401).json({ message: "Unauthorized" });

    if (!rentAmount || Number(rentAmount) <= 0) {
      return res.status(400).json({ message: "Valid payment amount is required" });
    }

    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: "Property not found" });

    // Validate that owner/landlord cannot pay/rent their own property
    if (
      role === "landlord" ||
      (property.landlordId && property.landlordId.toString() === tenantId.toString())
    ) {
      return res.status(403).json({
        message: "Landlords/owners cannot rent or make rental payments for their own properties.",
      });
    }

    if (!month) return res.status(400).json({ message: "Month is required" });

    const rental = await Rental.create({
      tenantId,
      landlordId: property.landlordId || tenantId,
      propertyId,
      rentAmount: Number(rentAmount),
      month,
      paymentId: razorpayPaymentId,
    });

    // Mark property as assigned to tenant
    property.tenant = tenantId;
    await property.save();

    res.status(201).json({ message: "Payment successful and property rented!", rental });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment failed" });
  }
};
