const User = require("../models/UserModel");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id; // assuming user ID comes from route or JWT
    const user = await User.findById(userId).select("-password"); // exclude password
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
