//react imports
import React, { useState } from "react";

//redux imports
import { useDispatch } from "react-redux";

//import our createGoal action from our slice
import { createGoal } from "../app/reducers/goals/goalSlice";

const GoalForm = () => {
  const dispatch = useDispatch();

  //the state for our form text input
  const [text, setText] = useState("");

  //function for handling new goal form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    //dispatch the create goal action with our input text
    dispatch(createGoal(text));

    //set the text state to an empty input
    setText("");
  };

  return (
    <section className="form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default GoalForm;
