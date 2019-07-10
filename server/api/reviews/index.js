const app = require("../../util/configureApi");
const connectDB = require("../../util/db");
const Review = require("../../models/Review");
const Restaurant = require("../../models/Restaurant");

app.get("*", require("../../middleware/auth"), (req, res) => {
  connectDB()
    .then(() => {
      const { restaurantId } = req.query;
      if (!restaurantId) {
        throw new Error("No document id specified.");
      }

      return Review.find({ restaurantId }).sort({ createdAt: -1 });
    })
    .then(result => {
      res.status(200).json({
        result
      });
    })
    .catch(err => {
      res.status(err.statusCode || 500).json({
        error: err.message
      });
    });
});

app.post("*", require("../../middleware/auth"), (req, res) => {
  connectDB()
    .then(() => Restaurant.findOne({ _id: req.body.restaurantId }))
    .then(restaurant => {
      if (!restaurant) {
        throw new Error("No restaurant found with that id.");
      }

      const { restaurantId, content } = req.body;
      return Review.create({ restaurantId, content });
    })
    .then(result => {
      res.status(200).json({
        result
      });
    })
    .catch(err => {
      res.status(err.statusCode || 500).json({
        error: err.message
      });
    });
});

module.exports = app;
