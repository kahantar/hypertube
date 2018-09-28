import React from 'react';
import './register.css';
import { registerUser, completeUser, loadInfoUser, resetInfoProfil } from '../../actions/user'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import {loadMail} from '../../actions/user';
import checkValidInput from '../../utils/checkValidInputRegister'
import { withRouter } from "react-router-dom";
import qs from 'query-string'


class Form extends React.Component{
    state = {
        mail: '',
        signMail: '',
        colorMail: '',
        valueMail: '',
        username: '',
        signUsername: '',
        colorUsername: '',
        valueMail: '',
        firstName: '',
        signFirstName: '',
        colorFirstName: '',
        valueFirstName: '',
        secondName: '',
        signSecondName: '',
        colorSecondName: '',
        valueSecondName: '',
        pwd: '',
        signPwd: '',
        colorPwd: '',
        valuePwd: '',
        confirmPwd: '',
        signConfirmPwd: '',
        colorConfirmPwd: '',
    }

    componentDidMount(){
        if (qs.parse(this.props.location.search).token) {
            this.props.loadInfoUser(qs.parse(this.props.location.search))
            this.props.loadMail()
        }
    }

    changeMail = (e) => {
        const mail = checkValidInput.mail(e.target.value, this.props.listMails)
        this.setState({
            mail: e.target.value,
            signMail: mail.sign,
            colorMail: mail.color,
            valueMail: mail.value
        })
    }

    changeUsername = (e) => {
        const username = checkValidInput.username(e.target.value)
        this.setState({
            username: e.target.value,
            signUsername: username.sign,
            colorUsername: username.color,
            valueUsername: username.value
        })
    }

    changeFirstName = (e) => {
        const firstName = checkValidInput.firstName(e.target.value)
        this.setState({
            firstName: e.target.value,
            signFirstName: firstName.sign,
            colorFirstName: firstName.color,
            valueFirstName: firstName.value
        })
    }

    changeSecondName = (e) => {
        const secondName = checkValidInput.secondName(e.target.value)
        this.setState({
            secondName: e.target.value,
            signSecondName: secondName.sign,
            colorSecondName: secondName.color,
            valueSecondName: secondName.value
        })
    }

    changePwd = (e) => {
        const pwd = checkValidInput.pwd(e.target.value)
        this.setState({
            pwd: e.target.value,
            signPwd: pwd.sign,
            colorPwd: pwd.color,
            valuePwd: pwd.value
        })
    }

    changeConfirmPwd = (e) => {
        const confirmPwd = checkValidInput.confirmPwd(e.target.value, this.state.pwd)
        this.setState({
            confirmPwd: e.target.value,
            signConfirmPwd: confirmPwd.sign,
            colorConfirmPwd: confirmPwd.color,
            valueConfirmPwd: confirmPwd.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const checkValidAllInput = ((checkValidInput.mail(this.state.mail, this.props.listMails).sign === '\u2713'
                                    && checkValidInput.username(this.state.username).sign === '\u2713'
                                    && checkValidInput.firstName(this.state.firstName).sign === '\u2713'
                                    && checkValidInput.secondName(this.state.secondName).sign === '\u2713'
                                    && checkValidInput.pwd(this.state.pwd).sign === '\u2713'
                                    && checkValidInput.confirmPwd(this.state.confirmPwd, this.state.pwd).sign === '\u2713')
                                    || (this.props.infoProfil.email
                                    && checkValidInput.pwd(this.state.pwd).sign === '\u2713'
                                    && checkValidInput.confirmPwd(this.state.confirmPwd, this.state.pwd).sign === '\u2713'))
                                    ? true : false

        if (checkValidAllInput) {
            if (this.props.infoProfil.email) {
                const user = {
                    email: this.props.infoProfil.email,
                    username: this.props.infoProfil.username,
                    first_name: this.props.infoProfil.first_name,
                    name: this.props.infoProfil.name,
                    password: this.state.pwd,
                    img: this.props.infoProfil.img
                }
                this.props.completeUser(user, this.props.history)
            }
            else
                this.props.registerUser(this.state, this.props.history)
        }
        else {
            if (checkValidInput.mail(this.state.mail, this.props.listMails).sign === '\u2717')
                this.setState({mail: '', signMail: '', colorMail: '', valueMail: ''})
            if (checkValidInput.username(this.state.username).sign === '\u2717')
                this.setState({username: '', signUsername: '', colorUsername: '', valueUsername: ''})
            if (checkValidInput.firstName(this.state.firstName).sign === '\u2717')
                this.setState({firstName: '', signFirstName: '', colorFirstName: '', valueFirstName: ''})
            if (checkValidInput.secondName(this.state.secondName).sign === '\u2717')
                this.setState({secondName: '', signSecondName: '', colorSecondName: '', valueSecondName: ''})
            if (checkValidInput.pwd(this.state.pwd).sign === '\u2717')
                this.setState({pwd: '', signPwd: '', colorPwd: '', valuePwd: '', confirmPwd: '', signConfirmPwd: '', colorConfirmPwd: '', valueConfirmPwd: ''})
            if (checkValidInput.confirmPwd(this.state.confirmPwd, this.state.pwd).sign === '\u2717')
                this.setState({pwd: '', signPwd: '', colorPwd: '', valuePwd: '', confirmPwd: '', signConfirmPwd: '', colorConfirmPwd: '', valueConfirmPwd: ''})
        }
    }
    render(){
        return (
            <form id="Register_form" onSubmit={(e) => this.handleSubmit(e)}>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537541388/Netflix42/mail_dgwbct.png' alt='mail'/>                
                    <input id="email" type="email "value={(this.props.infoProfil.email) ? this.props.infoProfil.email : this.state.mail} placeholder="Mail" onChange={(e) => (!this.props.infoProfil.email) ? this.changeMail(e) : null}/>
                    <div className='Register_checkInput' style={{color: (this.props.infoProfil.email) ? '#18e23a' : this.state.colorMail}}>{(this.props.infoProfil.email) ? '\u2713' : this.state.signMail}</div>
                    <div className='Register_validInput'>{this.props.language[this.state.valueMail]}</div>
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537545396/Netflix42/user.png' alt='user'/>
                    <input id="username" type="text" value={(this.props.infoProfil.email) ? this.props.infoProfil.username : this.state.username} placeholder={this.props.language.username} onChange={(e) => (!this.props.infoProfil.email) ? this.changeUsername(e) : null}/>
                    <div className='Register_checkInput' style={{color: (this.props.infoProfil.email) ? '#18e23a' : this.state.colorUsername}}>{(this.props.infoProfil.email) ? '\u2713' : this.state.signUsername}</div>
                    <div className='Register_validInput'>{this.props.language[this.state.valueUsername]}</div>
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537545396/Netflix42/user.png' alt='user'/>
                    <input id="first" type="text" value={(this.props.infoProfil.email) ? this.props.infoProfil.first_name : this.state.firstName} placeholder={this.props.language.firstName} onChange={(e) => (!this.props.infoProfil.email) ? this.changeFirstName(e) : null}/>
                    <div className='Register_checkInput' style={{color: (this.props.infoProfil.email) ? '#18e23a' : this.state.colorFirstName}}>{(this.props.infoProfil.email) ? '\u2713' : this.state.signFirstName}</div>
                    <div className='Register_validInput'>{this.props.language[this.state.valueFirstName]}</div>
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537545396/Netflix42/user.png' alt='user'/>
                    <input id="name" type="text" value={(this.props.infoProfil.email) ? this.props.infoProfil.name : this.state.secondName} placeholder={this.props.language.secondName} onChange={(e) => (!this.props.infoProfil.email) ? this.changeSecondName(e) : null}/> 
                    <div className='Register_checkInput' style={{color: (this.props.infoProfil.email) ? '#18e23a' : this.state.colorSecondName}}>{(this.props.infoProfil.email) ? '\u2713' : this.state.signSecondName}</div>
                    <div className='Register_validInput'>{this.props.language[this.state.valueSecondName]}</div>               
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537543400/Netflix42/pwd.png' alt='password'/>
                    <input id="password" type="password" value={this.state.pwd} placeholder={this.props.language.password} onChange={(e) => this.changePwd(e)}/>
                    <div className='Register_checkInput' style={{color: this.state.colorPwd}}>{this.state.signPwd}</div>
                    <div className='Register_validInput'>{this.props.language[this.state.valuePwd]}</div>
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537543400/Netflix42/pwd.png' alt='password'/>
                    <input id="confirm" type="password" value={this.state.confirmPwd} placeholder="Confirmation" onChange={(e) => this.changeConfirmPwd(e)}/>  
                    <div className='Register_checkInput' style={{color: this.state.colorConfirmPwd}}>{this.state.signConfirmPwd}</div>          
                </div>
                <div className='Register_line'/>
                <button type="submit">{this.props.language.signUp}</button>
                <Link id="signIn" onClick={this.props.resetInfoProfil} to='/'>{this.props.language.changeSignIn}<span id='bold'>{this.props.language.signUp}</span></Link>
            </form>            
        );
    }
}

const mapStateToProps = (state) => {
    
    return {
        listMails: state.loadMail,
        language: state.loadLanguage,
        infoProfil: state.infoProfil
    }  
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({registerUser, loadMail, completeUser, loadInfoUser, resetInfoProfil}, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form))
