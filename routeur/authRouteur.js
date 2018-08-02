var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.redirect("/");
});

router.get('/google',
    passport.authenticate('google', { scope : ['profile','email'] }
    ));

router.get('/google/callback', passport.authenticate('google', { scope : ['profile','email'] }),
    (req, res) => {
        const profile = req.user._json
        res.redirect(`http://www.hypertube.com/google?profile=${profile}`)
    })
;

module.exports = router;