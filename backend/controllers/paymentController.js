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
    console.log("Amount received:", req.body.amount);
  try {

    const { amount } = req.body;   // must come from frontend

    if (!amount) {
      return res.status(400).json({ message: "Amount is required" });
    }

    const order = await razorpay.orders.create({
      amount: amount * 100,   // rupees → paise
      currency: "INR",
      receipt: "rent_receipt_" + Date.now()
    });
    res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order creation failed" });
  }
};


// Capture payment and save rental
exports.capturePayment = async (req, res) => {
  console.log("Request body:", req.body);
  console.log("Authenticated user:", req.user);

  try {
    const { propertyId, rentAmount, month, razorpayPaymentId } = req.body;
    const tenantId = req.user?.id;
    if (!tenantId) return res.status(401).json({ message: "Unauthorized" });

    const property = await Property.findById(propertyId);
    if (!property) return res.status(404).json({ message: "Property not found" });
    if (!month) return res.status(400).json({ message: "Month is required" });
    if (!property.landlordId) return res.status(400).json({ message: "Property landlordId missing" });

    const rental = await Rental.create({
      tenantId,
      landlordId: property.landlordId,
      propertyId,
      rentAmount,
      month,
      paymentId: razorpayPaymentId
    });

    console.log("Rental saved:", rental);
    res.status(201).json({ message: "Payment successful and property rented!", rental });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment failed" });
  }
};
