const Property = require("../models/PropertyModel.js");

// all create, read, update, delete functions for property

// add property
exports.addProperty = async (req, res) => {
  try {
    const landlordId = req.user.id;

    const property = new Property({
      ...req.body,
      landlordId,
    });

    await property.save();
    console.log("Response from backend:", property);
    console.log("Response from backend:", property.images);

    res.status(200).json({ message: "Property added successfully", property });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
    console.error(err.response ? err.response.data : err.message);

    console.log("Error adding propert",error)
  }
};


exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};



// Update a property
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndUpdate(
      { _id: req.params.id, landlordId: req.user.id },
      req.body,
      { new: true }
    );
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Delete a property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({
      _id: req.params.id,
      landlordId: req.user.id
    });
    if (!property) return res.status(404).json({ message: "Property not found" });
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });

    res.status(200).json(property);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};