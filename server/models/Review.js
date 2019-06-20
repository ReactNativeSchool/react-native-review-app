const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  content: { type: String, required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Review", ReviewSchema);
