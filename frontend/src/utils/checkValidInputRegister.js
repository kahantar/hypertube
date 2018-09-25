let ok = '\u2713'
let wrong = '\u2717'
let green = '#18e23a'
let red = '#e81728'

const checkValidMail = (inputValue, listMailsObj) => {
    let validMailChecked = {
        sign: wrong,
        color: red
    }
    let listMails = listMailsObj.map(e => e.email)
    let regExMail = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

    if (!inputValue) {
        validMailChecked.sign = null
        return validMailChecked
    }
    else if (!regExMail.test(inputValue)) {
        validMailChecked.value = 'Invalid mail'
        return validMailChecked
    }
    else if (listMails.find(elem => { return elem === inputValue})) {
        validMailChecked.value = 'Mail already used'
        return validMailChecked
    }
    else {
        validMailChecked.sign = ok
        validMailChecked.color = green
        return validMailChecked
    }
}

const checkValidUsername = (inputValue) => {
    let validUsernameChecked = {
        sign: wrong,
        color: red
    }     

    if (!inputValue) {
        validUsernameChecked.sign = null
        return validUsernameChecked
    }
    else if (inputValue.length < 3) {
        validUsernameChecked.value = 'Username too short'
        return validUsernameChecked
    }
    else if (inputValue.length > 12) {
        validUsernameChecked.value = 'Username too long'
        return validUsernameChecked
    }
    else {
        validUsernameChecked.sign = ok
        validUsernameChecked.color = green
        return validUsernameChecked
    }
}

const checkValidFirstName = (inputValue) => {
    let validFirstNameChecked = {
        sign: wrong,
        color: red
    }

    if (!inputValue) {
        validFirstNameChecked.sign = null
        return validFirstNameChecked
    }
    else if (inputValue.length > 12) {
        validFirstNameChecked.value = 'First Name too long'
        return validFirstNameChecked
    }
    else {
        validFirstNameChecked.sign = ok
        validFirstNameChecked.color = green
        return validFirstNameChecked
    }
}

const checkValidSecondName = (inputValue) => {
    let validSecondNameChecked = {
        sign: wrong,
        color: red
    }

    if (!inputValue) {
        validSecondNameChecked.sign = null
        return validSecondNameChecked
    }
    else if (inputValue.length > 12) {
        validSecondNameChecked.value = 'Second Name too long'
        return validSecondNameChecked
    }
    else {
        validSecondNameChecked.sign = ok
        validSecondNameChecked.color = green
        return validSecondNameChecked
    }
}

const checkValidPwd = (inputValue) => {
    let validPwdChecked = {
        sign: wrong,
        color: red
    }
    let regExPwd = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)

    if (!inputValue) {
        validPwdChecked.sign = null
        return validPwdChecked
    }
    else if (!regExPwd.test(inputValue)) {
        validPwdChecked.value = '8 characters, 1 number, 1 lowercase, 1 uppercase'
        return validPwdChecked
    }
    else {
        validPwdChecked.sign = ok
        validPwdChecked.color = green
        return validPwdChecked
    }
}

const checkValidConfirmPwd = (inputValue, pwdValue) => {
    let validConfirmPwdChecked = {
        sign: wrong,
        color: red
    }

    if (!inputValue) {
        validConfirmPwdChecked.sign = null
        return validConfirmPwdChecked
    }
    else if (inputValue !== pwdValue) {
        return validConfirmPwdChecked
    }
    else {
        validConfirmPwdChecked.sign = ok
        validConfirmPwdChecked.color = green
        return validConfirmPwdChecked
    }
}

export default {
    mail: checkValidMail,
    username: checkValidUsername,
    firstName: checkValidFirstName,
    secondName: checkValidSecondName,
    pwd: checkValidPwd,
    confirmPwd: checkValidConfirmPwd
}