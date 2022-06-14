import { configureStore } from "@reduxjs/toolkit";

//import reducers
import authReducer from "./reducers/auth/authSlice";
import goalReducer from "./reducers/goals/goalSlice";

//export and configure our store using reducers
export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
});
