//node imports
//for creating json web tokens
const jwt = require("jsonwebtoken");
//for hashing passwords
const bcrypt = require("bcryptjs");
//for handling async requests
const asyncHandler = require("express-async-handler");

//file imports
//our model, for adding and removing stuff to and from the db
const User = require("../models/userModel");

//regex for validation
//password: 6+ characters, at least one lowercase and uppercase letter, at least one number, at least one special character:
const PASS_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*[^a-zA-Z0-9@#$^+=])(.{6,})$/;

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  //destructure values passed in through the request body
  const { name, email, password } = req.body;

  //if any field is missing
  if (!name || !email || !password) {
    //send a 400 status (error), and return an error message
    res.status(400);
    throw new Error("Missing fields.");
  }

  //if password does not match regex
  if (!PASS_REGEX.test(password)) {
    //send a 400 status (error), and return an error message
    res.status(400);
    throw new Error(
      "Password must be 6-16 characters long, and contain an uppercase letter, a number, and a special character."
    );
  }

  //search for users with the inputted email
  const userExists = await User.findOne({ email });

  //if a user with the email they entered already exists,
  if (userExists) {
    //send a 400 status (error), and return an error message
    res.status(400);
    throw new Error("A user with that email already exists.");
  }

  //generate a salt so we can pass our user password
  const salt = await bcrypt.genSalt(10);
  //hash inputted password using the salt generated above
  //takes in the plain text password, and the salt as paramters
  const hashedPassword = await bcrypt.hash(password, salt);

  //finally, create a user with the name, email, and hashedPassword
  const user = await User.create({ name, email, password: hashedPassword });

  //if the user was successfully created
  if (user) {
    //send a 200 status (success)
    res.status(200).json({
      //return user id, name, and email
      //--> we dont return entire object because hashed password
      _id: user._id,
      name: user.name,
      email: user.email,
      token: genToken(user._id),
    });

    //otherwise, if it failed
  } else {
    //send an error status, and send an error message
    res.status(400);
    throw new Error("Invalid credentials.");
  }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  //destructure email and password from request body
  const { email, password } = req.body;

  //find user by the email
  const user = await User.findOne({ email });

  //if the user exists, and the entred password is same as one in db
  //--> note, have to use bcrypt.compare bcs db password is hashed
  if (user && (await bcrypt.compare(password, user.password))) {
    //send a 200 status (success)
    res.status(200).json({
      //return user id, name, and email
      //--> we dont return entire object because hashed password
      _id: user._id,
      name: user.name,
      email: user.email,
      token: genToken(user._id),
    });
    //otherwise, if the passwords did not match
  } else {
    //send an error status, and send an error message
    res.status(400);
    throw new Error("Invalid credentials.");
  }
});

// @desc    Get a user data
// @route   GET /api/users/me
// @access  Public
const getMe = asyncHandler(async (req, res) => {
  //return user with the id that we passed in the request from our auth middleware
  res.status(200).json(req.user);
});

//Generate json web token
const genToken = (id) => {
  //returns a json web token with data of the user id
  //created token using the secret in our environment variables
  //includes additonal options to expire in one hour after creation
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = { registerUser, loginUser, getMe };
