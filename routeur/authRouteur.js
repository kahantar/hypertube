var express = require('express');
var passport = require('passport');
var router = express.Router();
const auth = require('../routes/Auth');

router.get('/', function(req, res, next) {
    res.redirect("/");
});

router.get('/google',
    passport.authenticate('google', { scope : ['profile','email'] }
    ));

router.get('/google/callback', passport.authenticate('google', { scope : ['profile','email'] }), (req, res) => {auth.authGoogle(req, res)});

router.post('/completeuser', (req, res) => {auth.completeUser(req, res)});

module.exports = router;