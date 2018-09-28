import React from 'react';
import Form from './form';
import WarningList from '../utilsComponent/warningList';
import { connect } from 'react-redux';

class ForgetPassword extends React.Component{
    render(){
        return(
            <div className='ForgetPwd_background'>
                <img id='ForgetPwd_logo' src="https://fontmeme.com/permalink/180901/3bd2426f867386d0ba5efba6386554cd.png" alt="hypertube"/>
                <Form />
                <div id='language' onClick={this.changeLanguage}>{this.props.language.language}<div id='arrowLanguage'/></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        warningForget: state.warningReducers,
        language: state.loadLanguage
    }
}

export default connect(mapStateToProps)(ForgetPassword);