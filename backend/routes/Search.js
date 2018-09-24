const models = require('../models');
const Sequelize = require('sequelize');
const jwtUtils = require('../utils/jwtUtils')


module.exports = {
    allMovies: async (req, res) => {
        try{
            const allMovies = await models.Movies.findAll({
                raw: true,
                order: [
                    ['title', 'ASC']
                ]
              })
              return res.status(200).json({
                  'allmovies': allMovies
              })
        }
        catch(err){}
    },
    popularMovies: async (req, res) => {
        try{
            const popularMovies = await models.Movies.findAll({
                raw: true,
                order: [
                    ['rating', 'DESC']
                  ],
                  limit: 8
              })
              return res.status(200).json({
                  'popularmovies': popularMovies
              })
        }
        catch(err){}
    },
    addWatch: async (req, res) => {
        try{
            const headerAuth = req.headers['authorization'];
            const idUser = jwtUtils.getUserId(headerAuth);
            if (idUser < 0){
                return res.status(400).json([{ msg: 'wrong token' }]);
            }
            const idMovie = req.body.idMovie;
            const userWatch = await models.watch.findOne({
                raw: true,
                where: {idUser, idMovie}
            })
            if(userWatch == null){
                await models.watch.create({ idUser, idMovie });
            }
            const watch = await models.watch.findAll({
                attributes: ['idMovie'],
                raw: true,
                where: {idUser}
                })
              return res.status(200).json({
                  'watch': watch
              })
        }
        catch(err){console.log(err)}
    }
}