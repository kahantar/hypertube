export const validationRegister = (user) => {
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
    if (user.password !== user.confirm_password) {
        errors.push({msg: "Error confirmation password"})
    }
    return errors
}

export const validationLogin = (user) => {
    const errors = []
    let regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    let pass = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
    if (!(regex).test(user.email) || !(pass).test(user.password))  
        errors.push({msg: "Incorrect combination"});
    return errors;
}

export const validationUpdate = (user) => {
    const errors = []
    let regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/
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
    return errors
}

export const validationComplete = (user) => {
    let pass = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    const errors = []
    if (!user.username){
        errors.push({msg: "Username invalide"})
    }
    else if (user.username.length > 12 || user.username.length <= 2){
        errors.push({msg: "Default length username"})
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
        errors.push({msg: "Error confirmation password"})
    }
    return errors
}

export const validationResetPassword = (user) => {
    console.log(user)
    const errors = []
    let pass = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
    if (!(pass).test(user.password)){
        errors.push({msg: "Invalid password (8 caracters, 1 number, 1 lowercase letter, 1 uppercase letter)"})
    }
    else if (user.password !== user.confirm_password){
        errors.push({msg: "Error confirmation password"})
    }
    return errors
}

export const validationComment = (comment = null, imdb = null) => {
	const errors = [];

	if (!comment || !comment.length)
		errors.push({msg: "Comment too short"});
	else if (comment.length >= 600)
		errors.push({msg: "Comment too long"});
	if (!imdb || !imdb.length)
		errors.push({msg: "Bad imdb"});
	return (errors);
}
