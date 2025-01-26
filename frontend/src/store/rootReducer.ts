import { combineReducers } from "@reduxjs/toolkit";
import toastRedcer from "./slices/toastSlice";
import authReducer from "./slices/authSlice";

const rootReducer = combineReducers({
  toast: toastRedcer,
  auth: authReducer,
});

export default rootReducer;
