const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
let isConnected;

// Note: This should be stored in environment variables
const DB_URL =
  "mongodb+srv://admin:HBLDemo@cluster0-5eefd.mongodb.net/test?retryWrites=true&w=majority";

const connectToDatabase = () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  console.log("=> using new database connection");
  return mongoose.connect(DB_URL, { useNewUrlParser: true }).then(db => {
    isConnected = db.connections[0].readyState;
  });
};

module.exports = connectToDatabase;
