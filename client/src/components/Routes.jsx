import React, { PureComponent } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'

import Persons from './Persons'
import Login from "./Login";
import Profile from "./Profile";
import Person from "./Profile";
import PersonProfile from "./PersonProfile"
import Units from "./Units";
import Unit from "./Unit";

const Routes = () => (
    <Switch>
        {/* <Route path="/" exact component={App} /> */}
        <Route path="/login" exact component={Login} />
        <ProtectedRoute path="/profile" render={(props) => (<PersonProfile {...props} cookies={this.props.cookies} />)} />
        {/* <ProtectedRoute path="/profile" component={PersonProfile} /> */}
        <ProtectedRoute path="/persons" exact render={(props) => (<Persons {...props} cookies={this.props.cookies} />)} />
        <ProtectedRoute path="/persons/:id" render={(props) => (<PersonProfile {...props} cookies={this.props.cookies} />)} />
        <ProtectedRoute path="/add-person" exact render={(props) => (<PersonProfile {...props} cookies={this.props.cookies} />)} />
        <ProtectedRoute path="/units" exact render={(props) => (<Units {...props} cookies={this.props.cookies} />)} />
        <ProtectedRoute path="/units/:id" render={(props) => (<Unit {...props} cookies={this.props.cookies} />)} />
        <ProtectedRoute path="/add-unit" exact render={(props) => (<Unit {...props} cookies={this.props.cookies} />)} />
    </Switch>
);

export default Routes;