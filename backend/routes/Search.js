const models = require('../models');
const Sequelize = require('sequelize');
const jwtUtils = require('../utils/jwtUtils')
const util = require('util')

const Op = Sequelize.Op;

module.exports = {
    allMovies: async (req, res) => {
        try{
            let where = {}
            if (req.body.genre.value !== 'ALL'){
                where = {
                    [Op.and]: [
                        {source: 'yts'}, 
                        {genre: {[Op.contains]: [req.body.genre.value]}},
                        {rating: {[Op.gte]: req.body.rating.value}},
                        {title: {[Op.regexp]: req.body.term}}
                    ]
                }
            }else{
                where = {
                    [Op.and]: [
                        {source: 'yts'},
                        {rating: {[Op.gte]: req.body.rating.value}},
                        {title: {[Op.regexp]: req.body.term}}
                    ]
                }
            }
            const allMovies = await models.Movies.findAll({
                raw: true,
                order: [
                    [req.body.orderBy.value, req.body.order]
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