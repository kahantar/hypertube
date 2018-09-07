const express = require('express');
const multer  = require('multer');

const users = require('../routes/Users');
const validator = require('../utils/validators');
const jwtUtils = require('../utils/jwtUtils');
const stream = require ('../routes/stream');

const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, '../frontend/public/upload_img/');
	},
	filename: function(req, file, callback) {
		try{
			const userId = jwtUtils.getUserId(req.headers.authorization);
			if (userId > 0)
				callback(null,userId + '.png');
		}
		catch(err){}
	}
})
const upload = multer({ storage: storage });

exports.router = (() => {
	let apiRouter = express.Router();

	apiRouter.route('/users/register/').post(validator.register, users.register);
	apiRouter.route('/users/login/').post(validator.login, users.login);
	apiRouter.route('/users/confirmationemail/').get(users.confirmationEmail);
	apiRouter.route('/users/resetemailpassword/').post(users.resetEmailPassword);
	apiRouter.route('/users/resetpassword/').put(validator.reset, users.resetPassword);
	apiRouter.route('/users/modificationprofil/').put(upload.any() ,users.modificationProfil);
	apiRouter.route('/users/loadallusers').get(users.loadAllUsers);
	//next one show the library, to define
	//apiRouter.route('/library').get();
	apiRouter.route('/library/watch').get(stream);

	return apiRouter;
})();
