const connectDB = require("../util/db");
const Restaurant = require("../models/Restaurant");
const Review = require("../models/Review");
const User = require("../models/User");

const data = require("./data");

const seed = () => {
  connectDB()
    .then(() =>
      Promise.all([
        Restaurant.deleteMany({}),
        Review.deleteMany(),
        User.deleteMany()
      ])
    )
    .then(() => User.create({
        firstName: "Test",
        lastName: "User",
        email: "testuser@example.com",
        password: "password"
      }))
    .then(() => Restaurant.create(data))
    .then(res => {
      const chain = res.map((item, index) => {
        const reviews = data[index].reviews;
        const reviewsWithId = reviews.map(review => ({
          ...review,
          restaurantId: item._id
        }));
        return Review.create(reviewsWithId);
      });
      return Promise.all(chain);
    })
    .then(() => console.log("DB Seeded."))
    .catch(error => {
      console.log("error while seeding database.", error);
    })
    .finally(() => process.exit());
};

seed();
