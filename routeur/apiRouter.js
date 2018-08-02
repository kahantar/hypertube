const express = require('express');
const users = require('../routes/Users');
const passport = require('passport')

exports.router = (() => {
    let apiRouter = express.Router();

    apiRouter.route('/users/register/').post(users.register);
    apiRouter.route('/users/login/').post(users.login);
    apiRouter.route('/users/myprofil/').get(users.getUserProfil);
    apiRouter.route('/users/confirmationemail/').get(users.confirmationEmail);
    apiRouter.route('/users/resetemailpassword/').post(users.resetEmailPassword);
    apiRouter.route('/users/resetpassword/').post(users.resetPassword);
    apiRouter.route('/users/modificationprofil/').post(users.modificationProfil);
    apiRouter.route('/contact/').get(users.contact);
    apiRouter.route('/s/').get(users.service);
    apiRouter.get('/', function(req, res, next) {
        res.redirect("/");
    });

    apiRouter.get('/google',
        passport.authenticate('google', { scope : ['profile','email'] }
        ));

    apiRouter.get('/google/callback',
        passport.authenticate('google', {
            successRedirect : '/',
            failureRedirect : '/login'
        })
    );

    return apiRouter;
})();