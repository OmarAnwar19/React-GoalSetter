//node imports
import axios from "axios";

//the url of our endpoint
const base_url = "http://localhost:3001/api/goals";

//create new goal function
const createGoal = async (goalData, token) => {
  //our config object will have our headers for the request
  const config = {
    //set our headers
    headers: {
      //authorization header will be bearer token
      Authorization: `Bearer ${token}`,
    },
  };

  //await the response of our post request to the base url with goal data
  //--> we also have to pass in config so the auth token is passed in header
  const res = await axios.post(base_url, goalData, config);

  //return the data from the request
  return res.data;
};

//get all goals function
const getGoals = async (token) => {
  //our config object will have our headers for the request
  const config = {
    //set our headers
    headers: {
      //authorization header will be bearer token
      Authorization: `Bearer ${token}`,
    },
  };

  //await the response of our get request to the base url
  //--> we also have to pass in config so the auth token is passed in header
  const res = await axios.get(base_url, config);

  //return the data from the request
  return res.data;
};

//delete goal by id function
const deleteGoal = async (id, token) => {
  //our config object will have our headers for the request
  const config = {
    //set our headers
    headers: {
      //authorization header will be bearer token
      Authorization: `Bearer ${token}`,
    },
  };

  //send a delete request to the url/id_to_delete
  const res = await axios.delete(`${base_url}/${id}`, config);

  //return the data from the request
  return res.data;
};

const goalService = {
  createGoal,
  getGoals,
  deleteGoal,
};

export default goalService;
