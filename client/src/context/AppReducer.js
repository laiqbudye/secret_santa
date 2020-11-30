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
        case 'EMPLOYEE_FOUND':
            return {
                ...state,
                empData: action.payload,
                isAuthenticated: true
            }
        case 'EMPLOYEE_NOT_FOUND':
            return {
                ...state,
                empData: null,
                isAuthenticated: false,
                alertInfo: action.payload
            }
        case 'EMPLOYEE_ADDED_BY_ADMIN':
            return {
                ...state
            }
        case 'EMPLOYEE_ADDED_BY_ADMIN_ERROR':
            return {
                ...state
            }
        default:
            return state;
    }
}