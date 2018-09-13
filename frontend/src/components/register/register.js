import React from 'react';
import Form from './form';
import WarningList from '../utilsComponent/warningList';
import { connect } from 'react-redux';

class Register extends React.Component{
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
    }  
}

export default connect(mapStateToProps)(Register);