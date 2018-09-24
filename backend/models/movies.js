'use strict';
module.exports = (sequelize, DataTypes) => {
  var Movies = sequelize.define('Movies', {
    url: DataTypes.STRING,
    hash: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    rating: DataTypes.DECIMAL,
    genre: DataTypes.ARRAY(DataTypes.STRING),
    image: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    imdb_code: DataTypes.TEXT
  }, {});
  Movies.associate = function(models) {
    // associations can be defined here
  };
  return Movies;
};