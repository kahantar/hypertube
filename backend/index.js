const express = require('express');
const bodyParser = require('body-parser');
const apiRouteur = require('./routeur/apiRouter').router;
const session    = require('express-session');
const authRouteur = require('./routeur/authRouteur').router;
const searchRouteur = require('./routeur/searchRouter').router;
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const cors = require('cors');
const cron = require('node-cron');
const fs = require('fs');
const del = require('del');

let server = express();

//path needed by cron to delete unseen movie since 1month
const videoPath = '/Users/gdufay/goinfre/torrent-stream/';
const monthMs = 2.628e+9;

server.use(cors());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(passport.initialize());

server.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}));

server.use('/api/', apiRouteur);
server.use('/auth/', authRouteur);
server.use('/search/', searchRouteur);

cron.schedule("59 23 * * *", () => {
	fs.readdir(videoPath, (err, files) => {
		if (err) return ;
		console.log("---------------------");
		console.log("Running Cron Job");
		for (let file of files) {
			fs.stat(videoPath + file, (error, stats) => {
				if (err) return ;
				if (Date.now() - stats.atimeMs >= monthMs)
					del(videoPath + file, { force: true })
						.then(() => { console.log(`deleted file: ${file}`) })
						.catch((err) => console.log(err));
			});
		}
	})
});

server.listen(8080, () => {
	console.log("connexion-ok");
});
