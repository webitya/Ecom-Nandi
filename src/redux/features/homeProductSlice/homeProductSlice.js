import { createSlice } from "@reduxjs/toolkit";
import { HomeProductData } from "../../../Components/HomeComp/HomeProductLayout/HomeProductData"

export const initialState= {
    value: HomeProductData
}

const HomeProductSlice= createSlice({
    name: 'homeProductsData',
    initialState,
    reducers: {
        addProducts: (state, action) => {
            state.value= action.payload
        }
    }
})

export const { addProducts } = HomeProductSlice.actions;
export default HomeProductSlice.reducer;