import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/User/userSlice";
import messageReducer from "../features/Message/mesageSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
