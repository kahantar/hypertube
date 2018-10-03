import React from 'react';
import Register from './components/register/register';
import Login from './components/login/login';
//import Home from './components/home/home';
import UpdateProfil from './components/updateProfil/updateProfil';
import { Switch, Route } from 'react-router-dom';
import CompleteAuth from './components/completeAuth/completeAuth';
import ForgetPassword from './components/fogetPassword/forgetPassword';
import ResetPassword from './components/resetPassword/resetPassword';
import Users from './components/users/users';
import Video from './components/video/video';
import Search from './components/search/search';

const Routes = () => (
    <Switch>
        <Route exact path='/' component={Register}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/profil' component={UpdateProfil}/>
        <Route exact path='/completeauth' component={CompleteAuth}/>
        <Route exact path='/forgetpassword' component={ForgetPassword}/>
        <Route exact path='/resetpassword' component={ResetPassword}/>
        <Route exact path='/search' component={Search}/>
        <Route exact path='/users' component={Users} />
        <Route exact path='/video' component={Video} />
    </Switch>
)

export default Routes;
