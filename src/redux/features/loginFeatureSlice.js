'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    value: {
        name: null,
        email:null,
        role:null
    }
}

const loginFeatureSlice= createSlice({
    name: 'loginFeature',
    initialState,
    reducers: {
        updateUser: (state, actions) => {
            state.value= actions.payload
        },
    }
});

export const { updateUser } = loginFeatureSlice.actions;
export default loginFeatureSlice.reducer;