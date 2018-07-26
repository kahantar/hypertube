const passport = require('passport')
, FacebookStrategy = require('passport-facebook').Strategy;
const express = require('express');
const bodyParser = require('body-parser');
const apiRouteur = require('./apiRouter').router;
const session    = require('express-session')
let server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}));
server.use(passport.initialize());
server.use(passport.session());
// server.get('/', (req, res) => {
// });

server.use('/api/', apiRouteur);

passport.use(new FacebookStrategy({
    clientID: "438305659998969",
    clientSecret: "1096d15b7533b63d6e876e1254782c46",
    callbackURL: "http://localhost:8080/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile)
  }
));
server.get('/auth/facebook', passport.authenticate('facebook'));
server.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));
server.listen(8080, () => {
    console.log("ok");
});