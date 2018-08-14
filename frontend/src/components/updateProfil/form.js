import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/user';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";

class Form extends React.Component {
    state = {
        email: this.props.infoProfil.email,
        name: this.props.infoProfil.name,
        first_name: this.props.infoProfil.first_name,
        username: this.props.infoProfil.username,
        img: this.props.infoProfil.img,
        file: ''
    }
    changeImg = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const img = reader.result;
            this.setState({ img })
        }
        reader.readAsDataURL(file)
        this.setState({ file })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateUser(this.state, this.props.history)
    }
    render() {
        return (
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <input type="email" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                <input type="text" placeholder="Username" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
                <input type="text" placeholder="First name" value={this.state.first_name} onChange={(e) => this.setState({first_name: e.target.value})}/>
                <input type="text" placeholder="Name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
                <img src={this.state.img} width="200" height="200"/>
                <input type="file" onChange={(e) => this.changeImg(e) } />
                <button type="submit">Envoyer</button>
            </form>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({updateUser}, dispatch)
    }
    
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        infoProfil: state.infoProfil
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));