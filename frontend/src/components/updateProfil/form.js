import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/user';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import './updateProfil.css'
import Dropzone from 'react-dropzone'


class Form extends React.Component {
    state = {
        email: this.props.infoProfil.email,
        name: this.props.infoProfil.name,
        first_name: this.props.infoProfil.first_name,
        username: this.props.infoProfil.username,
        img: this.props.infoProfil.img,
        file: ''
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

    uploadPicture = (file) => {
        if (file[0].type === 'image/jpeg' || file[0].type === 'image/jpg' || file[0].type === 'image/png') {
            var reader = new FileReader();
            reader.onload = (e) => {
                this.setState({ img: e.target.result })
                // axios.post('http://localhost:3001/upload_picture', {
                // "userId": Cookies.get('id'),
                // "picture": e.target.result
                // })
            }
            reader.readAsDataURL(file[0])
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateUser(this.state, this.props.history)
    }
    render() {
        console.log(this.props.infoProfil.img)
        let picture = (this.state.img !== '/upload_img/avatar.png') ? <Dropzone ref={(ref) => { this.uploadInput = ref; }} type="file" onDrop={(files) => this.uploadPicture(files)} className='userPictureFrame'><div id='circleUserPicture'></div><div className='picture' id='userPicture' style={{backgroundImage: `url(${this.state.img})`}}/></Dropzone> : <Dropzone ref={(ref) => { this.uploadInput = ref; }} type="file" onDrop={(files) => this.uploadPicture(files)} className='picture' id='circleEmptyPicture'><div id='cameraEmptyPicture'/></Dropzone>
        return (
            <form id='UpdateProfil_form' onSubmit={(e) => this.handleSubmit(e)}>
                {picture}
                <div className='description'>Email</div>
                <input type="email" placeholder="Email" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                <div className='line'/>
                <div className='description'>Username</div>                
                <input type="text" placeholder="Username" value={this.state.username} onChange={(e) => this.setState({username: e.target.value})}/>
                <div className='line'/>                
                <div className='description'>First name</div>                
                <input type="text" placeholder="First name" value={this.state.first_name} onChange={(e) => this.setState({first_name: e.target.value})}/>
                <div className='line'/>                
                <div className='description'>Second Name</div>                
                <input type="text" placeholder="Name" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
                <div className='line'/>
                <button type="submit">UPDATE</button>
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
    return {
        infoProfil: state.infoProfil
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));