import React, { useState, useContext, Fragment } from 'react';
import { GlobalContext } from '../../context/GlobalState';

export const AddEmployee = () => {
    const { addEmployeeByAdmin } = useContext(GlobalContext)
    //defining initial state
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    const { name, email } = formData;

    // updating state
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        addEmployeeByAdmin({ name, email }); // sending as object
        setFormData({
            name: '',
            email: ''
        })
    };


    return (
        <Fragment>
            <h1 className="large text-primary">Add Employee</h1>
            <p className="lead"><i className="fas fa-user"></i>For Admin use only</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Employee Name"
                        name="name"
                        required
                        value={name}
                        onChange={e => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        required
                        value={email}
                        onChange={e => onChange(e)}
                    />
                </div>
                
                
                <input type="submit" className="btn btn-primary" value="Add Employee" />
            </form>
        </Fragment>
    )
}
