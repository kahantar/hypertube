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
        mail: "",
        username: "",
        firstName: "",
        secondName: "",
        pwd: "",
        confirmPwd: ""
    }

    async componentDidMount(){
        if (qs.parse(this.props.location.search).token) {
            await this.props.loadInfoUser(qs.parse(this.props.location.search))
            console.log(this.props.infoProfil)
            // this.setState({
            //     mail: this.props.infoProfil.email,
            //     username: this.props.infoProfil.username,
            //     firstName: this.props.infoProfil.first_name,
            //     secondName: this.props.infoProfil.name
            // })
            this.props.loadMail()
        }
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
            console.log('de')
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
                console.log(user)
            }
            else
                this.props.registerUser(this.state, this.props.history)
        }
        else {
            if (checkValidInput.mail(this.state.mail, this.props.listMails).sign === '\u2717')
                this.setState({mail: ''})
            if (checkValidInput.username(this.state.username).sign === '\u2717')
                this.setState({username: ''})
            if (checkValidInput.firstName(this.state.firstName).sign === '\u2717')
                this.setState({firstName: ''})
            if (checkValidInput.secondName(this.state.secondName).sign === '\u2717')
                this.setState({secondName: ''})
            if (checkValidInput.pwd(this.state.pwd).sign === '\u2717')
                this.setState({pwd: '', confirmPwd: ''})
            if (checkValidInput.confirmPwd(this.state.confirmPwd, this.state.pwd).sign === '\u2717')
                this.setState({pwd: '', confirmPwd: ''})
        }
    }
    render(){
        return (
            <form id="Register_form" onSubmit={(e) => this.handleSubmit(e)}>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537541388/Netflix42/mail_dgwbct.png' alt='mail'/>                
                    <input id="email" type="email "value={(this.props.infoProfil.email) ? this.props.infoProfil.email : this.state.mail} placeholder="Mail" onChange={(event) => (!this.props.infoProfil.email) ? this.setState({mail: event.target.value}) : null}/>
                    <div className='Register_checkInput' style={{color: (this.props.infoProfil.email) ? '#18e23a' : checkValidInput.mail(this.state.mail, this.props.listMails).color}}>{(this.props.infoProfil.email) ? '\u2713' : checkValidInput.mail(this.state.mail, this.props.listMails).sign}</div>
                    <div className='Register_validInput'>{this.props.language[checkValidInput.mail(this.state.mail, this.props.listMails).value]}</div>
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537545396/Netflix42/user.png' alt='user'/>
                    <input id="username" type="text" value={(this.props.infoProfil.email) ? this.props.infoProfil.username : this.state.username} placeholder={this.props.language.username} onChange={(event) => (!this.props.infoProfil.email) ? this.setState({username: event.target.value}) : null}/>
                    <div className='Register_checkInput' style={{color: (this.props.infoProfil.email) ? '#18e23a' : checkValidInput.username(this.state.username).color}}>{(this.props.infoProfil.email) ? '\u2713' : checkValidInput.username(this.state.username).sign}</div>
                    <div className='Register_validInput'>{this.props.language[checkValidInput.username(this.state.username).value]}</div>
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537545396/Netflix42/user.png' alt='user'/>
                    <input id="first" type="text" value={(this.props.infoProfil.email) ? this.props.infoProfil.first_name : this.state.firstName} placeholder={this.props.language.firstName} onChange={(event) => (!this.props.infoProfil.email) ? this.setState({firstName: event.target.value}) : null}/>
                    <div className='Register_checkInput' style={{color: (this.props.infoProfil.email) ? '#18e23a' : checkValidInput.firstName(this.state.firstName).color}}>{(this.props.infoProfil.email) ? '\u2713' : checkValidInput.firstName(this.state.firstName).sign}</div>
                    <div className='Register_validInput'>{this.props.language[checkValidInput.firstName(this.state.firstName).value]}</div>
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537545396/Netflix42/user.png' alt='user'/>
                    <input id="name" type="text" value={(this.props.infoProfil.email) ? this.props.infoProfil.name : this.state.secondName} placeholder={this.props.language.secondName} onChange={(event) => (!this.props.infoProfil.email) ? this.setState({secondName: event.target.value}) : null}/> 
                    <div className='Register_checkInput' style={{color: (this.props.infoProfil.email) ? '#18e23a' : checkValidInput.secondName(this.state.secondName).color}}>{(this.props.infoProfil.email) ? '\u2713' : checkValidInput.secondName(this.state.secondName).sign}</div>
                    <div className='Register_validInput'>{this.props.language[checkValidInput.secondName(this.state.secondName).value]}</div>               
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537543400/Netflix42/pwd.png' alt='password'/>
                    <input id="password" type="password" value={this.state.pwd} placeholder={this.props.language.password} onChange={(event) => this.setState({pwd: event.target.value})}/>
                    <div className='Register_checkInput' style={{color: checkValidInput.pwd(this.state.pwd).color}}>{checkValidInput.pwd(this.state.pwd).sign}</div>
                    <div className='Register_validInput'>{this.props.language[checkValidInput.pwd(this.state.pwd).value]}</div>
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537543400/Netflix42/pwd.png' alt='password'/>
                    <input id="confirm" type="password" value={this.state.confirmPwd} placeholder="Confirmation" onChange={(event) => this.setState({confirmPwd: event.target.value})}/>  
                    <div className='Register_checkInput' style={{color: checkValidInput.confirmPwd(this.state.confirmPwd, this.state.pwd).color}}>{checkValidInput.confirmPwd(this.state.confirmPwd, this.state.pwd).sign}</div>          
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
