const app = require("../../util/configureApi");
const connectDB = require("../../util/db");
const Review = require("../../models/Review");

app.get("*", (req, res) => {
  connectDB()
    .then(() => {
      const { restaurantId } = req.query;
      if (!restaurantId) {
        throw new Error("No document id specified.");
      }

      return Review.find({ restaurantId });
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
