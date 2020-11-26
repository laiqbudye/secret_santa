import React, { Fragment, useState, useContext } from 'react';
import { Link, Redirect } from "react-router-dom";
// import {setAlert} from '../../actions/alert';
import { GlobalContext } from '../context/GlobalState';
import PropTypes from 'prop-types';


const Register = () => {
    const { registerEmployee } = useContext(GlobalContext)
    //defining initial state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: ''
    });

    const { name, email, address } = formData;

    // updating state
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        registerEmployee({ name, email, address }); // sending as object
    };


    return (
        <Fragment>
            <h1 className="large text-primary">Secret Santa</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
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
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        value={address}
                        onChange={e => onChange(e)}
                    />
                </div>
                
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
        </Fragment>
    )
};

Register.propTypes = {
    // setAlert: PropTypes.func.isRequired,
    // register: PropTypes.func.isRequired
}

export default Register;