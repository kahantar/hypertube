const express = require('express');
const bodyParser = require('body-parser');
const apiRouteur = require('./apiRouter').router;
const passport   = require('passport')
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

server.listen(8080, () => {
    console.log("ok");
});