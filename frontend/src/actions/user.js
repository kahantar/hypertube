import axios from 'axios';
import {validationRegister, validationLogin, validationUpdate, validationComplete, validationResetPassword} from '../utils/validationForm';

export const registerUser = (user) => {
    return (dispatch) => {
        const errors = validationRegister(user);
        if (errors.length === 0){
            const data = JSON.stringify({
                    email: user.email,
                    username: user.username,
                    name: user.name,
                    first_name: user.first_name,
                    password: user.password,
                    img: "/upload_img/avatar.png"
                })
                    axios({ method: 'post',
                            url: "http://localhost:8080/api/users/register",
                            data,
                            headers: {'Content-Type': 'application/json'} 
                    }).then((response) => {
                        dispatch({type: "WARNING_REGISTER", payload: response.data})
                    }).catch((err) => {
                        if (err.response.status === 422)
                            dispatch({type: "WARNING_REGISTER", payload: err.response.data.errors})
                        if (err.response.status === 409)
                            dispatch({type: "WARNING_REGISTER", payload: err.response.data})
                    })
        }
        else
            dispatch({type: "WARNING_REGISTER", payload: errors})
    }
    
}

export const loginUser = (user, history) => {
    return (dispatch) => {
        const errors = validationLogin(user);
        if (errors.length === 0) {
            const data = JSON.stringify({
                email: user.email,
                password: user.password
            });
            axios({ method: 'post',
                            url: "http://localhost:8080/api/users/login",
                            data,
                            headers: {'Content-Type': 'application/json'} 
                    }).then((response) => {
                        const token = response.data.token;
                        let payloadtoken = JSON.parse(atob(token.split('.')[1]));
                        dispatch({type: "INFO_PROFIL", payload: payloadtoken})
                        localStorage.setItem('token', token);
                        history.push('/home');
                    }).catch((err) => {
                        if (err.response.status === 422)
                            dispatch({type: "WARNING_LOGIN", payload: err.response.data.errors})
                        else
                            dispatch({type: "WARNING_LOGIN", payload: err.response.data})
                    })
        }else{
            dispatch({type: "WARNING_LOGIN", payload: errors});
        }

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
        const token = query.token;
        let payloadtoken = JSON.parse(atob(token.split('.')[1]));
        dispatch({type: "INFO_PROFIL", payload: payloadtoken})
        localStorage.setItem('token', token);
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
                localStorage.setItem('token', token);
                history.push('/home');
            }).catch((err) => {
                if (err.response.status === 422)
                    dispatch({type: "WARNING_COMPLETE", payload: err.response.data.errors})
                else
                    dispatch({type: "WARNING_COMPLETE", payload: err.response.data})
            })
        }else{
            dispatch({type: "WARNING_COMPLETE", payload: errors});
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
                dispatch({type: "WARNING_FORGET", payload: response.data})
            }).catch((err) => {
                dispatch({type: "WARNING_FORGET", payload: err.response.data})
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
                    dispatch({type: "WARNING_LOGIN", payload: response.data})
                    history.push('/login');
                }).catch((err) => {
                    if (err.response.status === 422)
                        dispatch({type: "WARNING_RESET", payload: err.response.data.errors})
                    else
                        dispatch({type: "WARNING_RESET", payload: err.response.data})
                })
        }else{
            dispatch({type: "WARNING_RESET", payload: errors});
        }
    }
}