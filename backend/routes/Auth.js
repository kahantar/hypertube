const models = require('../models');
const Sequelize = require('sequelize');
const jwtUtils = require('../utils/jwtUtils')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator/check');


module.exports = {
	authGoogle: async (req, res) => {
        try{
            const user = {
                email: req.user._json.email,
                username: req.user._json.given_name,
                first_name: req.user._json.given_name,
                name: req.user._json.family_name,
                img: req.user._json.picture
            }
            
            const userFound = await models.User.findOne({
                where: { email: user.email }
            });

            if (userFound){
                const token = jwtUtils.generateTokenForUser(userFound)
                res.redirect(`http://localhost:3000/home?token=${token}`)
            }
            else {
                const token = jwtUtils.generateTokenForUser(user)      
                console.log(token)      
                res.redirect(`http://localhost:3000/signup?token=${token}`)
            }
        }catch(err){}
    },
    auth42: async (req, res) => {
        try{
            const user = {
                email: req.user._json.email,
                username: req.user._json.login,
                first_name: req.user._json.first_name,
                name: req.user._json.last_name,
                img: req.user._json.image_url
            }
            
            const userFound = await models.User.findOne({
                where: { email: user.email }
            });

            if (userFound){
                const token = jwtUtils.generateTokenForUser(userFound)
                res.redirect(`http://localhost:3000/home?token=${token}`)
            }
            else {
                const token = jwtUtils.generateTokenForUser(user)      
                console.log(token)      
                res.redirect(`http://localhost:3000/signup?token=${token}`)
            }
        }catch(err){}
    },
	authSlack: async (req, res) => {
		try{
            const user = {
                email: req.user._json.email,
                username: req.user._json.login,
                first_name: req.user._json.first_name,
                name: req.user._json.last_name,
                img: req.user._json.image_url
            }
            
            const userFound = await models.User.findOne({
                where: { email: user.email }
            });

            if (userFound){
                const token = jwtUtils.generateTokenForUser(userFound)
                res.redirect(`http://localhost:3000/home?token=${token}`)
            }
            else {
                const token = jwtUtils.generateTokenForUser(user)      
                console.log(token)      
                res.redirect(`http://localhost:3000/signup?token=${token}`)
            }
        }catch(err){}
	},
	completeUser: async (req, res) =>{
        console.log(req.body)
        const errors = validationResult(req);
        console.log(errors)
        if (!errors.isEmpty())
            return res.json({ errors: errors.array() });
        else{
            const email = req.body.email;
            const username = req.body.username;
            const name = req.body.name;
            const first_name = req.body.first_name;
            const password = await bcrypt.hash(req.body.password, 5)
            const img = req.body.img
            const headerAuth = req.headers['authorization'];
            // const userId = jwtUtils.getUserId(headerAuth);
            // if (userId < 0) {
            //     return res.status(400).json([{ msg: 'wrong token' }]);
            // }
            try{
                await models.User.create({ email, username, name, first_name, password, img, confirmation: true });

                const user = await models.User.findOne({
                    attributes: ['id', 'email', 'name', 'first_name', 'username', 'img', 'password', 'confirmation'],
                    where: { email: email }
                });
                const popularMovies = await models.Movies.findAll({
                    raw: true,
                    order: [
                        ['rating', 'DESC']
                      ],
                      limit: 100
                  })
                // const user = await userFound.update({ email, username, name, img, first_name, password, confirmation: true })
                return res.status(201).json({ 
                    'userId': user.dataValues.id,
                    'token': jwtUtils.generateTokenForUser(user.dataValues),
                    'popularmovies': popularMovies
                });
            }catch(err){
                res.json([{ msg: 'cannot fetch user' }]);
            }
        }
    }
}
