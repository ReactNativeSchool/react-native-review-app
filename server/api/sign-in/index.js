const jwt = require("jsonwebtoken");
const app = require("../../util/configureApi");
const connectDB = require("../../util/db");
const User = require("../../models/User");

app.post("*", (req, res) => {
  let finalUser;
  connectDB()
    .then(() => User.findOne({ email: req.body.email }))
    .then(user => {
      if (!user) {
        throw new Error("No user found.");
      }

      finalUser = user;
      return user.comparePassword(req.body.password);
    })
    .then(isMatch => {
      if (!isMatch) {
        throw new Error("Incorrect password.");
      }

      return jwt.sign({ userId: finalUser._id }, "SUPER_SECRET_TOKEN");
    })
    .then(token => {
      res.status(200).json({
        result: {
          firstName: finalUser.firstName,
          lastName: finalUser.lastName,
          email: finalUser.email,
          token
        }
      });
    })
    .catch(err => {
      res.status(err.statusCode || 500).json({
        error: err.message
      });
    });
});

module.exports = app;
