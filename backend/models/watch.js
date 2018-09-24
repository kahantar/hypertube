'use strict';
module.exports = (sequelize, DataTypes) => {
  var watch = sequelize.define('watch', {
    idUser: DataTypes.INTEGER,
    idMovie: DataTypes.INTEGER
  }, {});
  watch.associate = function(models) {
    // associations can be defined here
  };
  return watch;
};