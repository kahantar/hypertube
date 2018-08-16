import React from 'react';
import './style.css';
import { forgetPasswordUser } from '../../actions/user'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

class Form extends React.Component{
    state = {
        email: ""
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.forgetPasswordUser(this.state);
    }
    render(){
        return (
            <form id="conteneur" onSubmit={(e) => this.handleSubmit(e)}>
                <input type="email "value={this.state.email} placeholder="Email" onChange={(event) => this.setState({email: event.target.value})}/>
            <button type="submit">S'inscrire</button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({forgetPasswordUser}, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(Form);