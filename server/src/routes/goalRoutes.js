//node imports
const express = require("express");
const router = express.Router();

//controller imports
const {
  getGoals,
  getUserGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

//import our auth middleware
const { protect } = require("../middleware/authMiddleware");

//use the pro tect middleware for all of our routes
router.use(protect);

//we can make a router, which routes to multiple different endpoints from
//the same url, here, anytime a route hits "/", depending on request:
//if its a get, getGoals, if its a post, setGoal
router.route("/").get(getUserGoals).post(setGoal);
//same as with above, but with :id aswell
router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
