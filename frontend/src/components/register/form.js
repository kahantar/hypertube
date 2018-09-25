import React from 'react';
import './register.css';
import { registerUser, resetWarning } from '../../actions/user'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import {loadMail} from '../../actions/user';
import checkValidInput from '../../utils/checkValidInputRegister'


class Form extends React.Component{
    state = {
        mail: "",
        username: "",
        firstName: "",
        secondName: "",
        pwd: "",
        confirmPwd: ""
    }

    componentWillMount(){
        this.props.loadMail()
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const checkValidAllInput = (checkValidInput.mail(this.state.mail, this.props.listMails).sign === '\u2713'
                                    && checkValidInput.username(this.state.username).sign === '\u2713'
                                    && checkValidInput.firstName(this.state.firstName).sign === '\u2713'
                                    && checkValidInput.secondName(this.state.secondName).sign === '\u2713'
                                    && checkValidInput.pwd(this.state.pwd).sign === '\u2713'
                                    && checkValidInput.confirmPwd(this.state.confirmPwd, this.state.pwd).sign === '\u2713')
                                    ? true : false

        if (checkValidInput.allIsValid)
            // this.props.registerUser(this.state)
            console.log(checkValidAllInput)
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
            if (checkValidInput.confirmPwd(this.state.confirmPwd).sign === '\u2717')
                this.setState({pwd: '', confirmPwd: ''})
        }
    }
    render(){
        return (
            <form id="Register_form" onSubmit={(e) => this.handleSubmit(e)}>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537541388/Netflix42/mail_dgwbct.png' alt='mail'/>                
                    <input id="email" type="email "value={this.state.mail} placeholder="Mail" onChange={(event) => this.setState({mail: event.target.value})}/>
                    <div className='Register_validInput' style={{color: checkValidInput.mail(this.state.mail, this.props.listMails).color}}><span className='Register_checkInput'>{checkValidInput.mail(this.state.mail, this.props.listMails).sign}</span>{checkValidInput.mail(this.state.mail, this.props.listMails).value}</div>
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537545396/Netflix42/user.png' alt='user'/>
                    <input id="username" type="text" value={this.state.username} placeholder="Username" onChange={(event) => this.setState({username: event.target.value})}/>
                    <div className='Register_validInput' style={{color: checkValidInput.username(this.state.username).color}}><span className='Register_checkInput'>{checkValidInput.username(this.state.username).sign}</span>{checkValidInput.username(this.state.username).value}</div>
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537545396/Netflix42/user.png' alt='user'/>
                    <input id="first" type="text" value={this.state.firstName} placeholder="First Name" onChange={(event) => this.setState({firstName: event.target.value})}/>
                    <div className='Register_validInput' style={{color: checkValidInput.firstName(this.state.firstName).color}}><span className='Register_checkInput'>{checkValidInput.firstName(this.state.firstName).sign}</span>{checkValidInput.firstName(this.state.firstName).value}</div>
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537545396/Netflix42/user.png' alt='user'/>
                    <input id="name" type="text" value={this.state.secondName} placeholder="Second Name" onChange={(event) => this.setState({secondName: event.target.value})}/> 
                    <div className='Register_validInput' style={{color: checkValidInput.secondName(this.state.secondName).color}}><span className='Register_checkInput'>{checkValidInput.secondName(this.state.secondName).sign}</span>{checkValidInput.secondName(this.state.secondName).value}</div>               
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537543400/Netflix42/pwd.png' alt='password'/>
                    <input id="password" type="password" value={this.state.pwd} placeholder="Password" onChange={(event) => this.setState({pwd: event.target.value})}/>
                    <div className='Register_validInput' style={{color: checkValidInput.pwd(this.state.pwd).color}}><span className='Register_checkInput'>{checkValidInput.pwd(this.state.pwd).sign}</span>{checkValidInput.pwd(this.state.pwd).value}</div>
                </div>
                <div className='Register_line'/>
                <div className='Register_frame'>
                    <img className='logoForm' src='https://res.cloudinary.com/dzhnhtkyv/image/upload/v1537543400/Netflix42/pwd.png' alt='password'/>
                    <input id="confirm" type="password" value={this.state.confirmPwd} placeholder="Confirmation" onChange={(event) => this.setState({confirmPwd: event.target.value})}/>  
                    <div className='Register_validInput' style={{color: checkValidInput.confirmPwd(this.state.confirmPwd, this.state.pwd).color}}><span className='Register_checkInput'>{checkValidInput.confirmPwd(this.state.confirmPwd, this.state.pwd).sign}</span>{checkValidInput.confirmPwd(this.state.confirmPwd, this.state.pwd).value}</div>              
                </div>
                <div className='Register_line'/>
                <button type="submit">SIGN UP</button>
                <Link id="signIn" onClick={(e) => this.props.resetWarning()} to='/'>Already member ? <span id='bold'>SIGN IN</span></Link>
            </form>            
        );
    }
}

// const mapStateToProps = (state) => {
    
//     return{
//         warningRegister: state.warningReducers,
//         loadMails: state.loadMail
//     }  
// }

// const mapDispatchToProps = (dispatch) => {
//     return{
//         ...bindActionCreators({ loadMail }, dispatch),
//     }  
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Register);

const mapStateToProps = (state) => {
    
    return {
        listMails: state.loadMail
    }  
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({registerUser, resetWarning, loadMail}, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
