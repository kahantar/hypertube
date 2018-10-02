import React from 'react';
import './completeAuth.css';
import { completeUser } from '../../actions/user';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { withRouter } from 'react-router';

class Form extends React.Component{
    state = {
        email: this.props.infoProfil.email,
        username: this.props.infoProfil.username,
        name: this.props.infoProfil.name,
        first_name: this.props.infoProfil.first_name,
        password: "",
        confirm_password: ""
    }
  
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.completeUser(this.state, this.props.history);
    }
    render(){
        console.log(this.props.infoProfil)
        return (
            <form id="conteneur" onSubmit={(e) => this.handleSubmit(e)}>
                <input type="email " defaultValue={this.props.infoProfil.email} placeholder="Email"/>
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

const mapStateToProps = (state) => {
    return {
        infoProfil: state.infoProfil
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({completeUser}, dispatch)
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));