//node imports
//express-async-handler makes handling requests with async more clean
//otherwise, we would have to use .then .catch, which is less clear
const asyncHandler = require("express-async-handler");

//file imports
//our model, for adding and removing stuff to and from the db
const Goal = require("../models/goalModel");
//our user model, so we can verify user
const User = require("../models/userModel");

// @desc    Get all goals
// @route   GET /api/goals
// @access  Private
const getAllGoals = asyncHandler(async (req, res) => {
  //find the goals, then return 200 status (success), and all the goals
  const goals = await Goal.find({});
  res.status(200).json(goals);
});

// @desc    Get single goal
// @route   GET /api/goals/:id
// @access  Private
const getUserGoals = asyncHandler(async (req, res) => {
  //find goals where user id is the one we passed in through the request
  //our auth middleware is what inserted id into the request
  const goals = await Goal.find({ user: req.user.id });
  //return 200 status (success), and the goals
  res.status(200).json(goals);
});

// @desc    Create goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
  //if there is no request body text, return an error message and status
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a request body");
  }

  //if no error, create a goal using the text passed in
  const goal = await Goal.create({ text: req.body.text, user: req.user.id });
  //return 200 status (success), and the goal we created
  res.status(200).json(goal);
});

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
  //first, try to find the goal using id they entered
  const goal = await Goal.findById(req.params.id);

  //if no goal was found, return a 400 (error) status, and error mesasage
  if (!goal) {
    //return a 400 (error) status, and error mesasage
    res.status(400);
    throw new Error(`No goal with id ${req.params.id} found.`);
  }

  //if the user is not found
  if (!req.user) {
    //return a 401 (no auth) status, and error mesasage
    res.status(401);
    throw new Error("User not found.");
  }

  //next, if user is found, we have to make sure its the same as who created goal
  if (goal.user.toString() !== req.user.id) {
    //if they arent the same user, return a 400 (error) status, and error mesasage
    res.status(401);
    throw new Error("User not authorized.");
  }

  //otherwise, find the goal with said id, and update it using req.body.text
  const updated = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  //return 200 status (success), and the goal we updated
  res.status(200).json(updated);
});

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
  //first, try to find the goal using id they entered
  const delGoal = await Goal.findById(req.params.id);

  //if no goal was found, return a 400 (error) status, and error mesasage
  if (!delGoal) {
    res.status(400);
    throw new Error(`No goal with id ${req.params.id} found.`);
  }

  //if the user is not found
  if (!req.user) {
    //return a 401 (no auth) status, and error mesasage
    res.status(401);
    throw new Error("User not found.");
  }

  //next, if user is found, we have to make sure its the same as who created goal
  if (delGoal.user.toString() !== req.user.id) {
    //if they arent the same user, return a 400 (error) status, and error mesasage
    res.status(401);
    throw new Error("User not authorized.");
  }

  //if goal found and user authenticated, remove the goal
  const deleted = await delGoal.remove();

  //return 200 status (success), and the goal we deleted
  res.status(200).json(deleted);
});

//export route controller
module.exports = {
  getAllGoals,
  getUserGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
