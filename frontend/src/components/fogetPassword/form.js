import React from 'react';
import './forgetPassword.css';
import { forgetPasswordUser } from '../../actions/user'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

class Form extends React.Component{
    state = {
        email: ""
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.forgetPasswordUser(this.state);
    }
    render(){
        console.log(this.props.language)
        return (
            <form id="ForgetPwd_form" onSubmit={(e) => this.handleSubmit(e)}>
                <input id="ForgetPwd_input" type="email" value={this.state.email} placeholder="Mail" onChange={(event) => this.setState({email: event.target.value})}/>
                <div className='ForgetPwd_line'/>
            <button className='ForgetPwd_buttonForgetPwd' type="submit">{this.props.language.resendPwd}</button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        language: state.loadLanguage
    }  
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({forgetPasswordUser}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form)