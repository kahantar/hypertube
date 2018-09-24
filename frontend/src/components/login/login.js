import React from 'react';
import Form from './form';
// import WarningList from '../utilsComponent/warningList';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { resetWarning } from '../../actions/user';


class Login extends React.Component{
    render(){
        return(
            <div className='Login_background'>
                {/* <WarningList warnings={this.props.warningLogin}/> */}
                <img id='Login_logo' src="https://fontmeme.com/permalink/180901/3bd2426f867386d0ba5efba6386554cd.png" alt="hypertube"/>
                <Form/>
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