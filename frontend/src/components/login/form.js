import React from 'react';
import { loginUser, resetWarning } from '../../actions/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import { Button, FormControl} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SignIn from './signIn';
import './login.css';

const link_fortytwo = "http://localhost:8080/auth/42";
const link_google = "http://localhost:8080/auth/google";

class Form extends React.Component{
    state = {
        email: '',
        password: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.loginUser(this.state, this.props.history);
    }
    render(){
        return(
            <form id="form" className="card row justify-content-md-around" onSubmit={(e) => this.handleSubmit(e)}>
                <img src="https://fontmeme.com/permalink/180901/3bd2426f867386d0ba5efba6386554cd.png" alt="hypertube"/>                
                <h2 id="titre">S'identifier</h2>
                <Link id="forget" onClick={(e) => this.props.resetWarning()} to='/forgetpassword'>Mot de passe oublié?</Link>                
                <FormControl id="email" type="email" placeholder="Email" onChange={(e) => this.setState({email: e.target.value}) }/>
                <FormControl id="password" type="password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value}) }/>
                <Button bsStyle="danger"  bsSize="large" id="button" type="submit">Connexion</Button>
                <SignIn img="42.png" text="S'identifier avec 42" link={link_fortytwo}/>                
                <SignIn img="google.jpeg" text="S'identifier avec Google" link={link_google}/>
                <Link id="inscrire" onClick={(e) => this.props.resetWarning()} to='/'>Inscrivez-vous</Link>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({resetWarning, loginUser}, dispatch)
    }
    
}

export default withRouter(connect(null, mapDispatchToProps)(Form));
