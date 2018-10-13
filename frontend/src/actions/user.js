import axios from 'axios';
import {validationLogin, validationUpdate} from '../utils/validationForm';
import allLanguage from '../utils/language'

export const registerUser = (user, history) => {
	return (dispatch) => {    
		const data = JSON.stringify({
			email: user.mail,
			username: user.username,
			first_name: user.firstName,
			name: user.secondName,                    
			password: user.pwd,
			confirmation: false
		})
		axios({ method: 'post',
			url: "http://localhost:8080/api/users/register",
			data,
			headers: {'Content-Type': 'application/json'} 
		}).then((response) => {
			if (response.data.request === 'ok') {
				dispatch({type: "MAIL_SEND", payload: {msg: 'mailSend', mail: user.mail}})
				history.push('/')
			}
			else
				console.log('Error in server request Register')
		}).catch((err) => {
			console.log(err)
		})
	}
}

export const loginUser = (user, history) => {
	return (dispatch) => {
		const errors = validationLogin(user);

		if (errors.testFront === 'ok') {
			const data = JSON.stringify({
				email: user.email,
				password: user.password
			});
			axios({ method: 'post',
				url: "http://localhost:8080/api/users/login",
				data,
				headers: {'Content-Type': 'application/json'} 
			}).then((response) => {
				if (response.data.err)
					console.log(response.data.message)
				else if (response.status === 200 && response.data.userId) {
					const token = response.data.token;
					let payloadtoken = JSON.parse(atob(token.split('.')[1]));
					dispatch({type: "INFO_PROFIL", payload: payloadtoken})
					localStorage.setItem('token', token);
					history.push('/search');
				}
				else {
					dispatch({type: "ERR_LOGIN", payload: response.data})                        
				}
			}).catch((err) => {
				console.log(err)
			})
		}else{
			dispatch({type: "ERR_LOGIN", payload: errors});
		}

	}
}

export const resetErrLogin = () => {
	return (dispatch) => {
		dispatch({type: "RESET_ERR_LOGIN", payload: {}})
	}
}

export const updateUser = (user, history) => {
	return (dispatch) => {
		const errors = validationUpdate(user);
		if (errors.fail === 'wrong') {
			const token = localStorage.getItem('token');
			const data = JSON.stringify({
				email: user.email,
				username: user.username,
				first_name: user.first_name,
				name: user.name,
				img: user.img,
				oldPwd: user.oldPwd,
				newPwd: user.newPwd1,
				password: user.password
			});
			axios({
				method: 'post',
				url: `http://localhost:8080/api/users/modificationprofil`,
				data,
				headers: { 'content-type': 'application/json', 'Authorization': token}
			})
			.then(({data}) => {
				if (data.pwd === 'wrongPwd') {
					dispatch({type: "WARNING_UPDATE", payload: data});
				}
				else {
					const token = data.token;
					let payloadtoken = JSON.parse(atob(token.split('.')[1]));
					dispatch({type: "INFO_PROFIL", payload: payloadtoken})
					localStorage.setItem('token', token);
					history.push('/search');
				}
			}).catch((err) => {
				console.log(err)
			})
		}
		else {
			dispatch({type: "WARNING_UPDATE", payload: errors});
		}
	}
}

export const loadInfoUser = (query) => {
	return (dispatch) => {
		if (query.token !== undefined){
			const token = query.token;
			localStorage.setItem('token', token);
			let payloadtoken = JSON.parse(atob(token.split('.')[1]));
			if (!payloadtoken.email) {
				axios.get(`http://localhost:8080/api/users/loadinfouser`, {
					headers: { 'content-type': 'application/json', 'Authorization': token }
				}).then(({data}) =>{
					dispatch({type: "INFO_PROFIL", payload: data})
				}).catch((err) => console.log(err))
			}
			else
				dispatch({type: "INFO_PROFIL", payload: payloadtoken})
		}
	}
}

export const completeUser = (user, history) => {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		const data = JSON.stringify({
			email: user.mail,
			username: user.username,
			name: user.secondName,
			first_name: user.firstName,
			password: user.pwd,
			img: user.img
		});
		axios.put(`http://localhost:8080/auth/completeuser`, data, {
			headers: { 'content-type': 'application/json', 'Authorization': token  }
		}).then((response) =>{
			const token = response.data.token;
			let payloadtoken = JSON.parse(atob(token.split('.')[1]));
			dispatch({type: "INFO_PROFIL", payload: payloadtoken})
			localStorage.setItem('token', token);
			history.push('/home');
		}).catch((err) => {
			if (err.response.status === 422)
				dispatch({type: "WARNING_UPDATE", payload: err.response.data.errors})
			else
				dispatch({type: "WARNING_UPDATE", payload: err.response.data})
		})
	}
}

export const forgetPasswordUser = (user, history) => {
	return (dispatch) => {
		const data = JSON.stringify({
			email: user.email
		});
		axios.post(`http://localhost:8080/api/users/resetemailpassword`, data, {
			headers: { 'content-type': 'application/json' }
		}).then((response) =>{
			dispatch({type: "MAIL_PWD_SEND", payload: {msg: 'mailPwdSend', mail: user.email}})
			history.push('/')
		}).catch((err) => {
			console.log('Problem Server :' + err)
		})
	}
}

export const resetPasswordUser = (user, history) => {
	return (dispatch) => {
		console.log(user.token)
		const data = JSON.stringify({
			password: user.pwd,
			token: user.token
		});
		axios.put(`http://localhost:8080/api/users/resetpassword`, data, {
			headers: { 'content-type': 'application/json', 'Authorization': user.token }
		}).then((response) =>{
			dispatch({type: "MAIL_PWD_SEND", payload: {msg: 'pwdEdit', mail: ''}})
			history.push('/');
		}).catch((err) => {
			console.log(err)
		})
	}
}

export const loadUsers = () => {
	return (dispatch) => {
		const token = localStorage.getItem('token');
		axios.get(`http://localhost:8080/api/users/loadallusers`, {
			headers: { 'content-type': 'application/json', 'Authorization': token }
		}).then((response) =>{
			dispatch({type: "ALL_USERS", payload: response.data})
		}).catch((err) => console.log(err))
	}
}

export const loadMail = () => {
	return (dispatch) => {
		axios.get(`http://localhost:8080/api/users/loadmail`, {
			headers: { 'content-type': 'application/json'}
		}).then((response) =>{
			dispatch({type: "LOAD_MAIL", payload: response.data})
		}).catch((err) => console.log(err))
	}
}

export const loadLanguage = (actualLanguage, filterMovies) => {
	return (dispatch) => {
		if (filterMovies.orderBy.label) {
			filterMovies.orderBy.label = (filterMovies.orderBy.label === 'ORDER BY') ? 'TRIER PAR' : 'ORDER BY'
			filterMovies.rating.label = (filterMovies.rating.label === 'RATING') ? 'NOTES' : 'RATING'
            dispatch({type: "FILTER_MOVIES", payload: filterMovies})
		}

		if (actualLanguage === 'English')
			dispatch({type: "LOAD_LANGUAGE", payload: allLanguage.english})
		else if (actualLanguage === 'Français')
			dispatch({type: "LOAD_LANGUAGE", payload: allLanguage.french})
	}
}

export const resetMailSent = () => {
	return (dispatch) => {
		dispatch({type: "RESET_MAIL_SEND", payload: {}});
	}
}

export const resetInfoProfil = () => {
	return (dispatch) => {
		dispatch({type: "RESET_INFO_PROFIL", payload: {}});
	}
}

export const resetWarningUpdate = () => {
	return (dispatch) => {
		dispatch({type: "RESET_WARNING_UPDATE", payload: {}})
	}
}

export const resetReducerPersist = () => {
	return (dispatch) => {
		dispatch({type: "ALL_USERS", payload: []});
		dispatch({type: "INFO_PROFIL", payload: []});
	}
}
