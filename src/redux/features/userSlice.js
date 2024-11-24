// import { createSlice } from "@reduxjs/toolkit";
// import { useRequestApi } from "../../hooks/useRequestApi";


// const initialState = {
//     value: {
//         name: null,
//         email: null,
//         role: null
//     }

// }

// export const userSlice = createSlice({
//     name: "user",
//     initialState,
//     reducers: {
//         setUser(state, action) {
//             state.value = action.payload;
//         },

//     }
// })

// export const { setUser } = userSlice.actions
// export default userSlice.reducer


import { createSlice } from "@reduxjs/toolkit";
import { useRequestApi } from "../../hooks/useRequestApi";

const initialState = {
  value: {
    name: null,
    email: null,
    role: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.value = action.payload;
    },

    // New action to update the user's role
    updateRole(state, action) {
      state.value.role = action.payload;
    },
  },
});

export const { setUser, updateRole } = userSlice.actions;
export default userSlice.reducer;
