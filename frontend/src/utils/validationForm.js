const validationRegister = (user) => {
    const errors = []
    let regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
    let pass = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    if (!user.username){
        errors.push({msg: "Username invalide"})
    }
    else if (user.username.length > 12 || user.username.length <= 2){
        errors.push({msg: "Default length username"})
    }
    if (!(regex).test(user.email))  
    {
        errors.push({msg: "Email is wrong"})
    } 
    if (!user.first_name){
        errors.push({msg: "First name empty"})
    }
    else if (user.first_name.length > 20){
        errors.push({msg: "Default length first name"})
    }
    if (!user.name){
        errors.push({msg: "Name empty"})
    }
    else if (user.name.length > 20){
        errors.push({msg: "Default length name"})
    }
    if (!(pass).test(user.password)){
        errors.push({msg: "Password invalide (8 caracters, 1 number, 1 lowercase letter, 1 uppercase letter)"})
    }
    if (user.password !== user.confirm_password){
        errors.push({msg: "Vos passwords ne sont pas identique"})
    }
    return errors
}

export default validationRegister;