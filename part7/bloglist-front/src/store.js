/* eslint-disable */
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import thunk from 'redux-thunk'
import userReducer from "./reducers/userReducer"
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"

const store = configureStore({
    reducer: {
        user: userReducer,
        notifications: notificationReducer,
        blog: blogReducer
    },
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), thunk], // Use o callback diretamente
})

export default store

