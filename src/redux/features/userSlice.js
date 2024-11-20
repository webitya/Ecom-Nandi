import { createSlice } from "@reduxjs/toolkit";
import { useRequestApi } from "../../hooks/useRequestApi";


const initialState = {
    value: {
        name: null,
        email: null,
        role: null
    }

}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.value = action.payload;
        },

    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer