//react imports
import React, { useState, useEffect } from "react";

//node imports
import { toast } from "react-toastify";

//react router imports
import { useNavigate } from "react-router-dom";

//redux toolkit imports
//selctor allows us to get state, dispatch allows us to dispatch an action
import { useSelector, useDispatch } from "react-redux";

//import login and reset actions from our authSlice
import { login, reset } from "../../app/reducers/auth/authSlice";

//component imports
import Spinner from "../Spinner";

//icon imports
import { FaSignInAlt } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //our state holds all of the inputs for our login,
  //--> password2 is our confirm password field
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //destructure all of our inputs from our formData state
  const { email, password } = formData;

  //destructure our state with useSelector
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    //what global state to get from global state object? our auth state
    (state) => state.auth
  );

  //after any of the dependencies states change, this effect will fire
  useEffect(() => {
    //first, check for an error
    if (isError) {
      //send an error toast
      toast.error(message);
    }

    //if success, or if the user is already logged in
    if (isSuccess || user) {
      //redirect the user to the dashboard
      navigate("/");
      //output a success toast if user exists
      toast.success(`Logged in successfully!`);
    }

    //finally, dispatch our reset action to clear state
    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  //each time an input field changes, trigger this callback function
  const handleChange = (e) => {
    //set the form data to the previous state, and the name:value,
    //where name and value are the input field name and inputted value
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: [e.target.value],
    }));
  };

  //on form submit, trigger this callback function
  const handleSubmit = (e) => {
    e.preventDefault();

    //get our user data
    const userData = {
      email: email[0],
      password: password[0],
    };

    //dispatch our login function with our userData
    dispatch(login(userData));
  };

  //if isLoading, return the spinner
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login to start goal setting!</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              placeholder="Enter your email..."
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Enter your password..."
              value={password}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Login;
