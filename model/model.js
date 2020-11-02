const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");

// Schema to create a new user in the database

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  googleId: String,
  facebookId: String,
  message: [],
  favourite: [],
  follow: [],
});

userSchema.plugin(passportLocalMongoose); // Hash and salt passwords
userSchema.plugin(findOrCreate); // Enables schema use 'findOrCreate'

module.exports = new mongoose.model("User", userSchema);
