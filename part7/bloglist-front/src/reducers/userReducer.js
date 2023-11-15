/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    loginUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, clearUser, loginUser } = userSlice.actions;
export default userSlice.reducer;
