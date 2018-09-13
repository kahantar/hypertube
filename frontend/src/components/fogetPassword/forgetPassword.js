import React from 'react';
import Form from './form';
import WarningList from '../utilsComponent/warningList';
import { connect } from 'react-redux';

class ForgetPassword extends React.Component{
    render(){
        return(
            <div>
                <WarningList warnings={this.props.warningForget} />
                <Form />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        warningForget: state.warningReducers
    }
}

export default connect(mapStateToProps)(ForgetPassword);