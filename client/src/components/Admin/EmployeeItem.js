import React from 'react';

export const EmployeeItem = ({employee}) => {
    return (
        <li key={employee._id}>
        {employee.name} <span>{employee.email}</span>
    </li>
    )
}
