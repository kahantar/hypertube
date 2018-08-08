const express = require('express');
const bodyParser = require('body-parser');
const apiRouteur = require('./routeur/apiRouter').router;
const session    = require('express-session');
const authentification = require('./routeur/authRouteur');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');  
const cors = require('cors');

let server = express();

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(passport.initialize());

server.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}));
// server.get('/', (req, res) => {
// });


server.use('/api/', apiRouteur);
server.use('/auth/', authentification);


server.listen(8080, () => {
    console.log("ok");
});