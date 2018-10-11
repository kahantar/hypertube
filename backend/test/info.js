module.exports = {

	/******* User *******/

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
			img: "https://res.cloudinary.com/dzhnhtkyv/image/upload/v1539275273/Netflix42/no-photos_1.png",
			first_name: 'test',
			confirmation: false
    },
    registerConfirm : {
            email: 'abcde@abcd.com',
			username: 'testb',
			name: 'test',
			password: 'Abcd1234',
			img: "https://res.cloudinary.com/dzhnhtkyv/image/upload/v1539275273/Netflix42/no-photos_1.png",
			first_name: 'test',
			confirmation: true,
    },
    registerFalse : {   
        email: 'abcde',
        username: 'b',
        name: 't',
        password: 'abcd1234',
        img: "https://res.cloudinary.com/dzhnhtkyv/image/upload/v1539275273/Netflix42/no-photos_1.png",
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
        img: "https://res.cloudinary.com/dzhnhtkyv/image/upload/v1539275273/Netflix42/no-photos_1.png",
        first_name: 'test',
        confirmation: true
    },
    completeUserFalse : {   
        email: 'abcde',
        username: 'b',
        name: 't',
        password: 'abcd1234',
        img: "https://res.cloudinary.com/dzhnhtkyv/image/upload/v1539275273/Netflix42/no-photos_1.png",
        first_name: 't',
        confirmation: true
    },

	/******* Video *******/

	urlPostComment: 'http://localhost:8080/api/video/postComment/',
	urlGetComment: 'http://localhost:8080/api/video/getComment/',
	completeCommentFalse: {
		imdb: '',
		comment: ''
	},
	completeCommentEmptyImdb: {
		imdb: '',
		comment: 'test'
	},
	completeCommentEmptyComment: {
		imdb: 'EA17E6BE92962A403AC1C638D2537DCF1E564D26',
		comment: ''
	},
	completeCommentTrue: {
		imdb: 'EA17E6BE92962A403AC1C638D2537DCF1E564D26',
		comment: 'test'
	},
	completeCommentBadImdb: {
		imdb: 'test',
		comment: 'test'
	},
	getCommentTrue: {
		imdb: 'EA17E6BE92962A403AC1C638D2537DCF1E564D26',
	},
	getCommentEmpty: {
		imdb: '',
	},
	getCommentFalse: {
		imdb: 'test',
	},
	getCommentUndefined: {
		imdb: undefined,
	},
}
