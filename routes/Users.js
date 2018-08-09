const models = require('../models');
const Sequelize = require('../../../Library/Caches/typescript/2.9/node_modules/@types/sequelize');
const bcrypt = require('../../../Library/Caches/typescript/2.9/node_modules/@types/bcrypt');
const jwtUtils = require('../utils/jwtUtils')
const mailer = require('../utils/mailer')

const Op = Sequelize.Op;

module.exports = {
    register: async (req, res) => {
        const email = req.body.email;
        const username = req.body.username;
        const name = req.body.name;
        const password = await bcrypt.hash(req.body.password, 5);
        const img = req.body.img;
        const first_name = req.body.first_name;
        const confirmation = false;

        try{
            const userFound = await models.User.findAll({
                where: { [Op.or]: [{email: email}, {username: username}]}
                })
            if (userFound.length === 0){
                const newUser = await models.User.create({ email, username, name, first_name, password, img, confirmation })
                const token = jwtUtils.generateTokenForUser(newUser.id)
                mailer(`Veuillez ouvrir le lien suivant afin de valider votre compte:  http://localhost:8080/api/users/confirmationemail?token=${token}&info=confirm`, newUser.email, "Inscription Hypertube")
                return res.status(201).json({
                    'user.id': newUser.id
                })
            }
            else {
                return res.status(409).json({'error': 'User already exist'})
            }
        }
        catch (err){
            return res.status(500).json({'error': 'Cannot add user'})
        }
    },

    login: async (req, res) => {
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
                      return res.status(200).json({
                          'userId': userFound.id,
                          'token': jwtUtils.generateTokenForUser(userFound.id)
                      })
                  }else{
                    return res.status(403).json({ "error": "Email not confirmed" })
                  }
              }
              else{
                return res.status(403).json({ "error": "invalid password" })
              }
            }
            else {
                return res.status(404).json({'error': 'User not exist'})
            }
        }
        catch (err){
            return res.status(500).json({'error': 'Cannot verify user'})
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
                    res.redirect("http://hypertube/connexion")
                }
                else{
                    res.redirect(`http://hypertube/reset?token=${token}`)
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
            const token = jwtUtils.generateTokenForUser(userFound.id)
            mailer(`Veuillez ouvrir le lien suivant afin de modifier votre mot de passe:  http://localhost:8080/api/users/confirmationemail?token=${token}&info=reset`, userFound.email, "Reinitialisation Password")
        }catch(err){
        }
    },
    resetPassword: async (req, res) => {
        const newPassword = await bcrypt.hash(req.body.password, 5);
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0){
            return res.status(400).json({ 'error': 'wrong token' });
        }
        try{
            const userFound = await models.User.findOne({ attributes: ['id', 'password'], where: {id: userId} })
            userFound.update({ password: newPassword })
            return res.status(201).json({ 'okey': 'password exchange'});
        }catch(err){
            return res.status(500).json({'error': 'Cannot add user'})
        }


    },
    modificationProfil: async (req, res) => {
        const email = req.body.email;
        const username = req.body.username;
        const name = req.body.name;
        const img = req.body.img;
        const first_name = req.body.first_name;
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        if (userId < 0){
            return res.status(400).json({ 'error': 'wrong token' });
        }
        try{
            const userFound = await models.User.findOne({
                attributes: ['id', 'email', 'name', 'first_name', 'username', 'img'],
                where: { id: userId }
            });
            userFound.update({ email, username, name, img, first_name })
            return res.status(201).json({ 'okey': 'profil exchange'});
        }catch(err){
            res.status(500).json({ 'error': 'cannot fetch user' });
        }
    },
    getUserProfil: async (req, res) => {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0){
            return res.status(400).json({ 'error': 'wrong token' });
        }
        try{
            const userFound = await models.User.findOne({
                                    attributes: ['id', 'email', 'name', 'first_name', 'username', 'img'],
                                    where: { id: userId }
                                });
            res.status(201).json(userFound);
        }catch(err){
            res.status(500).json({ 'error': 'cannot fetch user' });
        }
    }
}