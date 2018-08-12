import React from 'react';
import Register from './components/register/register';
import Login from './components/login/login';
import Home from './components/home/home';
import { Switch, Route } from 'react-router-dom';

const Routes = () => (
    <Switch>
        <Route exact path='/' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/home' component={Home}/>
    </Switch>
)

export default Routes;