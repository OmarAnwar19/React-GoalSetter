//react imports
import React, { useEffect } from "react";

//node imports
import { toast } from "react-toastify";

//router imports
import { useNavigate } from "react-router-dom";

//redux toolkit imoprts
import { useSelector, useDispatch } from "react-redux";

//import reset and getGoals from our goalSlice
import { reset, getGoals } from "../../app/reducers/goals/goalSlice";

//component imports
import GoalForm from "../GoalForm";
import GoalItem from "../GoalItem";
import Spinner from "../Spinner";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //get the user from our auth global state
  const { user } = useSelector((state) => state.auth);
  //get the goals and status' from our goals global state
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  //each time a user changes, or a redirect happens, this effect will fire
  useEffect(() => {
    //if there is an error
    if (isError) {
      //output the error message
      toast.error(message);
    }

    //if no user is logged
    if (!user) {
      ///redirect to the login page
      navigate("/login");

      //tell the user they have to login
      toast.error("Please login to view goals.");
    }

    //lastly, if all checkes passed, dispatch getGoals
    dispatch(getGoals());

    //if you want to do something when a component unmounts:
    //--> have to return something on use effect, here, we dispatch reset on unmount
    return () => {
      //dispatch our reset in goals
      dispatch(reset());
    };
  }, [user, navigate, dispatch, isError, message]);

  //if isLoading, return the spinner
  if (isLoading) {
    return <Spinner />;
  }

  //otherwise, we can just load the dashboard normally
  return (
    <div>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm />

      <section className="content">
        {/* only  output goals if the number of goals is > 0*/}
        {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal={goal} />
            ))}
          </div>
        ) : (
          <h3>No goals have been created yet!</h3>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
