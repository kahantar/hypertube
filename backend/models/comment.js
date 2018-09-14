'use strict';

module.exports = (sequelize, DataTypes) => {
	const Comment = sequelize.define('Comment', {
		comment: DataTypes.STRING,
		imdb: DataTypes.STRING,
		username: DataTypes.STRING,
	}, {});

	Comment.associate = function(models) {
		Comment.belongsTo(models.User);
	};
	return Comment;
};
