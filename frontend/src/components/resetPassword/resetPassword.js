import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import qs from 'query-string';
import { loadInfoUser } from '../../actions/user';
import { Link } from 'react-router-dom';

import Form from './form';
import './resetPassword.css'

class ResetPassword extends React.Component{
    loadInfo = () => {
        this.props.loadInfoUser(qs.parse(this.props.location.search))
    }
    render(){
        if (JSON.stringify(this.props.infoProfil) === '[]')
            this.loadInfo()
        return(
            <div className='background'>
                <Link id='logo' to='/'><img src="https://fontmeme.com/permalink/180901/3bd2426f867386d0ba5efba6386554cd.png" alt="hypertube"/></Link>
                <Form />
                <div id='language' onClick={this.changeLanguage}>{this.props.language.language}<div id='arrowLanguage'/></div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({loadInfoUser}, dispatch)
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.loadLanguage
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);