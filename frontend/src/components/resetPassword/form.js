import React from 'react';
import { withRouter } from 'react-router';
import {bindActionCreators} from 'redux'
import { connect } from 'react-redux'
import qs from 'query-string'

import './resetPassword.css';
import { resetPasswordUser } from '../../actions/user'
import checkValidInput from '../../utils/checkValidInputRegister'


class Form extends React.Component{
    state = {
        pwd: '',
		signPwd: '',
		colorPwd: '',
		valuePwd: '',
		confirmPwd: '',
		signConfirmPwd: '',
        colorConfirmPwd: '',
        token: ''
    }

    componentDidMount() {
        const token = qs.parse(this.props.location.search).token
        if (token)
            this.setState({token: token})
        else
            window.location.href = '/'
    }

    changePwd = (e) => {
		const pwd = checkValidInput.pwd(e.target.value.trim())
		this.setState({
			pwd: e.target.value.trim(),
			signPwd: pwd.sign,
			colorPwd: pwd.color,
			valuePwd: pwd.value
		})
	}

	changeConfirmPwd = (e) => {
		const confirmPwd = checkValidInput.confirmPwd(e.target.value.trim(), this.state.pwd)
		this.setState({
			confirmPwd: e.target.value.trim(),
			signConfirmPwd: confirmPwd.sign,
			colorConfirmPwd: confirmPwd.color,
			valueConfirmPwd: confirmPwd.value
		})
	}

    handleSubmit = (e) => {
		e.preventDefault();
		const checkValidAllInput = (checkValidInput.pwd(this.state.pwd).sign === '\u2713' && checkValidInput.confirmPwd(this.state.confirmPwd, this.state.pwd).sign === '\u2713') ? true : false
		if (checkValidAllInput)
			this.props.resetPasswordUser(this.state, this.props.history);			
		else {
			if (checkValidInput.pwd(this.state.pwd).sign === '\u2717')
				this.setState({pwd: '', confirmPwd: '', signConfirmPwd: '', colorConfirmPwd: '', valueConfirmPwd: ''})
			if (checkValidInput.confirmPwd(this.state.confirmPwd, this.state.pwd).sign === '\u2717')
				this.setState({confirmPwd: '', signConfirmPwd: '', colorConfirmPwd: '', valueConfirmPwd: ''})
		}
    }
    render(){
        return (
            <form id="Reset_form" onSubmit={(e) => this.handleSubmit(e)}>
				<div className='Reset_frame'>
					<img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537543400/Netflix42/pwd.png' alt='password'/>
					<input id="password" type="password" value={this.state.pwd} placeholder={this.props.language.newPwd} onChange={(e) => this.changePwd(e)}/>
					<div className='Reset_checkInput' style={{color: this.state.colorPwd}}>{this.state.signPwd}</div>
					<div className='Reset_validInput'>{this.props.language[this.state.valuePwd]}</div>
				</div>
				<div className='Reset_line'/>
				<div className='Reset_frame'>
					<img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537543400/Netflix42/pwd.png' alt='password'/>
					<input id="confirm" type="password" value={this.state.confirmPwd} placeholder="Confirmation" onChange={(e) => this.changeConfirmPwd(e)}/> 
					<div className='Reset_checkInput' style={{color: this.state.colorConfirmPwd}}>{this.state.signConfirmPwd}</div>
				</div>
				<div className='Reset_line'/>
				<button type="submit">{this.props.language.edit}</button>
			</form>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		language: state.loadLanguage
	}  
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({resetPasswordUser}, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));
