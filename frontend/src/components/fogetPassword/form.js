import React from 'react';
import './forgetPassword.css';
import {forgetPasswordUser, loadMail} from '../../actions/user'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { withRouter } from "react-router-dom";
import {validationResendPwd} from '../../utils/validationForm'


class Form extends React.Component{
    state = {
        email: '',
        errSign: '',
        errMsg: ''

    }

    componentDidMount() {
        this.props.loadMail()
    }

    changeMail = (e) => {
        this.setState({
            email: e.target.value,
            errSign: '',
            errMsg: ''
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.email)
            if (validationResendPwd(this.state.email, this.props.listMails))
                this.props.forgetPasswordUser(this.state, this.props.history)
            else {
                this.setState({
                    errSign: '\u2717',
                    errMsg: 'wrongMail'
                })
            }
    }
    render() {
        console.log(validationResendPwd(this.state.email, this.props.listMails))
        return (
            <form id="ForgetPwd_form" onSubmit={(e) => this.handleSubmit(e)}>
                <div id='ForgetPwd_blockInput'>
                    <div className='ForgetPwd_frame'>
                        <img className='ForgetPwd_logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537541388/Netflix42/mail_dgwbct.png' alt='mail'/>                
                        <input id="ForgetPwd_input" type="email "value={this.state.email} placeholder={this.props.language.resendPwdInput} onChange={(e) => this.changeMail(e)}/>
                        <img id='ForgetPwd_button' onClick={this.handleSubmit} src={(!this.state.email || this.state.errMsg) ? 'https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538232571/Netflix42/send_white.png' : 'https://res.cloudinary.com/dzhnhtkyv/image/upload/v1538231140/Netflix42/send.png'} alt='send'/>
                    </div>
                    <div className='ForgetPwd_line'/>
                    <div className='ForgetPwd_checkInput'>{this.state.errSign}</div>
                    <div className='ForgetPwd_validInput'>{this.props.language[this.state.errMsg]}</div>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        language: state.loadLanguage,
        listMails: state.loadMail
    }  
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({forgetPasswordUser, loadMail}, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form))