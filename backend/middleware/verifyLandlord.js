// optional helper to protect landlord-only routes
const verifyLandlord = (req, res, next) => {
  if (req.user.role !== "landlord") {
    return res.status(403).json({ message: "Access denied: Landlord only" });
  }
  next();
};

module.exports = verifyLandlord;
