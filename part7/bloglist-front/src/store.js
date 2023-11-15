/* eslint-disable */
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import thunk from 'redux-thunk'
import userReducer from "./reducers/userReducer"
import notificationReducer from "./reducers/notificationReducer"

const store = configureStore({
    reducer: {
        user: userReducer,
        notifications: notificationReducer
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk], // Use o callback diretamente
})

export default store

