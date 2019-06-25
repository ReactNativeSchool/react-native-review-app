const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

UserSchema.pre("save", function(next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  } else {
    bcrypt.hash(user.password, 10).then(hashedPassword => {
      user.password = hashedPassword;
      next();
    });
  }
});

UserSchema.method("comparePassword", function(candidatePassword) {
  const user = this;

  return bcrypt.compare(candidatePassword, user.password);
});

module.exports = mongoose.model("User", UserSchema);
