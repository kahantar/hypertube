const models = require('../models');
const Sequelize = require('sequelize');

const ff = async () => {
    const popularMovies = await models.Movies.findAll({
        raw: true,
        order: [
            ['rating', 'DESC']
        ],
        limit: 8
      })
      console.log(popularMovies)
      return 'ok'
}

ff()