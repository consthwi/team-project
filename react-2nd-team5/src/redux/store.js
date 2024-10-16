import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "./reducer/bookmarkReducer";
import authReducer from "./reducer/authReducer";

export const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
    auth: authReducer,
  },
});

