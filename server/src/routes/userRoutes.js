//node imports
const express = require("express");
const router = express();

//controller imports
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/userController");

//file imports
//import the protect middleware so we can protect routes
const { protect } = require("../middleware/authMiddleware");

//route all traffic to "/" depending on the request type
router.route("/").post(registerUser);
router.route("/login").post(loginUser);
//pass in the protect middlware as second argument, to verify auth
//router.get("/me").all(protect).get(getMe);
router.get("/me", protect, getMe);

module.exports = router;
