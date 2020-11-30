import React from 'react';
import Register from './Register';
import Alert from './Alert';
import DiscoverChild from './DiscoverChild';
import { Route, Switch } from 'react-router-dom';
import { NotFound } from './NotFound';
import { AddEmployee } from './AddEmployee';

export const Landing = (props) => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <Alert />
                    <Switch>
                        <Route exact path='/' component={Register}></Route>
                        <Route exact path='/discoverchild/:empid/:token' component={DiscoverChild}></Route>
                        <Route exact path='/admin/addemployee' component={AddEmployee}></Route>
                        <Route component={NotFound}></Route>
                    </Switch>
                </div>
            </div>
        </section>
    )
}
