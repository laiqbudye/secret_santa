import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
//initial State

const initialState = {
    employees: [],
    error: null,
    loading: true,
    showAlert: false,
    alertInfo: null,
    isAuthenticated: false,
    empData: null
}

//now create a context
export const GlobalContext = createContext(initialState);

//now create a provider component
export const GlobalProvider = ({ children  }) => {
    const [state, dispatch] =useReducer(AppReducer, initialState);
    let timer = null;

    const setAlert = (msg, alertType)  => {

        dispatch({
            type: 'SET_ALERT',
            payload: {msg, alertType}
        });
    
        timer = setTimeout(() => dispatch({
            type: 'REMOVE_ALERT'
        }),3000);
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

            setAlert(res.data.msg, 'success');
        } catch (error) {
           
            dispatch({
                type: 'EMPLOYEE_REGISTER_ERROR',
                payload: error.response.data.error
            })

            setAlert(error.response.data.error, 'danger');
        }
    }

    // verify employee on basis of emp id and token

    async function verifyEmployee(empid, token){

        try {
            const res = await axios.get(`/api/employee/discoverchild/${empid}/${token}`);

            dispatch({
                type: 'EMPLOYEE_FOUND',
                payload: res.data
            });

        } catch (error) {
            dispatch({
                type: 'EMPLOYEE_NOT_FOUND',
                payload: error.response.data.error
            });
            
        }
    }


    //Add an employee to DB - Admin can add employee entry in DB

    async function addEmployeeByAdmin({name, email}){

        //clearing current alert box
        clearTimeout(timer);
        timer = null;
        dispatch({
            type: 'REMOVE_ALERT'
        })

        const config = {
            headers:{
                'Content-type': 'application/json'
            }
        }

        const body = JSON.stringify({name, email });

        try {
            const res = await axios.post('/api/employee/admin/addemployee',body, config)
            dispatch({
                type: 'EMPLOYEE_ADDED_BY_ADMIN'
            })

            setAlert(res.data.msg, 'success');
        } catch (error) {
           
            dispatch({
                type: 'EMPLOYEE_ADDED_BY_ADMIN_ERROR'
            })

            setAlert(error.response.data.error, 'danger');
        }
    }
    return(<GlobalContext.Provider value={{
        registerEmployee,
        verifyEmployee,
        addEmployeeByAdmin,
        error: state.error,
        loading: state.loading,
        showAlert: state.showAlert,
        alertInfo: state.alertInfo,
        isAuthenticated: state.isAuthenticated,
        empData: state.empData
    }}>
        {children}
    </GlobalContext.Provider>)
}