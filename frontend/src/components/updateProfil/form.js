import React from 'react';
import { connect } from 'react-redux';
import { updateUser, loadInfoUser } from '../../actions/user';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import './updateProfil.css'
import Dropzone from 'react-dropzone'


class Form extends React.Component {
    state = {
        email: '',
        name: '',
        first_name: '',
        username: '',
        oldPwd: '',
        newPwd1: '',
        newPwd2: '',
        img: ''
    }
    // changeImg = (e) => {
    //     e.preventDefault();
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         const img = reader.result;
    //         this.setState({ img })
    //     }
    //     reader.readAsDataURL(file)
    //     this.setState({ file })
    // }

    async componentDidMount() {
        let query = {}
        query.token = localStorage.getItem("token")
        await this.props.loadInfoUser(query)

        this.setState({
            email: this.props.infoProfil.email,
            name: this.props.infoProfil.name,
            first_name: this.props.infoProfil.first_name,
            username: this.props.infoProfil.username,
            oldPwd: '',
            newPwd1: '',
            newPwd2: '',
            img: this.props.infoProfil.img
        })
    }

    uploadPicture = (file) => {
        if (file[0].type === 'image/jpeg' || file[0].type === 'image/jpg' || file[0].type === 'image/png') {
            var reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ img: e.target.result })
            }
            reader.readAsDataURL(file[0])
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.img)
        this.props.updateUser(this.state, this.props.history)
    }
    render() {
        console.log(this.state.img)
        let picture = (this.state.img !== '/upload_img/avatar.png') ? <Dropzone ref={(ref) => { this.uploadInput = ref; }} type="file" onDrop={(files) => this.uploadPicture(files)} className='userPictureFrame'><div id='circleUserPicture'></div><div className='picture' id='userPicture' style={{backgroundImage: `url(${this.state.img})`}}/></Dropzone> :<Dropzone ref={(ref) => { this.uploadInput = ref; }} type="file" onDrop={(files) => this.uploadPicture(files)} className='picture' id='circleEmptyPicture'><div id='cameraEmptyPicture'/></Dropzone>
        return (
            <form id='UpdateProfil_form' onSubmit={(e) => this.handleSubmit(e)}>
                {picture}
                <div className='description'>Mail</div>
                <input type="email" placeholder="|" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                <div className='line'/>
                <div className='description'>{this.props.language.username}</div>                
                <input type="text" placeholder="|" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
                <div className='line'/>                
                <div className='description'>{this.props.language.firstName}</div>                
                <input type="text" placeholder="|" value={this.state.first_name} onChange={(e) => this.setState({first_name: e.target.value})}/>
                <div className='line'/>                
                <div className='description'>{this.props.language.secondName}</div>                
                <input type="text" placeholder="|" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
                <div className='line'/>
                <div className='description'>{this.props.language.oldPwd}</div>                
                <input type="password" placeholder="|" value={this.state.oldPwd} onChange={(e) => this.setState({name: e.target.value})}/>
                <div className='line'/>
                <div className='description'>{this.props.language.newPwd}</div>                
                <input type="password" placeholder="|" value={this.state.newPwd1} onChange={(e) => this.setState({name: e.target.value})}/>
                <div className='line'/>
                <div className='description'>{this.props.language.newPwd}</div>                
                <input type="password" placeholder="|" value={this.state.newPwd2} onChange={(e) => this.setState({name: e.target.value})}/>
                <div className='line'/>
                <button type="submit">UPDATE</button>
            </form>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        infoProfil: state.infoProfil,
        language: state.loadLanguage
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators({updateUser, loadInfoUser}, dispatch)
    }   
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));