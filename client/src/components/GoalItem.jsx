//react imports
import React from "react";

//redux imports
import { useDispatch } from "react-redux";

//import deleteGoal from our goals slice
import { deleteGoal, getGoals } from "../app/reducers/goals/goalSlice";

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    dispatch(deleteGoal(goal._id));
  };

  return (
    <div className="goal">
      {/* create a new date using the goal createdAt from schema */}
      <div>{new Date(goal.createdAt).toLocaleString("en-US")}</div>
      <h2>{goal.text}</h2>
      {/* on button click, dispatch the delete goal action, passing in the id */}
      <button onClick={handleDelete} className="close">
        X
      </button>
    </div>
  );
};

export default GoalItem;
