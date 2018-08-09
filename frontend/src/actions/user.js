import axios from 'axios';

export const registerUser = async(e, user) => {
    e.preventDefault()
    
    const data = JSON.stringify({
            email: user.email,
            username: user.username,
            name: user.name,
            first_name: user.first_name,
            password: user.password,
            img: "../upload_img/avatar.jpg"
        })
        try{

            const response = await axios({  method: 'post',
                                            url: "http://localhost:8080/api/users/register",
                                            data,
                                            headers: {'Content-Type': 'application/json'} 
                                        })
            console.log("response",response)
        }catch(err){
            console.log("ERROR",err.response)
        }
    
}