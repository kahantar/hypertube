const passport = require('passport');  
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('../..//config/keysAuth');
const FortyTwoStrategy = require('passport-42').Strategy;
var SlackStrategy = require('passport-slack').Strategy;



passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/plus.login'}); 

passport.serializeUser((profile, done) => {
    done(null, profile)
})

passport.use('google', new GoogleStrategy({
    clientID        : config.google.clientID,
    clientSecret    : config.google.clientSecret,
    callbackURL     : config.google.callbackURL,
    profileFields: ['id', 'emails', 'name']
  },
  function(access_token, refresh_token, profile, done) {
    process.nextTick(function() {
      done(null, profile)
    });
  }
));

passport.use(new FortyTwoStrategy({
  clientID: config.forty_two.clientID,
  clientSecret: config.forty_two.clientSecret,
  callbackURL: config.forty_two.callbackURL
},
function(accessToken, refreshToken, profile, cb) {
  process.nextTick(function() {
    return cb(null, profile)
  });
}
));

passport.use(new SlackStrategy({
  clientID: config.slack.clientID,
  clientSecret: config.slack.clientSecret,
  skipUserProfile: false, // default
  scope: ['identity.basic', 'identity.email', 'identity.avatar', 'identity.team'] // default
},
(accessToken, refreshToken, profile, cb) => {
  process.nextTick(function() {
    return cb(null, profile)
  });
}
));

