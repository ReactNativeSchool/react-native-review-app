const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;
const User = require("../models/User");

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, "SUPER_SECRET_TOKEN");

    if (payload) {
      console.log("hello", payload);
      // User.findOne({ _id: ObjectId(payload.userId) })
      //   .then(user => {
      //     console.log("user", user);
      //     req.user = user;
      //     next();
      //   })
      //   .catch(err => {
      //     console.log("err", err);
      //     next();
      //   });
      next();
    } else {
      next();
    }
  } catch (err) {
    next();
  }
});

module.exports = app;
