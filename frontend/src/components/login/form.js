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
        console.log(this.props.errLogin)
        return(
            <form id="Login_form" onSubmit={(e) => this.handleSubmit(e)}>            
                {/* <Link id="forget" onClick={(e) => this.props.resetWarning()} to='/forgetpassword'>Mot de passe oublié?</Link>                 */}
                <div className='Login_frame'>
                    <img className='Login_logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537541388/Netflix42/mail_dgwbct.png' alt='mail'/>                
                    <input id="email" type="email "value={this.state.email} placeholder="Mail" onChange={(event) => this.setState({email: event.target.value})}/>
                    {/* <div className='Login_validInput' style={{color: checkValidInput.mail(this.state.mail, this.props.listMails).color}}><span className='Login_checkInput'>{checkValidInput.mail(this.state.mail, this.props.listMails).sign}</span>{checkValidInput.mail(this.state.mail, this.props.listMails).value}</div> */}
                </div>
                <div className='Login_line'/>
                <div className='Login_frame'>
                    <img className='Login_logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537543400/Netflix42/pwd.png' alt='password'/>
                    <input id="password" type="password" value={this.state.password} placeholder={this.props.language.password} onChange={(event) => this.setState({password: event.target.value})}/>
                    {/* <div className='Login_validInput' style={{color: checkValidInput.pwd(this.state.pwd).color}}><span className='Login_checkInput'>{checkValidInput.pwd(this.state.pwd).sign}</span>{checkValidInput.pwd(this.state.pwd).value}</div> */}
                </div>
                <div className='Login_line'/>
                <button className='Login_buttonSignIn' type="submit">{this.props.language.signIn}</button>
                <div id='Login_buttonsApi'>
                    <SignIn img='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537542974/Netflix42/42.png'text={this.props.language.continueWithApi} link={link_fortytwo}/>                
                    <SignIn img='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537537025/Netflix42/google_qhuzoc.png' text={this.props.language.continueWithApi} link={link_google}/>
                </div>
                <Link id="Login_signUp" onClick={(e) => this.props.resetWarning()} to='/signup'>{this.props.language.changeSignUp}<span id='Login_bold'>{this.props.language.signUp}</span></Link>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    
    return{
        language: state.loadLanguage,
        errLogin: state.errLogin
    }  
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({resetWarning, loginUser}, dispatch)
    }
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));
