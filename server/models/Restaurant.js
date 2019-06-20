const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hours: { type: String, required: true },
  address: { type: String, required: true }
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
