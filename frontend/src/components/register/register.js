import React from 'react';
import Form from './form';
import WarningList from './warningList';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class Register extends React.Component{
    render(){
        return (
            <div>
                <WarningList warnings={this.props.warningRegister}/>
                <Form />
                <Link to='/login'>Sign in</Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        warningRegister: state.warningRegister,
    }  
}

export default connect(mapStateToProps, null)(Register);