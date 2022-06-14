//node imports
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

//file imports
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  //if the jwt token exists in request authentication header
  //we also check if user is the bearer (i.e they were give the token)
  //--> make sure they didnt insert it there manually
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //if all good, get the token from the auth header
    try {
      /* 
      authorization header is formatted like this: Bearer Token
      we split the string into an array, and then get the second item
      --> this is "Token", which is our user jwt 
       */
      token = req.headers.authorization.split(" ")[1];

      //verify the token using the token and secret
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //get the user from the token, and assign it in the request body
      //--> this allows us to access the user anywhere we use this middleware
      //.select("-password") returns everything but the password
      req.user = await User.findById(decoded.id).select("-password");

      //move to next (required for middleware)
      next();

      //otherwise, if token error
    } catch (error) {
      //return 401 status (not auth.), and return an error
      res.status(401);
      throw new Error("Authorization failed, validation error.");
    }
  }

  //otheriwse, if no token exists at all
  if (!token) {
    //return 401 status (not auth.), and return an error
    res.status(401);
    throw new Error("Authorization failed, JWT does not exist.");
  }
});

module.exports = { protect };
