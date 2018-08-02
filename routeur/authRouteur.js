var express = require('express');
var passport = require('passport');
var router = express.Router();
const models = require('../models');
const Sequelize = require('sequelize');
const jwtUtils = require('../utils/jwtUtils')
const bcrypt = require('bcrypt');


router.get('/', function(req, res, next) {
    res.redirect("/");
});

router.get('/google',
    passport.authenticate('google', { scope : ['profile','email'] }
    ));

router.get('/google/callback', passport.authenticate('google', { scope : ['profile','email'] }),
    async (req, res) => {
        try{
            const email = req.user._json.email;
            const username = req.user._json.name;
            const name = req.user._json.family_name;
            const first_name = req.user._json.given_name;

            const userFound = await models.User.findOne({
                where: { email: email }
            });
            if (userFound && userFound.confirmation == true){
                const token = jwtUtils.generateTokenForUser(userFound)
                res.redirect(`http://www.hypertube.com/connecter?token=${token}`)
            }else{
                if (userFound == null)
                    userFound = await models.User.create({ email, username, name, first_name, password: "1234", img: "1234", confirmation: false });
                    const token = jwtUtils.generateTokenForUser(userFound)            
                    console.log(token)
                res.redirect(`http://www.hypertube.com/complete?newUser=${userFound.dataValues}&token=${token}`)
            }
        }catch(err){}
    });

router.post('/completeuser', async (req, res) =>{
    const email = req.body.email;
        const username = req.body.username;
        const name = req.body.name;
        const img = req.body.img;
        const first_name = req.body.first_name;
        const password = await bcrypt.hash(req.body.password, 5);
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        if (userId < 0){
            return res.status(400).json({ 'error': 'wrong token' });
        }
        try{
            const userFound = await models.User.findOne({
                attributes: ['id', 'email', 'name', 'first_name', 'username', 'img', 'password', 'confirmation'],
                where: { id: userId }
            });
            userFound.update({ email, username, name, img, first_name, password, confirmation: true })
            return res.status(201).json({ 'okey': 'profil completed'});
        }catch(err){
            res.status(500).json({ 'error': 'cannot fetch user' });
        }
});

module.exports = router;