import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: ''
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.message = action.payload.message
        },
        clearNotification: (state) => {
            state.message = ''
        }
    }
})


export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer

/*
const notificationReducer = ( state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {...state, message: action.payload.message }
        case 'CLEAR_NOTIFICATION':
            return {...state, message: null}
        default:
            return state
    }
}
export default notificationReducer
*/ 
