import { configureStore } from "@reduxjs/toolkit";
import rootAReducer from "./rootReducer";

const store = configureStore({
  reducer: rootAReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
