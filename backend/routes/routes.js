const express = require("express");
const router = express.Router();

const { addProperty, getAllProperties, getPropertyById, updateProperty, deleteProperty } = require("../controllers/Property.js");
const { signup } = require("../controllers/authController.js");
const { login } = require("../controllers/loginController.js");
const { getProfile } = require("../controllers/tenantProfileController.js");
const { rental, myrentals } = require("../controllers/rentalController.js");
const auth = require("../middleware/auth.js");
const { getLandlordProperties } = require("../controllers/landlordProperty.js");
const { getLandlordProfile } = require("../controllers/landlordProfileController.js");
const verifyLandlord = require("../middleware/verifyLandlord.js");
const { getLandlordDashboard } = require("../controllers/landlordDashboard");
// const { createOrder } = require("../controllers/paymentController");
const { createOrder, capturePayment } = require("../controllers/paymentController");


// 🔹 AUTH
router.post("/signup", signup);
router.post("/login", login);

// 🔹 PROPERTIES
router.get("/getall", getAllProperties);
router.post("/add-property", auth, verifyLandlord, addProperty);
router.get("/landlord-properties", auth, verifyLandlord, getLandlordProperties);
router.put("/update-property/:id", auth, verifyLandlord, updateProperty);
router.delete("/delete-property/:id", auth, verifyLandlord, deleteProperty);
router.delete("/deleteproperty/:id", auth, verifyLandlord, deleteProperty);

// 🔹 PROFILES
router.get("/tenant-user/:id", auth, getProfile);
router.get("/landlord-user/:id", auth, getLandlordProfile);


// 🔹 RENTALS
router.post("/create-order", auth, createOrder); // Create Razorpay order
router.post("/capture-payment", auth, capturePayment);// save rental after payment success.
router.get("/my-rentals", auth, myrentals); // fetch tenant rental history.



router.get("/landlord-dashboard", auth, getLandlordDashboard);

// 🔹 ⚠️ ALWAYS LAST
router.get("/:id", getPropertyById);

module.exports = router;
