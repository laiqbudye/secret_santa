import React, {Fragment} from 'react';

export const NotFound = () => {
    return (
        <Fragment>
            <h1 className='x-large text-primary'>
                <i className='fas fa-exclamation-triangle' /> Page Not Found
            </h1>
            <p className='large'>Sorry, the page you are looking for does not exist</p>
        </Fragment>
    )
}
