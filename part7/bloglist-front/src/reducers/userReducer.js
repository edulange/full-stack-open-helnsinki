/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

//assim é mais fácil de ler
const initialState = {
  user: null,
  username: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      state.username = '';
      state.password = ''
    },
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setPassword: (state, action) => {
      state.password = action.payload
    }
  },
});

export const { clearUser, loginUser, setUsername, setPassword } = userSlice.actions;
export default userSlice.reducer;

