//react imports
import React from "react";

//node imports
import { toast } from "react-toastify";

//react router imports
import { Link, useNavigate } from "react-router-dom";

//redux toolkit imports
import { useSelector, useDispatch } from "react-redux";

//import logout and reset from our auth slice
import { logout, reset } from "../app/reducers/auth/authSlice";

//icon imports
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //get our user from global state
  const { user } = useSelector((state) => state.auth);

  //function to handle logout
  const handleLogout = (e) => {
    //on logout, dispatch the logout function to logout, and reset to clear state
    dispatch(logout());
    dispatch(reset());

    //output a success toast
    toast.success("Logged out successfully!");
    //then, navigate to dashboard
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">GoalSetter</Link>
      </div>

      {/* if user is logged in, output logout button, otherwise output register and login */}
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;
