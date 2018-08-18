import React from 'react';
import Form from './form';
import WarningList from '../utilsComponent/warningList';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { resetWarning } from '../../actions/user';

class Register extends React.Component{
    render(){
        return (
            <div>
                <WarningList warnings={this.props.warningRegister}/>
                <Form />
                <Link onClick={(e) => this.props.resetWarning()} to='/login'>Sign in</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        warningRegister: state.warningReducers,
    }  
}

const mapDispatchToProps = (dispatch) => {
    return{
        ...bindActionCreators({resetWarning}, dispatch)
    }  
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);