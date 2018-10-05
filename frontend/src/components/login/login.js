import React from 'react';
import Form from './form';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { loadLanguage } from '../../actions/user';
import { Link } from 'react-router-dom'


class Login extends React.Component{
    componentWillMount() {
        this.props.loadLanguage('English')
    }
    changeLanguage = () => {
        (this.props.language.language === 'English') ? this.props.loadLanguage('Français') : this.props.loadLanguage('English')
    }
    render(){
        return(
            <div className='Login_background'>
                <Link id='Login_logo' to='/'><img src="https://fontmeme.com/permalink/180901/3bd2426f867386d0ba5efba6386554cd.png" alt="hypertube"/></Link>
                <Form/>
                <div id='language' onClick={this.changeLanguage}>{this.props.language.language}<div id='arrowLanguage'/></div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        warningLogin: state.warningReducers,
        language: state.loadLanguage
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        ...bindActionCreators({loadLanguage}, dispatch)
    }  
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);