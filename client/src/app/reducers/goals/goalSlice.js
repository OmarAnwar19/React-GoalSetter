//redux toolkit imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//import our service for dealing with user register and login
import goalService from "./goalService";

const initialState = {
  goals: [],
  message: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
};

//create new goal
export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData, thunkAPI) => {
    try {
      //get our token from our user auth state
      const token = thunkAPI.getState().auth.user.token;

      //return the response of the goalService create, with goalData
      return await goalService.createGoal({ text: goalData }, token);

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

//get all goals async thunk function
export const getGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI) => {
    try {
      //get our token from our user auth state
      const token = thunkAPI.getState().auth.user.token;

      //return the response of the goalService getGoals, with only token passed
      return await goalService.getGoals(token);

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

//delete goal by id thunk function
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id, thunkAPI) => {
    try {
      //get our token from our user auth state
      const token = thunkAPI.getState().auth.user.token;

      //return the response of the goalService getGoals, passing in id
      return await goalService.deleteGoal(id, token);

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

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    //resets the state back to the initial state
    reset: (state) => initialState,
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
      .addCase(createGoal.pending, (state, action) => {
        //make loading true in state
        state.isLoading = true;
      })
      //second, if api request is fulfilled
      .addCase(createGoal.fulfilled, (state, action) => {
        //make loading false in state
        state.isLoading = false;
        //make success true in state
        state.isSuccess = true;
        //add the new goal to the goal state
        state.goals.push(action.payload);
      })
      //third, if api request is rejected
      .addCase(createGoal.rejected, (state, action) => {
        //make loading false in state
        state.isLoading = false;
        //make error true in state
        state.isError = true;
        //set the message as the action payload (message from rejectWithValue)
        state.message = action.payload;
      })
      //first, if api request is pending
      .addCase(getGoals.pending, (state, action) => {
        //make loading true in state
        state.isLoading = true;
      })
      //second, if api request is fulfilled
      .addCase(getGoals.fulfilled, (state, action) => {
        //make loading false in state
        state.isLoading = false;
        //make success true in state
        state.isSuccess = true;
        //set the goals as the return of the get all goals service
        state.goals = state.goals.concat(action.payload);
      })
      //third, if api request is rejected
      .addCase(getGoals.rejected, (state, action) => {
        //make loading false in state
        state.isLoading = false;
        //make error true in state
        state.isError = true;
        //set the message as the action payload (message from rejectWithValue)
        state.message = action.payload;
      }) //first, if api request is pending
      .addCase(deleteGoal.pending, (state) => {
        //make loading true in state
        state.isLoading = true;
      })
      //second, if api request is fulfilled
      .addCase(deleteGoal.fulfilled, (state, action) => {
        //make loading false in state
        state.isLoading = false;
        //make success true in state
        state.isSuccess = true;
        //filter through the goals, and only add ones where the id is not the same
        //: as the id of the goal we just deleted
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      //third, if api request is rejected
      .addCase(deleteGoal.rejected, (state, action) => {
        //make loading false in state
        state.isLoading = false;
        //make error true in state
        state.isError = true;
        //set the message as the action payload (message from rejectWithValue)
        state.message = action.payload;
      });
  },
});

//export our reducer actions
export const { reset } = goalSlice.actions;

//export the reducer itself
export default goalSlice.reducer;
