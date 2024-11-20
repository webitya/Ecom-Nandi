import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice/userSlice.js'
import homeProductsReducer from './features/homeProductSlice/homeProductSlice.js'

const store = configureStore({
    reducer: {
        user: userReducer,
        homeProductsData: homeProductsReducer,
    }
})

export default store;