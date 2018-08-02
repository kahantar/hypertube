const passport = require('passport');  
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const config = require('./keysAuth')

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
