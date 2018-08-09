import React from 'react';
import Form from './form';
import WarningList from './warningList';
import { connect } from 'react-redux';

class Register extends React.Component{
    render(){
        return (
            <div>
                <WarningList warnings={this.props.warningRegister}/>
                <Form />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    return{
        warningRegister: state.warningRegister,
    }  
}

export default connect(mapStateToProps, null)(Register);