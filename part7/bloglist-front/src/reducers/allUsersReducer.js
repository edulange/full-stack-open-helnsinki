/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";

const allUsersSlice = createSlice({
    name: 'allUsers',
    initialState: {allUsers: []},
    reducers: {
        setAllUsers: (state, action) => {
            state.allUsers = action.payload
        }
    }
})

export const { setAllUsers } = allUsersSlice.actions;
export default allUsersSlice.reducer;
