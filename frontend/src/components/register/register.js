import React from 'react';
import Form from './form';
import {loadLanguage} from '../../actions/user'
// import WarningList from '../utilsComponent/warningList';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';

class Register extends React.Component{
    changeLanguage = () => {
        (this.props.language.language === 'English') ? this.props.loadLanguage('Français') : this.props.loadLanguage('English')
    }
    render(){
        return (
            <div className='background'>
                <img id='logo' src="https://fontmeme.com/permalink/180901/3bd2426f867386d0ba5efba6386554cd.png" alt="hypertube"/>
                <Form />
                <div id='language' onClick={this.changeLanguage}>{this.props.language.language}<div id='arrowLanguage'/></div>
                {/* <WarningList warnings={this.props.warningRegister}/> */}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    
    return{
        language: state.loadLanguage
    }  
}

const mapDispatchToProps = (dispatch) => {
    return{
        ...bindActionCreators({ loadLanguage }, dispatch),
    }  
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
// export default Register