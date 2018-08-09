import axios from 'axios';
import validationRegister from '../utils/validationForm';

export const registerUser = (user) => {
    return (dispatch) => {
        const errors = validationRegister(user);
        if (errors.length === 0)
            console.log("coucou")
        else
            dispatch({type: "ERROR_VALIDATION", payload: errors})
    //     dispatch({})
    //     const data = JSON.stringify({
    //             email: user.email,
    //             username: user.username,
    //             name: user.name,
    //             first_name: user.first_name,
    //             password: user.password,
    //             img: "../upload_img/avatar.jpg"
    //         })
    //         try{
    //             const response = await axios({  method: 'post',
    //                                             url: "http://localhost:8080/api/users/register",
    //                                             data,
    //                                             headers: {'Content-Type': 'application/json'} 
    //                                         })
    //             console.log(response)
    //         }catch(err){
    //             console.log(err.response)
    //         }
    }
    
}