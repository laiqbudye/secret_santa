import React from 'react';
import Register from './Register';
import Alert from './Alert';
import DiscoverChild from './DiscoverChild';

export const Landing = (props) => {
    console.log(props.location)
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <Alert />
                    <Register />
                </div>
            </div>
        </section>
    )
}
