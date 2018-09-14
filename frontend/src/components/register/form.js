import React from 'react';
import './style.css';
import { registerUser, resetWarning } from '../../actions/user'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import { Link } from 'react-router-dom';
import { Button, FormControl} from 'react-bootstrap';

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
            <form id="form" className="card row justify-content-md-around" onSubmit={(e) => this.handleSubmit(e)}>
                <img src="https://fontmeme.com/permalink/180901/3bd2426f867386d0ba5efba6386554cd.png" alt="hypertube"/>                
                <h2 id="titre">S'inscrire</h2>
                <FormControl id="email" type="email "value={this.state.email} placeholder="E-mail" onChange={(event) => this.setState({email: event.target.value})}/>
                <FormControl id="username" type="text" value={this.state.username} placeholder="Username" onChange={(event) => this.setState({username: event.target.value})}/>
                <FormControl id="name" type="text" value={this.state.name} placeholder="Name" onChange={(event) => this.setState({name: event.target.value})}/>
                <FormControl id="first" type="text" value={this.state.first_name} placeholder="First_name" onChange={(event) => this.setState({first_name: event.target.value})}/>
                <FormControl id="password" type="password" value={this.state.password} placeholder="Password" onChange={(event) => this.setState({password: event.target.value})}/>
                <FormControl id="confirm" type="password" value={this.state.confirm_password} placeholder="Confirmation Password" onChange={(event) => this.setState({confirm_password: event.target.value})}/>                
                <Button bsStyle="danger"  bsSize="large" id="button" type="submit" data-toggle="modal" data-target="modal">S'inscrire</Button>
                <Link id="identifier" onClick={(e) => this.props.resetWarning()} to='/login'>S'identifier</Link>
            </form>            
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({registerUser, resetWarning}, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(Form);
