/* eslint-disable */

import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    successMessage: null,
    errorMessage: null,
  },
  reducers: {
    setSuccessMessage: (state, action) => {
      state.successMessage = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    clearNotification: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
});

export const { setSuccessMessage, setErrorMessage, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;


/*
const initiaState = {
    successMessage: null,
    errorMessage: null
}

const notificationReducer = (state = initiaState, action) => {
    switch (action.type) {
        case 'SET_SUCCESS_MESSAGE':
            return { ...state, successMessage: action.data }
        case 'SET_ERROR_MESSAGE':
            return { ...state, errorMessage: action.data }
        case 'CLEAR_NOTIFICATION':
            return {...initiaState}
        default:
            return state
    }
}

export const setSuccessMessage = (message) => ({
    type: 'SET_SUCCESS_MESSAGE',
    data: message
})
export const setErrorMessage = (message) => ({
    type: 'SET_ERROR_MESSAGE',
    data: message
})
export const clearNotification = () => ({
    type: 'CLEAR_NOTIFICATION'
})

export default notificationReducer
*/