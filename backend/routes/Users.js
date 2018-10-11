const models = require('../models');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwtUtils')
const mailer = require('../utils/mailer')
const { validationResult } = require('express-validator/check');
const cloudinary = require('cloudinary')
const cloudinaryKey = require('../config/apiKey')


cloudinary.config({ 
    cloud_name: cloudinaryKey.cloud_name, 
    api_key: cloudinaryKey.api_key, 
    api_secret: cloudinaryKey.api_secret
});
const Op = Sequelize.Op;

module.exports = {
	register: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.json({ err: 'Empty data'});
		}
		else{
			const email = req.body.email;
			const username = req.body.username;
			const name = req.body.name;
			const password = await bcrypt.hash(req.body.password, 5);
			const img = 'https://res.cloudinary.com/dzhnhtkyv/image/upload/v1539275273/Netflix42/no-photos_1.png'
			const first_name = req.body.first_name;
			const confirmation = req.body.confirmation;

			try{
				const userFound = await models.User.findAll({
					where: { [Op.or]: [{email: email}]}
				})
				if (userFound.length === 0){
					const newUser = await models.User.create({ email, username, name, first_name, password, img, confirmation });
					const token = jwtUtils.generateTokenForId(newUser.id);
					mailer(`Veuillez ouvrir le lien suivant afin de valider votre compte:  http://localhost:8080/api/users/confirmationemail?token=${token}&info=confirm`, newUser.email, "Inscription Hypertube")
					return res.status(201).json({request: 'ok'})
				}
				else {
					return res.json([{err: 'User already exist'}])
				}
			}
			catch (err){
				return res.json([{err: 'Cannot add user'}])
			}
		}

	},

	login: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: [errors.array()[0]] });
		}else{
			const email = req.body.email;
			const password = req.body.password;
			try{
				const userFound = await models.User.findOne({
					where: {email: email}
				})
				if (userFound){
					const compareUser = await bcrypt.compare(password, userFound.password);
					if (compareUser){
						if (userFound.confirmation === true){
							const popularMovies = await models.Movies.findAll({
								raw: true,
								order: [
									['rating', 'DESC']
								],
								limit: 50
							})
							return res.status(200).json({
								'userId': userFound.id,
								'token': jwtUtils.generateTokenForUser(userFound),
								'popularmovies': popularMovies
							})
						}
						else {
							return res.json({unactive: 'unactiveUser'})
						}
					}
					else {
						return res.json({signPwd: '\u2717', pwd: 'wrongPwd'})
					}
				}
				else {
					return res.json({signMail: '\u2717', mail: 'wrongMail'})
				}
			}
			catch (err){
				return res.status(500).json({msg: ''})
			}
		}
	},

	confirmationEmail: async (req, res) => {
		const token = req.query.token;
		const info = req.query.info;
		if (token){
			const userId = jwtUtils.getUserId(token);
			if (userId < 0){
				return res.status(500).json({ 'error': 'wrong token' });
			}
			try{
				const userFound = await models.User.findOne({ attributes: ['id', 'confirmation'], where: {id: userId} })
				userFound.update({ confirmation: true })
				if (info == "confirm"){
					res.redirect(`http://localhost:3000/home?token=${token}`)
				}
				else{
					res.redirect(`http://localhost:3000/resetpassword?token=${token}`)
				}
			}catch(err){
				return res.status(500).json({'error': 'Cannot confirm token'})
			}
		}else{
			return res.status(500).json({ 'error': 'no token' });
		}
	},

	resetEmailPassword: async (req, res) => {
		const email = req.body.email;
		try{
			const userFound = await models.User.findOne({ where: { email } })
			const token = jwtUtils.generateTokenForId(userFound.id)
			mailer(`Veuillez ouvrir le lien suivant afin de modifier votre mot de passe:  http://localhost:8080/api/users/confirmationemail?token=${token}&info=reset`, userFound.email, "Reinitialisation Password")
			return res.status(200).json([{msg: "Please open your email"}])
		}catch(err){
			res.status(400).json([{msg: "wrong email"}])
		}
	},
	resetPassword: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}else{
			const newPassword = await bcrypt.hash(req.body.password, 5);
			const headerAuth = req.headers['authorization'];
			const userId = jwtUtils.getUserId(headerAuth);
			if (userId < 0){
				return res.status(400).json([{ msg: 'wrong token' }]);
			}
			try{
				const userFound = await models.User.findOne({ attributes: ['id', 'password'], where: {id: userId} })
				userFound.update({ password: newPassword })
				return res.status(201).json([{ msg: 'password exchange'}]);
			}catch(err){
				return res.status(500).json([{msg: 'Cannot add user'}])
			}
		}
	},
	modificationProfil: async (req, res) => {
		const headerAuth = req.headers['authorization'];
		const userId = jwtUtils.getUserId(headerAuth);
		if (userId < 0){
			return res.status(400).json([{ msg: 'wrong token' }]);
		}
		const userFound = await models.User.findOne({
			attributes: ['id', 'email', 'username', 'name', 'first_name', 'img', 'password'],
			where: { id: userId }
		});
		const email = req.body.email;
		const username = req.body.username;
		const name = req.body.name;
		const first_name = req.body.first_name;
		const img = req.body.img
		const newPwd = (!req.body.newPwd) ? userFound.password : await bcrypt.hash(req.body.newPwd, 5)
		let userUpdate = {}
		const compareUser = await bcrypt.compare(req.body.oldPwd, userFound.password)
		if (compareUser || (!req.body.newPwd && !req.body.oldPwd)) {
			if (img.length > 1000){
				cloudinary.v2.uploader.upload(img, (err, result) => {
					if (err)
						console.log(err)

					const imgUrl = result.url

					userFound.update({ email, username, name, first_name, img: imgUrl, password: newPwd })
					userUpdate = {
						id: userFound.id,
						email: email,
						username: username,
						name: name,
						first_name: first_name,
						img: imgUrl
					}
					return res.status(201).json({
						'userId': userFound.id,
						'token': jwtUtils.generateTokenForUser(userUpdate)
					});             
				})
			}
			else {
				userFound.update({ email, username, name, first_name, password: newPwd })
				userUpdate = {
					id: userFound.id,
					email: email,
					username: username,
					name: name,
					first_name: first_name,
					img: img
				}
				return res.status(201).json({
					'userId': userFound.id,
					'token': jwtUtils.generateTokenForUser(userUpdate)
				});             
			}
		}
		else {
			return res.json({signPwd: '\u2717', pwd: 'wrongPwd'})
		}
	},
	loadAllUsers: async (req, res) => {
		const headerAuth = req.headers['authorization'];
		const userId = jwtUtils.getUserId(headerAuth);
		if (userId < 0){
			return res.status(400).json([{ msg: 'wrong token' }]);
		}
		try{
			// const userFound = await models.User.findOne({
			//                         attributes: ['id', 'email', 'name', 'first_name', 'username', 'img'],
			//                         where: { id: userId }
			//                     });
			const users = await models.User.findAll({ 
				attributes: ['id', 'name', 'first_name', 'username', 'img'],
				where: { confirmation: true } 
			});
			return res.status(201).json(users);
		}catch(err){
			res.status(500).json({ 'error': 'cannot fetch user' });
		}
	},
	loadMail: async (req, res) => {
		// const headerAuth = req.headers['authorization'];
		// const userId = jwtUtils.getUserId(headerAuth);
		// if (userId < 0){
		//     return res.status(400).json([{ msg: 'wrong token' }]);
		// }
		try{
			const users = await models.User.findAll({ 
				raw: true,
				attributes: ['email'],
			});
			let mailCrypted = []
			for (let i = 0; i < users.length; i++)
				mailCrypted.push(await bcrypt.hash(users[i].email, 5))

			return res.status(201).json(mailCrypted);
		}catch(err){
			res.status(500).json({ 'error': 'cannot fetch user' });
		}
	}
}
