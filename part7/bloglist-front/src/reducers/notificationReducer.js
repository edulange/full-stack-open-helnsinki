/* eslint-disable */

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