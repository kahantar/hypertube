import React from 'react';
import Form from './form';
import WarningList from '../register/warningList';
import { connect } from 'react-redux';

class Login extends React.Component{
    render(){
        return(
            <div>
                <WarningList warnings={this.props.warningLogin}/>
                <Form/>
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