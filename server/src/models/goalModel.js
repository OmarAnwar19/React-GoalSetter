//node imports
const mongoose = require("mongoose");

//our goal schema for creating goals
const goalSchema = mongoose.Schema(
  {
    //all of the table data
    text: {
      type: String,
      required: [true, "Goal text required."],
    },
    //the user that created the goal
    user: {
      //the type is an id object, for the user id
      type: mongoose.Schema.Types.ObjectId,
      //where the id comes from
      ref: "User",
      required: true,
    },
  },
  //this returns created and updated stamps
  { timestamps: true }
);

//add the model to the database
const Goal = mongoose.model("Goal", goalSchema, "Goals");

module.exports = Goal;
