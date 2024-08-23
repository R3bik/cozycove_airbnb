const mongoose = require("mongoose");
// Creating Models

// step 1 : create mongoose schema
const User = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//step 2 : create mongoose model
const UserModel = mongoose.model("User", User);

//step 3 : export model
module.exports = UserModel;
