import React from 'react';
import './style.css';
import { registerUser } from '../../actions/user'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'

class Form extends React.Component{
    state = {
        email: "",
        username: "",
        name: "",
        first_name: "",
        password: "",
        confirm_password: ""
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.registerUser(this.state);
    }
    render(){
        return (
            <form id="conteneur" onSubmit={(e) => this.handleSubmit(e)}>
                <input type="email "value={this.state.email} placeholder="Email" onChange={(event) => this.setState({email: event.target.value})}/>
                <input type="text"value={this.state.username} placeholder="Username" onChange={(event) => this.setState({username: event.target.value})}/>
                <input type="text" value={this.state.name} placeholder="Name" onChange={(event) => this.setState({name: event.target.value})}/>
                <input type="text" value={this.state.first_name} placeholder="First_name" onChange={(event) => this.setState({first_name: event.target.value})}/>
                <input type="password" value={this.state.password} placeholder="Password" onChange={(event) => this.setState({password: event.target.value})}/>
                <input type="password" value={this.state.confirm_password} placeholder="Confirmation Password" onChange={(event) => this.setState({confirm_password: event.target.value})}/>                
                <button type="submit">S'inscrire</button>
            </form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({registerUser}, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(Form);