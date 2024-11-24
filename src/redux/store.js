import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice';
import sellerReducer from "./features/sellerSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    seller: sellerReducer, // Added sellerReducer here
  },
});

export default store;
