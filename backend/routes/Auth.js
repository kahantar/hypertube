const models = require('../models');
const Sequelize = require('sequelize');
const jwtUtils = require('../utils/jwtUtils')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator/check');


module.exports = {
	authGoogle: async (req, res) => {
		try{
			const email = req.user._json.email;
			const username = req.user._json.family_name;
			const name = req.user._json.family_name;
			const first_name = req.user._json.given_name;

			const userFound = await models.User.findOne({
				where: { email: email }
			});
			if (userFound && userFound.confirmation == true){
				const token = jwtUtils.generateTokenForUser(userFound)
				res.redirect(`http://localhost:3000/search?token=${token}`)
			}else{
				if (userFound == null)
					userFound = await models.User.create({ email, username, name, first_name, password: "1234", img: "/upload_img/avatar.png", confirmation: false });
				const token = jwtUtils.generateTokenForUser(userFound)            
				res.redirect(`http://localhost:3000/completeauth?token=${token}`)
			}
		}catch(err){}
	},
	auth42: async (req, res) => {
		try{
			const email = req.user._json.email;
			const username = req.user._json.login;
			const name = req.user._json.last_name;
			const first_name = req.user._json.first_name;

			const userFound = await models.User.findOne({
				where: { email: email }
			});
			if (userFound && userFound.confirmation == true){
				const token = jwtUtils.generateTokenForUser(userFound)
				res.redirect(`http://localhost:3000/search?token=${token}`)
			}else{
				if (userFound == null)
					userFound = await models.User.create({ email, username, name, first_name, password: "1234", img: "/upload_img/avatar.png", confirmation: false });
				const token = jwtUtils.generateTokenForUser(userFound)            
				res.redirect(`http://localhost:3000/completeauth?token=${token}`)
			}
		}catch(err){}
	},
	authSlack: async (req, res) => {
		try{
			const email = req.user.user.email;
			const username = req.user.user.name;
			const name = req.user.user.name;
			const first_name = req.user.user.name;

			const userFound = await models.User.findOne({
				where: { email: email }
			});
			if (userFound && userFound.confirmation == true){
				const token = jwtUtils.generateTokenForUser(userFound)
				res.redirect(`http://localhost:3000/search?token=${token}`)
			}else{
				if (userFound == null)
					userFound = await models.User.create({ email, username, name, first_name, password: "1234", img: "/upload_img/avatar.png", confirmation: false });
				const token = jwtUtils.generateTokenForUser(userFound)            
				res.redirect(`http://localhost:3000/completeauth?token=${token}`)
			}
		}catch(err){}
	},
	completeUser: async (req, res) =>{
		const errors = validationResult(req);
		if (!errors.isEmpty())
			return res.status(422).json({ errors: errors.array() });
		else{
			const email = req.body.email;
			const username = req.body.username;
			const name = req.body.name;
			const img = req.body.img;
			const first_name = req.body.first_name;
			const password = await bcrypt.hash(req.body.password, 5);
			const headerAuth = req.headers['authorization'];
			const userId = jwtUtils.getUserId(headerAuth);
			if (userId < 0){
				return res.status(400).json([{ msg: 'wrong token' }]);
			}
			try{
				const userFound = await models.User.findOne({
					attributes: ['id', 'email', 'name', 'first_name', 'username', 'img', 'password', 'confirmation'],
					where: { id: userId }
				});
				const popularMovies = await models.Movies.findAll({
					raw: true,
					order: [
						['rating', 'DESC']
					],
					where: {source: '1337x'},
					limit: 8
				})
				const user = await userFound.update({ email, username, name, img, first_name, password, confirmation: true })
				return res.status(201).json({ 
					'userId': user.dataValues.id,
					'token': jwtUtils.generateTokenForUser(user.dataValues),
					'popularmovies': popularMovies
				});
			}catch(err){
				res.status(500).json([{ msg: 'cannot fetch user' }]);
			}
		}
	}
}
