const models = require('../models');
const sequelize = require('sequelize');

models.Movies.findAll({
  order: [
      ['rating', 'DESC']
    ],
  limit: 20

}).then((response) => {
    response.map(movie => {
        console.log(movie.title)
    })
    process.exit()
})