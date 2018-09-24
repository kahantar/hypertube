import React from 'react';
import { loginUser, resetWarning } from '../../actions/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import SignIn from './signIn';
import './login.css';

const link_fortytwo = "http://localhost:8080/auth/42";
const link_google = "http://localhost:8080/auth/google";

class Form extends React.Component{
    state = {
        email: '',
        password: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.loginUser(this.state, this.props.history);
    }
    render(){
        return(
            <form id="Login_form" onSubmit={(e) => this.handleSubmit(e)}>            
                {/* <Link id="forget" onClick={(e) => this.props.resetWarning()} to='/forgetpassword'>Mot de passe oublié?</Link>                 */}
                <div className='Login_frame'>
                    <img className='Login_logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537541388/Netflix42/mail_dgwbct.png' alt='mail'/>                
                    <input id="email" type="email "value={this.state.email} placeholder="Mail" onChange={(event) => this.setState({email: event.target.value})}/>
                </div>
                <div className='Login_line'/>
                <div className='Login_frame'>
                    <img className='Login_logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537543400/Netflix42/pwd.png' alt='password'/>
                    <input id="password" type="password" value={this.state.password} placeholder="Password" onChange={(event) => this.setState({password: event.target.value})}/>
                </div>
                <div className='Login_line'/>
                <button className='Login_buttonSignIn' type="submit">SIGN IN</button>
                <div id='Login_buttonsApi'>
                    <SignIn img='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537542974/Netflix42/42.png' text="Continue with 42" link={link_fortytwo}/>                
                    <SignIn img='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537537025/Netflix42/google_qhuzoc.png' text="Continue with Google" link={link_google}/>
                </div>
                <Link id="Login_signUp" onClick={(e) => this.props.resetWarning()} to='/'>Not a member yet ? <span id='Login_bold'>SIGN UP</span></Link>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({resetWarning, loginUser}, dispatch)
    }
    
}

export default withRouter(connect(null, mapDispatchToProps)(Form));
