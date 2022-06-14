//react imports
import React, { useState, useEffect } from "react";

//node imports
import { toast } from "react-toastify";

//react router imports
import { useNavigate } from "react-router-dom";

//redux toolkit imports
//selctor allows us to get state, dispatch allows us to dispatch an action
import { useSelector, useDispatch } from "react-redux";

//import register and reset actions from our authSlice
import { register, reset } from "../../app/reducers/auth/authSlice";

//component imports
import Spinner from "../Spinner";

//icon imports
import { FaUser } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //our state holds all of the inputs for our login,
  //--> password2 is our confirm password field
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  //destructure all of our inputs from our formData state
  const { name, email, password, password2 } = formData;

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
      toast.success(`${name[0]} registered successfully!`);
    }

    //finally, dispatch our reset action to clear state
    dispatch(reset());
  }, [name, user, isError, isSuccess, message, navigate, dispatch]);

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

    //if confirm password does not match
    if (password[0] !== password2[0]) {
      //output an error toast
      toast.error("Passwords do not match.");

      //otherwise, dispatch the register function in our slice
    } else {
      //get our user data
      const userData = {
        name: name[0],
        email: email[0],
        password: password[0],
      };

      //dispatch our register function with our userData
      dispatch(register(userData));
    }
  };

  //if isLoading, return the spinner
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please register to access the website.</p>
      </section>

      <section className="form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Enter your name..."
              value={name}
              onChange={handleChange}
            />
          </div>

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
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              placeholder="Confirm your password..."
              value={password2}
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

export default Register;
