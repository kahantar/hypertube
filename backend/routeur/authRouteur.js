const express = require('express');
const passport = require('passport');
const router = express.Router();
const auth = require('../routes/Auth');
const validator = require('../utils/validators');



exports.router = (() => {
    let authRouter = express.Router();

    authRouter.route('/google').get(passport.authenticate('google', { scope : ['profile','email'] }));
    authRouter.route('/google/callback').get(passport.authenticate('google', { scope : ['profile','email'] }), (req, res) => {auth.authGoogle(req, res)});
    authRouter.route('/completeuser').put(validator.complete, auth.completeUser);
    
    return authRouter;
})();

// router.get('/google',
//     passport.authenticate('google', { scope : ['profile','email'] }
//     ));

// router.get('/google/callback', passport.authenticate('google', { scope : ['profile','email'] }), (req, res) => {auth.authGoogle(req, res)});

// router.put('/completeuser', validator.complete, (req, res) => {auth.completeUser(req, res)});

// module.exports = router;