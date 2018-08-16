import React from 'react';
import './style.css';
import { resetPasswordUser } from '../../actions/user'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import { withRouter } from 'react-router';

class Form extends React.Component{
    state = {
        password: "",
        confirm_password: ""
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.resetPasswordUser(this.state, this.props.history);
    }
    render(){
        return (
            <form id="conteneur" onSubmit={(e) => this.handleSubmit(e)}>
                <input type="password"value={this.state.email} placeholder="New Password" onChange={(event) => this.setState({password: event.target.value})}/>
                <input type="password"value={this.state.email} placeholder="Confirmation" onChange={(event) => this.setState({confirm_password: event.target.value})}/>
            <button type="submit">Modifier</button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({resetPasswordUser}, dispatch)
    };
};

export default withRouter(connect(null, mapDispatchToProps)(Form));