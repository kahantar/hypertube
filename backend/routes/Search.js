const models = require('../models');
const Sequelize = require('sequelize');

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
}