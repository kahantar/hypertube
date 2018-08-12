import React from 'react';
import { loginUser } from '../../actions/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom"

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
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <input type="email" placeholder="Email" onChange={(e) => this.setState({email: e.target.value}) }/>
                <input type="password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value}) }/>
                <button type="submit">Connexion</button>
            </form>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({loginUser}, dispatch)
    }
    
}

export default withRouter(connect(null, mapDispatchToProps)(Form));