const checkValidMail = (err) => {
    console.log(err)
    return 1
}

const checkValidPwd = (err) => {
    console.log(err)
    return 2
}

export default {
    mail: checkValidMail,
    pwd: checkValidPwd
}