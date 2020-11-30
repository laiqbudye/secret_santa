import React, {Fragment, useContext, useEffect} from 'react';
import { GlobalContext } from '../../context/GlobalState';
import { EmployeeItem } from './EmployeeItem';

export const EmployeeList = () => {
    const {employees, fetchAllEmployees} = useContext(GlobalContext);

    useEffect(() => {
        fetchAllEmployees();
    },[]);

    return (
        <Fragment>
            <h3>Employees</h3>
            <ul className="list">
                {employees.map(employee => (
                    <EmployeeItem key={employee._id} employee={employee}/>)
                )}
            </ul>
        </Fragment>
    )
}
