import bcrypt from 'bcryptjs'

export const validationLogin = (user) => {
    let regExMail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)    
    let regExPwd = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/);
    
    if (!regExMail.test(user.email))  
        return {signMail: '\u2717', mail: 'wrongMail'}
    else if (!regExPwd.test(user.password))
        return {signPwd: '\u2717', pwd: 'wrongPwd'}
    
    return {testFront: 'ok'}
}

export const validationResendPwd = (inputValue, listMails) => {
    let mailsChecked = []

    for (let i = 0; i < listMails.length; i++) {
        mailsChecked.push((bcrypt.compareSync(inputValue, listMails[i])))
    }
    
    if (mailsChecked.find(elem => { return elem === true}))
        return true
    else
        return false
}

export const validationUpdate = (user) => {
    let errors = {}
    let regExMail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

    errors.fail = 'wrong'

    if (!(regExMail).test(user.email))   {
        errors.signMail = '\u2717'
        errors.mail = 'wrongMail'
        errors.fail = 'true'
    }

    if (user.username.length > 12) {
        errors.signUsername = '\u2717'
        errors.username = 'usernameTooLong'
        errors.fail = 'true'
    }
    else if (user.username.length <= 2) {
        errors.signUsername = '\u2717'
        errors.username = 'usernameTooShort'
        errors.fail = 'true'
    }
    
    if (!user.first_name) {
        errors.signFirstName = '\u2717'
        errors.firstName = 'firstNameEmpty'
        errors.fail = 'true'
    }
    else if (user.first_name.length > 20) {
        errors.signFirstName = '\u2717'
        errors.firstName = 'firstNameTooLong'
        errors.fail = 'true'
    }

    if (!user.name) {
        errors.signSecondName = '\u2717'
        errors.secondName = 'secondNameEmpty'
        errors.fail = 'true'
    }
    else if (user.name.length > 20) {
        errors.signSecondName = '\u2717'
        errors.secondName = 'secondNameTooLong'
        errors.fail = 'true'
    }

    if (user.newPwd1) {
        if (!/[a-z]/.test(user.newPwd1)) {
            errors.signNewPwd1 = '\u2717'
            errors.newPwd1 = 'lowercase'
            errors.fail = 'true'
        }
        else if (!/[A-Z]/.test(user.newPwd1)) {
            errors.signNewPwd1 = '\u2717'
            errors.newPwd1 = 'uppercase'
            errors.fail = 'true'
        }
        else if (!/[0-9]/.test(user.newPwd1)) {
            errors.signNewPwd1 = '\u2717'
            errors.newPwd1 = 'number'
            errors.fail = 'true'
        }
        else if (user.newPwd1.length < 8) {
            errors.signNewPwd1 = '\u2717'
            errors.newPwd1 = 'pwdTooShort'
            errors.fail = 'true'
        }
    }

    if (user.newPwd1 !== user.newPwd2) {
        errors.signNewPwd1 = '\u2717'
        errors.newPwd1 = 'notEqual'
        errors.fail = 'true'
    }

    return errors
}

// export const validationComplete = (user) => {
//     let pass = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)
//     const errors = []
//     if (!user.username){
//         errors.push({msg: "Username invalide"})
//     }
//     else if (user.username.length > 12 || user.username.length <= 2){
//         errors.push({msg: "Default length username"})
//     }
//     if (!user.first_name){
//         errors.push({msg: "First name empty"})
//     }
//     else if (user.first_name.length > 20){
//         errors.push({msg: "Default length first name"})
//     }
//     if (!user.name){
//         errors.push({msg: "Name empty"})
//     }
//     else if (user.name.length > 20){
//         errors.push({msg: "Default length name"})
//     }
//     if (!(pass).test(user.password)){
//         errors.push({msg: "Password invalide (8 caracters, 1 number, 1 lowercase letter, 1 uppercase letter)"})
//     }
//     if (user.password !== user.confirm_password){
//         errors.push({msg: "Error confirmation password"})
//     }
//     return errors
// }

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
