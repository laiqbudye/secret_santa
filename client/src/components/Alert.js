import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

const Alert = ({ }) => {
    const { showAlert, alertInfo } = useContext(GlobalContext);
    return (
        showAlert !== null && showAlert && 
        <div className={`alert alert-${alertInfo.alertType}`}>
            {alertInfo.msg}
        </div>
    )
    
}


export default Alert;
