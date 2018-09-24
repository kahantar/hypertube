import React from 'react';
import Form from './form';
import WarningList from '../utilsComponent/warningList';
import { connect } from 'react-redux';
import {loadMail} from '../../actions/user';
import {bindActionCreators} from 'redux';

class Register extends React.Component{
    constructor(props) {
        super(props)
    }
    componentWillMount(){
        console.log('ok')
        this.props.loadMail()
        console.log(this.props.loadMails)
    }
    render(){
        return (
            <div>
                <Form />
                <WarningList warnings={this.props.warningRegister}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    
    return{
        warningRegister: state.warningReducers,
        loadMails: state.loadMail
    }  
}

const mapDispatchToProps = (dispatch) => {
    return{
        ...bindActionCreators({ loadMail }, dispatch),
    }  
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);