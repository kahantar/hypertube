import axios from 'axios';

export const registerUser = async(e, user) => {
    e.preventDefault()
    try{
        let data = JSON.stringify({
            password: user.password,
            username: user.username
        })
        const response = await axios({  method: 'post',
                                        url: "http://localhost:8080/api/users/register",
                                        data,
                                        headers: {'Content-Type': 'application/json'} 
                                    })
        console.log(response)
    }catch(err){
        console.log(err)

    }
}