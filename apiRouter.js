const express = require('express');
const users = require('./routes/Users');

exports.router = (() => {
    let apiRouter = express.Router();

    apiRouter.route('/users/register/').post(users.register);
    apiRouter.route('/users/login/').post(users.login);
    apiRouter.route('/users/myprofil/').get(users.getUserProfil);
    apiRouter.route('/users/confirmationemail/').get(users.confirmationEmail);
    apiRouter.route('/users/resetemailpassword/').post(users.resetEmailPassword);
    apiRouter.route('/users/resetpassword/').post(users.resetPassword);
    apiRouter.route('/users/modificationprofil/').post(users.modificationProfil);

    return apiRouter;
})();