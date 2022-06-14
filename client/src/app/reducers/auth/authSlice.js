//redux toolkit imports
//createAsyncThunk allows us to create a reducer to deal with async data
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//import our service for dealing with user register and login
import authService from "./authService";

//first, get the user token in the auth header from local storage
//get user from local storage
const user = JSON.parse(localStorage.getItem("user"));

//the initial state of our object
const initialState = {
  //if a user exists in local storage, they are default, otherwise null
  user: user || null,
  message: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
};

//our async thunk function for registering users
//takes in three paramters, first: a temporary path for the async proccess
//second: a callback funciton of what to do with the data
//third: addiotnal options object
export const register = createAsyncThunk(
  "/auth/register",
  //our callback function is async, and takes in user from local storage,
  //aswell as thunkAPI, which allows us to recieve or send requests from funciton
  async (user, thunkAPI) => {
    try {
      //return the response of the authService register, with user passed in
      return await authService.register(user);

      //if an error occurs
    } catch (err) {
      //check all possible error message sources for a hit, and assign to msg
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      //then, reject the api call with a value of the error message
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//thunk function to log in the user
export const login = createAsyncThunk(
  "/auth/login",
  //our callback function is async, and takes in user from local storage,
  //aswell as thunkAPI, which allows us to recieve or send requests from funciton
  async (user, thunkAPI) => {
    try {
      //return the response of the authService register, with user passed in
      return await authService.login(user);

      //if an error occurs
    } catch (err) {
      //check all possible error message sources for a hit, and assign to msg
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();

      //then, reject the api call with a value of the error message
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//a thunk function for log out
export const logout = createAsyncThunk("/auth/logout", async () => {
  //all we do is call the authService logout service worker
  return await authService.logout();
});

//a slice acts as a state manager for the auth state
export const authSlice = createSlice({
  //the name of the state
  name: "auth",
  //its initial state (our initial state object above)
  initialState,
  //reducers for the state (functions we can preform on it)
  reducers: {
    //reset, clears all of the messages and status' of the state
    reset: (state, action) => {
      state.message = "";
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
    },
  },
  //reducer vs extrareducer:
  /*reducer creates an action creator function, and response to that action
    in the same slice */
  /*extrareducer is used when dealing with an action defined elsewhere, 
    -->creates the action on the fly (most common use with createAsyncThunk) */

  //takes in a builder, which builds the action as needed
  extraReducers: (builder) => {
    //we add 3 different register scenarios of a function that could return
    builder
      //first, if api request is pending
      .addCase(register.pending, (state, action) => {
        //make loading true in state
        state.isLoading = true;
      })
      //second, if api request is fulfilled
      .addCase(register.fulfilled, (state, action) => {
        //make loading false in state
        state.isLoading = false;
        //make success true in state
        state.isSuccess = true;
        //set the user as the action payload (returned from service)
        state.user = action.payload;
      })
      //third, if api request is rejected
      .addCase(register.rejected, (state, action) => {
        //make loading false in state
        state.isLoading = false;
        //make error true in state
        state.isError = true;
        //set the user to null, as something clearly went wrong
        state.user = null;
        //set the message as the action payload (message from rejectWithValue)
        state.message = action.payload;
      })
      //then, we add 3 login scenarios that could be returned
      //first, if api request is pending
      .addCase(login.pending, (state, action) => {
        //make loading true in state
        state.isLoading = true;
      })
      //second, if api request is fulfilled
      .addCase(login.fulfilled, (state, action) => {
        //make loading false in state
        state.isLoading = false;
        //make success true in state
        state.isSuccess = true;
        //set the user as the action payload (returned from service)
        state.user = action.payload;
      })
      //third, if api request is rejected
      .addCase(login.rejected, (state, action) => {
        //make loading false in state
        state.isLoading = false;
        //make error true in state
        state.isError = true;
        //set the user to null, as something clearly went wrong
        state.user = null;
        //set the message as the action payload (message from rejectWithValue)
        state.message = action.payload;
      })
      //last, if user logout is fulfilled
      .addCase(logout.fulfilled, (state, action) => {
        //set the user in state to null
        state.user = null;
      });
  },
});

//export all of the reducers from the slice
export const { reset } = authSlice.actions;

//export the reducer as our default
export default authSlice.reducer;
