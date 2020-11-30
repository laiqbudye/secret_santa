import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
//initial State

const initialState = {
    employees: [],
    error: null,
    loading: true,
    showAlert: false,
    alertInfo: null
}

//now create a context
export const GlobalContext = createContext(initialState);

//now create a provider component
export const GlobalProvider = ({ children  }) => {
    const [state, dispatch] =useReducer(AppReducer, initialState);


    const setAlert = (msg, alertType)  => {

        console.log("inside setalert")
        dispatch({
            type: 'SET_ALERT',
            payload: {msg, alertType}
        });
    
        setTimeout(() => dispatch({
            type: 'REMOVE_ALERT'
        }),5000);
    };


    // actions to perform

    async function registerEmployee({name, email, address}) {
        const config = {
            headers:{
                'Content-type': 'application/json'
            }
        }

        const body = JSON.stringify({name, email, address});

        try {
            const res = await axios.post('/api/employee',body, config)
            dispatch({
                type: 'EMPLOYEE_REGISTERED',
                payload: res.data.data
            })

            setAlert('Please chek your mail', 'success');
        } catch (error) {
           
            dispatch({
                type: 'EMPLOYEE_REGISTER_ERROR',
                payload: error.response.data.error
            })

            setAlert(error.response.data.error, 'danger');
        }
    }



    return(<GlobalContext.Provider value={{
        registerEmployee,
        error: state.error,
        loading: state.loading,
        showAlert: state.showAlert,
        alertInfo: state.alertInfo
    }}>
        {children}
    </GlobalContext.Provider>)
}