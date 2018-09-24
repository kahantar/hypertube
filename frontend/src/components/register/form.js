import React from 'react';
import './register.css';
import { registerUser, resetWarning } from '../../actions/user'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';

class Form extends React.Component{
    state = {
        email: "",
        username: "",
        name: "",
        first_name: "",
        password: "",
        confirm_password: ""
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.registerUser(this.state);
    }
    render(){
        return (
            <form id="form" onSubmit={(e) => this.handleSubmit(e)}>
                <div className='Register_frame'>
                    <img className='logoForm' src={MailImg} alt='mail'/>                
                    <input id="email" type="email "value={this.state.email} placeholder="Mail" onChange={(event) => this.setState({email: event.target.value})}/>
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src={MailImg} alt='mail'/>
                    <input id="username" type="text" value={this.state.username} placeholder="Username" onChange={(event) => this.setState({username: event.target.value})}/>
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src={MailImg} alt='mail'/>
                    <input id="first" type="text" value={this.state.first_name} placeholder="First Name" onChange={(event) => this.setState({first_name: event.target.value})}/>
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src={MailImg} alt='mail'/>
                    <input id="name" type="text" value={this.state.name} placeholder="Second Name" onChange={(event) => this.setState({name: event.target.value})}/>                
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src={PwdImg} alt='password'/>
                    <input id="password" type="password" value={this.state.password} placeholder="Password" onChange={(event) => this.setState({password: event.target.value})}/>
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src={PwdImg} alt='password'/>
                    <input id="confirm" type="password" value={this.state.confirm_password} placeholder="Confirmation" onChange={(event) => this.setState({confirm_password: event.target.value})}/>                
                </div>
                <div className='Register_line'/>
                <button type="submit">SIGN UP</button>
                <Link id="signIn" onClick={(e) => this.props.resetWarning()} to='/login'>Already member ? SIGN IN</Link>
            </form>            
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({registerUser, resetWarning}, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(Form);
