import React from 'react';
import { connect } from 'react-redux';
import { updateUser, loadInfoUser, resetWarningUpdate } from '../../actions/user';
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

	async componentDidMount() {
		let query = {}
		query.token = localStorage.getItem("token")
		await this.props.loadInfoUser(query)

		this.setState({
			email: this.props.infoProfil.email || '',
			name: this.props.infoProfil.name || '',
			first_name: this.props.infoProfil.first_name || '',
			username: this.props.infoProfil.username || '',
			oldPwd: '',
			newPwd1: '',
			newPwd2: '',
			img: this.props.infoProfil.img || ''
		})
	}

	componentWillUnmount() {
		this.props.resetWarningUpdate()
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
		this.setState({
			oldPwd: '',
			newPwd1: '',
			newPwd2: ''
		})
		this.props.updateUser(this.state, this.props.history)
	}
	render() {
		let picture = (this.state.img !== 'https://res.cloudinary.com/dzhnhtkyv/image/upload/v1539275273/Netflix42/no-photos_1.png') ? <Dropzone ref={(ref) => { this.uploadInput = ref; }} type="file" onDrop={(files) => this.uploadPicture(files)} className='userPictureFrame'><div id='circleUserPicture'></div><div className='picture' id='userPicture' style={{backgroundImage: `url(${this.state.img})`}}/></Dropzone> :<Dropzone ref={(ref) => { this.uploadInput = ref; }} type="file" onDrop={(files) => this.uploadPicture(files)} className='picture' id='circleEmptyPicture'><div id='cameraEmptyPicture'/></Dropzone>
			return (
				<form id='UpdateProfil_form' onSubmit={(e) => this.handleSubmit(e)}>
					{picture}
					<div className='frameInput'>
						<div className='description'>Mail</div>
						<input type="text" placeholder="|" value={this.state.email} onChange={(e) => this.setState({email: e.target.value.trim()})}/>
						<div className='line'/>
						<div className='checkInput'>{this.props.warningUpdate.signMail}</div>
						<div className='validInput'>{this.props.language[this.props.warningUpdate.mail]}</div>
					</div>

					<div className='frameInput'>
						<div className='description'>{this.props.language.username}</div>                
						<input type="text" placeholder="|" value={this.state.username} onChange={(e) => this.setState({username: e.target.value.trim()})}/>
						<div className='line'/>       
						<div className='checkInput'>{this.props.warningUpdate.signUsername}</div>
						<div className='validInput'>{this.props.language[this.props.warningUpdate.username]}</div>
					</div>

					<div className='frameInput'>
						<div className='description'>{this.props.language.firstName}</div>                
						<input type="text" placeholder="|" value={this.state.first_name} onChange={(e) => this.setState({first_name: e.target.value.trim()})}/>
						<div className='line'/>                
						<div className='checkInput'>{this.props.warningUpdate.signFirstName}</div>
						<div className='validInput'>{this.props.language[this.props.warningUpdate.firstName]}</div>
					</div>

					<div className='frameInput'>
						<div className='description'>{this.props.language.secondName}</div> 
						<input type="text" placeholder="|" value={this.state.name} onChange={(e) => this.setState({name: e.target.value.trim()})}/>
						<div className='line'/>
						<div className='checkInput'>{this.props.warningUpdate.signSecondName}</div>
						<div className='validInput'>{this.props.language[this.props.warningUpdate.secondName]}</div>
					</div>

					<div className='frameInput'>
						<div className='description'>{this.props.language.oldPwd}</div>                
						<input type="password" placeholder="|" value={this.state.oldPwd} onChange={(e) => this.setState({oldPwd: e.target.value.trim()})}/>
						<div className='line'/>
						<div className='checkInput'>{this.props.warningUpdate.signPwd}</div>
						<div className='validInput'>{this.props.language[this.props.warningUpdate.pwd]}</div>
					</div>

					<div className='frameInput'>
						<div className='description'>{this.props.language.newPwd}</div>                
						<input type="password" placeholder="|" value={this.state.newPwd1} onChange={(e) => this.setState({newPwd1: e.target.value.trim()})}/>
						<div className='line'/>
						<div className='checkInput'>{this.props.warningUpdate.signNewPwd1}</div>
						<div className='validInput'>{this.props.language[this.props.warningUpdate.newPwd1]}</div>
					</div>

					<div className='frameInput'>
						<div className='description'>{this.props.language.newPwd}</div>                
						<input type="password" placeholder="|" value={this.state.newPwd2} onChange={(e) => this.setState({newPwd2: e.target.value.trim()})}/>
						<div className='line'/>
						<div className='checkInput'>{this.props.warningUpdate.signNewPwd2}</div>
						<div className='validInput'>{this.props.language[this.props.warningUpdate.newPwd2]}</div>
					</div>

					<button type="submit">{this.props.language.edit}</button>
				</form>
			)
	}
}


const mapStateToProps = (state) => {
	return {
		infoProfil: state.infoProfil,
		language: state.loadLanguage,
		warningUpdate: state.warningReducers
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		...bindActionCreators({updateUser, loadInfoUser, resetWarningUpdate}, dispatch)
	}   
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form));
