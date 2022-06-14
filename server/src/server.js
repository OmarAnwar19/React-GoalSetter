//node imports
const path = require("path");
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv").config();
const app = express();

//file imports
//custom error handle middleware for crud requests
const { errorHandler } = require("./middleware/errorMiddleware");
//helper for connecting to our db
const connectDB = require("./config/db");

//middleware
//allows us to read json in request body
app.use(express.json());
//allows us to read strings in request body
app.use(express.urlencoded({ extended: false }));
//use our custom error handler middleware
app.use(errorHandler);
//cors middleware so we can send requests to and from api's
app.use(cors());

//routes
app.use("/api/goals", require("./routes/goalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

//if the app is in production, use the build folder for react
if (process.env.NODE_ENV === "production") {
  //use react build file
  app.use(express.static("build"));
}

//server setup
const PORT = process.env.PORT || 3001;

//connect to our database using our file above
connectDB();
//connect to our express server
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}...`.magenta)
);
