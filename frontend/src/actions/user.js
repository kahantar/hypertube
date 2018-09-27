import axios from 'axios';
import {validationLogin, validationUpdate, validationComplete, validationResetPassword} from '../utils/validationForm';
import allLanguage from '../utils/language'

export const registerUser = (user, history) => {
    return (dispatch) => {    
            const data = JSON.stringify({
                    email: user.mail,
                    username: user.username,
                    first_name: user.firstName,
                    name: user.secondName,                    
                    password: user.pwd,
                    img: "/upload_img/avatar.png",
                    confirmation: false
                })
                    axios({ method: 'post',
                            url: "http://localhost:8080/api/users/register",
                            data,
                            headers: {'Content-Type': 'application/json'} 
                    }).then((response) => {
                        if (response.data.request === 'ok') {
                            dispatch({type: "MAIL_SEND", payload: {msg: 'mailSend', mail: user.mail}})
                            console.log('YEAH')
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
        console.log(errors)
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
                        else if (response.status === '200') {
                            const token = response.data.token;
                            let payloadtoken = JSON.parse(atob(token.split('.')[1]));
                            dispatch({type: "INFO_PROFIL", payload: payloadtoken})
                            // dispatch({type: "WARNING_UPDATE", payload: []})
                            dispatch({type: "POPULAR_MOVIES", payload: response.data.popularmovies})
                            localStorage.setItem('token', token);
                            history.push('/home');
                        }
                        else
                            dispatch({type: "ERR_LOGIN", payload: response.data})                        
                    }).catch((err) => {
                        console.log(err)
                    })
        }else{
            console.log(errors, 'drere')
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
        if (errors.length === 0) {
            const token = localStorage.getItem('token');
            const formData = new FormData()
            formData.append('img', user.file)
            const data = JSON.stringify({
                email: user.email,
                username: user.username,
                name: user.name,
                first_name: user.first_name,
            });
            axios.put(`http://localhost:8080/api/users/modificationprofil?data=${data}`, formData, {
                headers: { 'content-type': 'multipart/form-data', 'Authorization': token  }
            }).then((response) =>{
                const token = response.data.token;
                let payloadtoken = JSON.parse(atob(token.split('.')[1]));
                dispatch({type: "INFO_PROFIL", payload: payloadtoken})
                dispatch({type: "WARNING_UPDATE", payload: []})
                localStorage.setItem('token', token);
                history.push('/home');
            }).catch((err) => {
                if (err.response.status === 422)
                    dispatch({type: "WARNING_UPDATE", payload: err.response.data.errors})
                else
                    dispatch({type: "WARNING_UPDATE", payload: err.response.data})
            })
        }else{
            dispatch({type: "WARNING_UPDATE", payload: errors});
        }
    }
}

export const loadInfoUser = (query) => {
    return (dispatch) => {
        if (query.token !== undefined){
            const token = query.token;
            axios.get(`http://localhost:8080/search/popularmovies`,{
                headers: { 'Authorization': token  }
            }).then((response) =>{
                let payloadtoken = JSON.parse(atob(token.split('.')[1]));
                localStorage.setItem('token', token);
                dispatch({type: "POPULAR_MOVIES", payload: response.data.popularmovies })
                dispatch({type: "INFO_PROFIL", payload: payloadtoken})
                }).catch((e) => {})
        }
    }
}

export const completeUser = (user, history) => {
    return (dispatch) => {
        const errors = validationComplete(user);
        if (errors.length === 0){
            const token = localStorage.getItem('token');
            const data = JSON.stringify({
                email: user.email,
                username: user.username,
                name: user.name,
                first_name: user.first_name,
                password: user.password,
                img: '/upload_img/avatar.png'
            });
            axios.put(`http://localhost:8080/auth/completeuser`, data, {
                headers: { 'content-type': 'application/json', 'Authorization': token  }
            }).then((response) =>{
                const token = response.data.token;
                let payloadtoken = JSON.parse(atob(token.split('.')[1]));
                dispatch({type: "INFO_PROFIL", payload: payloadtoken})
                dispatch({type: "POPULAR_MOVIES", payload: response.data.popularmovies})
                localStorage.setItem('token', token);
                history.push('/home');
            }).catch((err) => {
                if (err.response.status === 422)
                    dispatch({type: "WARNING_UPDATE", payload: err.response.data.errors})
                else
                    dispatch({type: "WARNING_UPDATE", payload: err.response.data})
            })
        }else{
            dispatch({type: "WARNING_UPDATE", payload: errors});
        }
    }
}

export const forgetPasswordUser = (user) => {
    return (dispatch) => {
        const data = JSON.stringify({
            email: user.email
        });
        axios.post(`http://localhost:8080/api/users/resetemailpassword`, data, {
                headers: { 'content-type': 'application/json' }
            }).then((response) =>{
                dispatch({type: "WARNING_UPDATE", payload: response.data})
            }).catch((err) => {
                dispatch({type: "WARNING_UPDATE", payload: err.response.data})
            })
    }
}

export const resetPasswordUser = (user, history) => {
    return (dispatch) => {
        const errors = validationResetPassword(user);
        if (errors.length === 0){
            const data = JSON.stringify({
                password: user.password
            });
            const token = localStorage.getItem('token');
            axios.put(`http://localhost:8080/api/users/resetpassword`, data, {
                    headers: { 'content-type': 'application/json', 'Authorization': token }
                }).then((response) =>{
                    dispatch({type: "WARNING_UPDATE", payload: response.data})
                    history.push('/login');
                }).catch((err) => {
                    if (err.response.status === 422)
                        dispatch({type: "WARNING_UPDATE", payload: err.response.data.errors})
                    else
                        dispatch({type: "WARNING_UPDATE", payload: err.response.data})
                })
        }else{
            dispatch({type: "WARNING_UPDATE", payload: errors});
        }
    }
}

export const loadUsers = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        axios.get(`http://localhost:8080/api/users/loadallusers`, {
            headers: { 'content-type': 'application/json', 'Authorization': token }
        }).then((response) =>{
            dispatch({type: "ALL_USERS", payload: response.data})
        }).catch((err) => {})
    }
}

export const loadMail = () => {
    return (dispatch) => {
        axios.get(`http://localhost:8080/api/users/loadmail`, {
            headers: { 'content-type': 'application/json'}
        }).then((response) =>{
            dispatch({type: "LOAD_MAIL", payload: response.data})
        }).catch((err) => {})
    }
}

export const loadLanguage = (actualLanguage) => {
    return (dispatch) => {
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

export const resetWarning = () => {
    return (dispatch) => {
        dispatch({type: "WARNING_UPDATE", payload: []});
    }
}

export const resetReducerPersist = () => {
    return (dispatch) => {
        dispatch({type: "ALL_USERS", payload: []});
        dispatch({type: "INFO_PROFIL", payload: []});
    }
}