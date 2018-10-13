const express = require('express');
const multer  = require('multer');

const users = require('../routes/Users');
const validator = require('../utils/validators');
const jwtUtils = require('../utils/jwtUtils');
const video = require('../routes/video');

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
	apiRouter.route('/users/modificationprofil/').post(users.modificationProfil);
	apiRouter.route('/users/loadinfouser').get(users.loadInfoUser);
	apiRouter.route('/users/loadallusers').get(users.loadAllUsers);
	apiRouter.route('/video/watch/').get(video.stream);
	apiRouter.route('/video/subtitle/').get(video.subtitle);
	apiRouter.route('/video/showSubtitle/').get(video.showSubtitle);
	apiRouter.route('/video/postComment/').post(video.postComment);
	apiRouter.route('/video/getComment/').get(video.getComment);
	apiRouter.route('/users/loadmail/').get(users.loadMail);

	return apiRouter;
})();
