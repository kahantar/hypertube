const request = require('request');
const expect = require('chai').expect;
const sequelize = require('sequelize');
const models = require("../models");

/******* REGISTER *******/

describe('routes/Users.js', function() {
	before((done) => {
		models.User.destroy({
			where: {}
		})
			.then(() => {
				done();
			});
	});


	describe('#register()', function() {
		const url = "http://localhost:8080/api/users/register/";
		const infos = {
			email: 'abcd@abcd.com',
			username: 'testa',
			name: 'test',
			password: 'abcABC1',
			img: null,
			first_name: 'test'
		};

		it('should return 201', function(done) {
			request.post(url, {form: infos}, function (err, res, body) {
				expect(res.statusCode).to.equal(201);
				done();
			});
		});

		it('should return 409', function(done) {
			request.post(url, {form: infos}, function (err, res, body) {
				expect(res.statusCode).to.equal(409);
				done();
			});
		});
	});
});
