const models = require('../models');
const Sequelize = require('sequelize');
const jwtUtils = require('../utils/jwtUtils')

const Op = Sequelize.Op;

module.exports = {
    allMovies: async (req, res) => {
        try{
            console.log(req.body)
            let where = {}
            if (req.body.genre !== 'ALL'){
                where = {
                    [Op.and]: [
                        {source: 'yts'}, 
                        {genre: {[Op.contains]: [req.body.genre]}},
                        {rating: {[Op.gte]: req.body.rating}},
                        {title: {[Op.regexp]: req.body.term}}
                    ]
                }
            }else{
                where = {
                    [Op.and]: [
                        {source: 'yts'},
                        {rating: {[Op.gte]: req.body.rating}},
                        {title: {[Op.regexp]: req.body.term}}
                    ]
                }
            }
            const allMovies = await models.Movies.findAll({
                raw: true,
                order: [
                    [req.body.orderBy, req.body.order]
                ],
                where
              })
              return res.status(200).json({
                  'allmovies': allMovies
              })
        }
        catch(err){
            console.log(err)
        }
    },
    popularMovies: async (req, res) => {
        try{
            const popularMovies = await models.Movies.findAll({
                raw: true,
                order: [
                    ['rating', 'DESC']
                  ],
                  where: {source: '1337x'},
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