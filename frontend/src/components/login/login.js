import React from 'react';
import Form from './form';
import WarningList from '../utilsComponent/warningList';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import { resetWarning } from '../../actions/user';


class Login extends React.Component{
    render(){
        return(
            <div>
                <WarningList warnings={this.props.warningLogin}/>
                <Form/>
                <Link onClick={(e) => this.props.resetWarning()} to='/forgetpassword'>Forget</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        warningLogin: state.warningReducers
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        ...bindActionCreators({resetWarning}, dispatch)
    }  
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);