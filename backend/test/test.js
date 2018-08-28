const request = require('request');
const expect = require('chai').expect;
const sequelize = require('sequelize');
const models = require("../models");
const info = require('./info');
const FormData = require('form-data');


/******* REGISTER *******/

describe('routes/Users.js', function() {
	let token = ''
	before((done) => {
		models.User.destroy({
			where: {}
		})
		.then(() => {
			done();
		});
	});
	
	
	describe('#register()', function() {
		it('should return 201', function(done) {
			request.post(info.urlRegister, {form: info.registerNotConfirm}, function (err, res, body) {
				expect(res.statusCode).to.equal(201);
				done();
			});
		});
		
		it('should return 201', function(done) {
			request.post(info.urlRegister, {form: info.registerConfirm}, function (err, res, body) {
				expect(res.statusCode).to.equal(201);
				done();
			});
		});
		
		it('should return 409', function(done) {
			request.post(info.urlRegister, {form: info.registerNotConfirm}, function (err, res, body) {
				expect(res.statusCode).to.equal(409);
				done();
			});
		});
		
		it('should return 422', function(done) {
			request.post(info.urlRegister, {form: info.registerFalse}, function (err, res, body) {
				expect(res.statusCode).to.equal(422);
				done();
			});
		});
		
	});
	
	/******* LOGIN *******/
	
	describe('#login()', function() {

		it('should return 200', function(done) {
			request.post(info.urlLogin, {form: info.loginConfirm}, function (err, res, body) {
				token = JSON.parse(body).token;
				expect(res.statusCode).to.equal(200);
				done();
			});
		});

		it('should return 403', function(done) {
			request.post(info.urlLogin, {form: info.loginInvalidPassword}, function (err, res, body) {
				expect(res.statusCode).to.equal(403);
				done();
			});
		});

		it('should return 409', function(done) {
			request.post(info.urlLogin, {form: info.loginNotConfirm}, function (err, res, body) {
				expect(res.statusCode).to.equal(409);
				done();
			});
		});

		it('should return 404', function(done) {
			request.post(info.urlLogin, {form: info.loginInvalidUser}, function (err, res, body) {
				expect(res.statusCode).to.equal(404);
				done();
			});
		});

		it('should return 422', function(done) {
			request.post(info.urlLogin, {form: info.loginFalse}, function (err, res, body) {
				expect(res.statusCode).to.equal(422);
				done();
			});
		});
	});

	/******* RESETEMAILPASSWORD *******/

	describe('#resetemailpassword()', function() {
		
		it('should return 200', function(done) {
			request.post(info.urlResetEmailPassword, {form: info.resetEmailTrue}, function (err, res, body) {
				expect(res.statusCode).to.equal(200);
				done();
			});
		});
	
		it('should return 400', function(done) {
			request.post(info.urlResetEmailPassword, {form: info.resetEmailFalse}, function (err, res, body) {
				expect(res.statusCode).to.equal(400);
				done();
			});
		});
	});

	/******* RESETPASSWORD *******/

	describe('#resetpassword()', function() {
		
		it('should return 201', function(done) {
			request.put(info.urlResetPassword, {form: info.newPassword}, function (err, res, body) {
				expect(res.statusCode).to.equal(201);
				done();
			})
			.setHeader('Authorization', token);
		});
	
		it('should return 400', function(done) {
			request.put(info.urlResetPassword, {form: info.newPassword}, function (err, res, body) {
				expect(res.statusCode).to.equal(400);
				done();
			});
		});

		it('should return 422', function(done) {
			request.put(info.urlResetPassword, {form: info.errorNewPassword}, function (err, res, body) {
				expect(res.statusCode).to.equal(422);
				done();
			});
		});
	});

	/******* LOADUSERS *******/

	
	describe('#loadusers()', function() {
		
		it('should return 201', function(done) {
			request.get(info.urlLoadUsers, function (err, res, body) {
				expect(res.statusCode).to.equal(201);
				done();
			})
			.setHeader('Authorization', token);
		});
	
		it('should return 400', function(done) {
			request.get(info.urlLoadUsers, function (err, res, body) {
				expect(res.statusCode).to.equal(400);
				done();
			});
		});
	});

	/******* COMPLETEUSER *******/

		describe('#completeuser()', function() {
			it('should return 201', function(done) {
				request.put(info.urlCompleteUser, {form: info.completeUserTrue}, function (err, res, body) {
					expect(res.statusCode).to.equal(201);
					done();
				})
				.setHeader('Authorization', token);
			});
		
			it('should return 400', function(done) {
				request.put(info.urlCompleteUser, {form: info.completeUserTrue}, function (err, res, body) {
					expect(res.statusCode).to.equal(400);
					done();
				});
			});
	
			it('should return 422', function(done) {
				request.put(info.urlCompleteUser, {form: info.completeUserFalse}, function (err, res, body) {
					expect(res.statusCode).to.equal(422);
					done();
				})
				.setHeader('Authorization', token);
			});
	});
});
