import React from 'react';
import './style.css';
import { registerUser } from '../../actions/user'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import GoogleButton from 'react-google-button'


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
            <form id="form" Class="card row justify-content-md-around" onSubmit={(e) => this.handleSubmit(e)}>
                <img src="https://fontmeme.com/permalink/180901/3bd2426f867386d0ba5efba6386554cd.png" />                
                <h2 id="titre">S'inscrire</h2>
                <input id="input" Class="input-lg form-control" type="email "value={this.state.email} placeholder="E-mail" onChange={(event) => this.setState({email: event.target.value})}/>
                <input id="input" Class="input-lg form-control" type="text"value={this.state.username} placeholder="Username" onChange={(event) => this.setState({username: event.target.value})}/>
                <input id="input" Class="input-lg form-control" type="text" value={this.state.name} placeholder="Name" onChange={(event) => this.setState({name: event.target.value})}/>
                <input id="input" Class="input-lg form-control" type="text" value={this.state.first_name} placeholder="First_name" onChange={(event) => this.setState({first_name: event.target.value})}/>
                <input id="input" Class="input-lg form-control" type="password" value={this.state.password} placeholder="Password" onChange={(event) => this.setState({password: event.target.value})}/>
                <input id="input" Class="input-lg form-control" type="password" value={this.state.confirm_password} placeholder="Confirmation Password" onChange={(event) => this.setState({confirm_password: event.target.value})}/>                
                <button id="button" Class="btn btn-lg btn-danger" type="submit">S'inscrire</button>
                <GoogleButton />
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