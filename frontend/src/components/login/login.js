import React from 'react';
import Form from './form';
import WarningList from '../register/warningList';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'


class Login extends React.Component{
    render(){
        return(
            <div>
                <WarningList warnings={this.props.warningLogin}/>
                <Form/>
                <Link to='/forgetpassword'>Forget</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        warningLogin: state.warningLogin
    }
}

export default connect(mapStateToProps)(Login);