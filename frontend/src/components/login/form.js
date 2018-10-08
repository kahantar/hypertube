import React from 'react';
import { resetErrLogin, loginUser, resetMailSent } from '../../actions/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom';
import SignIn from './signIn';
import './login.css';


const link_google = "http://localhost:8080/auth/google";
const link_fortytwo = "http://localhost:8080/auth/42";
const link_slack = "http://localhost:8080/auth/slack";

class Form extends React.Component{
    state = {
        email: '',
        password: '',
    }

    changeMail = (e) => {
        this.setState({email: e.target.value})
        this.props.resetErrLogin()
    }

    changePwd = (e) => {
        this.setState({password: e.target.value})
        this.props.resetErrLogin()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.email && this.state.password) {
            this.props.loginUser(this.state, this.props.history);
            this.props.resetMailSent()
            this.setState({password: ''})
        }
    }
    render(){
        return(
            <form id="Login_form" onSubmit={(e) => this.handleSubmit(e)}>            
                {(this.props.errLogin.unactive) ? <div className="Login_mailAlert">{this.props.language[this.props.errLogin.unactive]}</div> :
                (this.props.mailSent.msg) ? <div className="Login_mailAlert">{this.props.language[this.props.mailSent.msg] + this.props.mailSent.mail}</div> :
                (this.props.errLogin.pwd) ? <Link id="Login_forgotPwd" onClick={this.props.resetErrLogin} to='/forgetpassword'>{this.props.language.forgotPwd}</Link> : null}
                <div className='Login_frame'>
                    <img className='Login_logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537541388/Netflix42/mail_dgwbct.png' alt='mail'/>                
                    <input id="email" type="email "value={this.state.email} placeholder="Mail" onChange={(e) => this.changeMail(e)}/>
                    <div className='Login_checkInput'>{this.props.errLogin.signMail}</div>
                    <div className='Login_validInput'>{this.props.language[this.props.errLogin.mail]}</div>
                </div>
                <div className='Login_line'/>
                <div className='Login_frame'>
                    <img className='Login_logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537543400/Netflix42/pwd.png' alt='password'/>
                    <input id="password" type="password" value={this.state.password} placeholder={this.props.language.password} onChange={(e) => this.changePwd(e)}/>
                    <div className='Login_checkInput'>{this.props.errLogin.signPwd}</div>
                    <div className='Login_validInput'>{this.props.language[this.props.errLogin.pwd]}</div>
                </div>
                <div className='Login_line'/>
                <button className='Login_buttonSignIn' type="submit">{this.props.language.signIn}</button>
                <div id='Login_buttonsApi'>              
                    <SignIn img='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537537025/Netflix42/google_qhuzoc.png' text={this.props.language.continueWithApi} link={link_google}/>
                    <SignIn img='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537542974/Netflix42/42.png'text={this.props.language.continueWithApi} link={link_fortytwo}/>   
                    <SignIn img='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538507334/Netflix42/slack.png'text={this.props.language.continueWithApi} link={link_slack}/>                              
                </div>
                <Link id="Login_signUp" to='/signup'>{this.props.language.changeSignUp}<span id='Login_bold'>{this.props.language.signUp}</span></Link>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        language: state.loadLanguage,
        errLogin: state.errLogin,
        mailSent: state.mailSent
    }  
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({resetErrLogin, resetMailSent, loginUser}, dispatch)
    }
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));
