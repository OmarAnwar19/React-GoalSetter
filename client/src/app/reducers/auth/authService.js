//the auth service is for dealing with sending requests to our backend server

//node imports
import axios from "axios";

//the url of our endpoint
const base_url = "http://localhost:3001/api/users";

//register our user
const register = async (userData) => {
  //send an axios post request to the base_url with the user data
  const res = await axios.post(base_url, userData);

  //if we get a response, set the user in local storage
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  //then return the response data
  return res.data;
};

//login our user
const login = async (userData) => {
  //send an axios post request to the base_url/login with the user data
  const res = await axios.post(`${base_url}/login`, userData);

  //if we get a response, set the user in local storage
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  //then return the response data
  return res.data;
};

const logout = () => {
  //remove the user from local storage when logout is called
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
