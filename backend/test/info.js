module.exports = {
    urlRegister: "http://localhost:8080/api/users/register/",
    urlLogin: "http://localhost:8080/api/users/login/",
    urlResetEmailPassword: "http://localhost:8080/api/users/resetemailpassword/",
    urlResetPassword: "http://localhost:8080/api/users/resetpassword/",    
    urlLoadUsers: "http://localhost:8080/api/users/loadallusers/",
    urlCompleteUser: "http://localhost:8080/auth/completeuser/",    
    registerNotConfirm: {
            email: 'abcd@abcd.com',
			username: 'testa',
			name: 'test',
			password: 'Abcd1234',
			img: "/upload_img/avatar.png",
			first_name: 'test',
			confirmation: false
    },
    registerConfirm : {
            email: 'abcde@abcd.com',
			username: 'testb',
			name: 'test',
			password: 'Abcd1234',
			img: "/upload_img/avatar.png",
			first_name: 'test',
			confirmation: true,
    },
    registerFalse : {   
        email: 'abcde',
        username: 'b',
        name: 't',
        password: 'abcd1234',
        img: "/upload_img/avatar.png",
        first_name: 't',
        confirmation: false
    },
    loginNotConfirm : {   
        email: 'abcd@abcd.com',
        password: 'Abcd1234',
    },
    loginConfirm : {
        email: 'abcde@abcd.com',
        password: 'Abcd1234'
    },
    loginInvalidPassword : {
        email: 'abcde@abcd.com',
        password: 'Bbcd1234'
    },
    loginInvalidUser : {
        email: 'abcdef@abcd.com',
        password: 'Bbcd1234'
    },
    loginFalse : {
        email: 'abcdef',
        password: 'abcd1234'
    },
    resetEmailTrue: {
        email: 'abcde@abcd.com'
    },
    resetEmailFalse: {
        email: 'gag@abcd.com'
    },
    newPassword: {
        password: 'Abcd1234'
    },
    errorNewPassword: {
        password: 'abcd1234'
    },
    newProfil: JSON.stringify({
        email: 'abcde@abcd.com',
        username: 'testb',
        name: 'test',
        first_name: 'test'
    }),
    completeUserTrue: {
        email: 'abcd@abcd.com',
        username: 'testa',
        name: 'test',
        password: 'Abcd1234',
        img: "/upload_img/avatar.png",
        first_name: 'test',
        confirmation: true
    },
    completeUserFalse : {   
        email: 'abcde',
        username: 'b',
        name: 't',
        password: 'abcd1234',
        img: "/upload_img/avatar.png",
        first_name: 't',
        confirmation: true
    }
}