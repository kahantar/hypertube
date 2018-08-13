const express = require('express');
const users = require('../routes/Users');
const passport = require('passport');
const validator = require('../utils/validators');
var multer  = require('multer')

var upload = multer({ dest: '../frontend/src/upload_img/' })

exports.router = (() => {
    let apiRouter = express.Router();

    apiRouter.route('/users/register/').post(validator.register, users.register);
    apiRouter.route('/users/login/').post(validator.login, users.login);
    apiRouter.route('/users/myprofil/').get(users.getUserProfil);
    apiRouter.route('/users/confirmationemail/').get(users.confirmationEmail);
    apiRouter.route('/users/resetemailpassword/').post(users.resetEmailPassword);
    apiRouter.route('/users/resetpassword/').post(users.resetPassword);
    apiRouter.route('/users/modificationprofil/').put(upload.single('img'),users.modificationProfil);
    return apiRouter;
})();