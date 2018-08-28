const express = require('express');
const bodyParser = require('body-parser');
const apiRouteur = require('./routeur/apiRouter').router;
const session    = require('express-session');
const authRouteur = require('./routeur/authRouteur').router;
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const cors = require('cors');

let server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(passport.initialize());


server.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}));

server.use('/api/', apiRouteur);
server.use('/auth/', authRouteur);


server.listen(8080, () => {
    console.log("connexion-ok");
});