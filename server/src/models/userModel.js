//node imports
const mongoose = require("mongoose");

//our user schema for creating users
const userSchema = mongoose.Schema(
  {
    //all of the table data
    name: {
      type: String,
      required: [true, "Name field required."],
    },
    email: {
      type: String,
      required: [true, "Email field required."],
    },
    password: {
      type: String,
      required: [true, "Password field required."],
    },
  },
  //this returns created and updated stamps
  { timestamps: true }
);

//add the model to the database
const User = mongoose.model("User", userSchema, "Users");

module.exports = User;
