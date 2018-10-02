const express = require('express');
const passport = require('passport');
const router = express.Router();
const auth = require('../routes/Auth');
const validator = require('../utils/validators');



exports.router = (() => {
    let authRouter = express.Router();

    authRouter.route('/42').get(passport.authenticate('42'));
    authRouter.route('/42/callback').get(passport.authenticate('42', { failureRedirect: '/login' }), (req, res) => {auth.auth42(req, res)});
    authRouter.route('/google').get(passport.authenticate('google', { scope : ['profile','email'] }));
    authRouter.route('/google/callback').get(passport.authenticate('google', { scope : ['profile','email'] }), (req, res) => {auth.authGoogle(req, res)});
    authRouter.route('/slack').get(passport.authenticate('slack'));
    authRouter.route('/slack/callback').get(passport.authenticate('slack', { failureRedirect: '/login' }), (req, res) => {auth.authSlack(req, res)});    
    authRouter.route('/completeuser').put(validator.complete, auth.completeUser);
    
    return authRouter;
})();
