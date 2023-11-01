import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "showNotification":
        return action.payload
    case "hideNotification":
        return ''
    default:
        return state
  }
}
const NotificationContext = createContext()
