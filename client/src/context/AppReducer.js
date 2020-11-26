export default (state, action) => {
    switch (action.type) {
        case 'EMPLOYEE_REGISTERED':
            return {
                ...state
            }
        case 'EMPLOYEE_REGISTER_ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'SET_ALERT':
            return {
                ...state,
                showAlert: true,
                alertInfo: action.payload
            }
        case 'REMOVE_ALERT':
            return {
                ...state,
                showAlert: false,
                alertInfo: null
            }
        default:
            return state;
    }
}