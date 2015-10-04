var expect = require('expect.js');
var request = require('supertest');
var randomstring = require("randomstring");

var testUtils = require('./testUtils');

describe('user-suite', function(){

	it('get users', function(done){	

		var token;

		testUtils.getJson('/users')
		.then(function(res){
			expect(res.status).to.be(401);
			return testUtils.getToken('qmacpit', 'ppp');
		})		
		.then(function(auth_token){			
			expect(auth_token).to.be.ok();
			token = auth_token;
			return testUtils.getJsonAuth('/users', token);
		})
		.then(function(res){
			expect(res.status).to.be(200);
			expect(res.body).to.be.ok();
			return testUtils.logout(token);
		})		
		.then(function(res){
			expect(res.status).to.be(200);
			return done();
		});

	});

	it('create user', function(done){

		var token, password = randomstring.generate(5),
			user = {
				username: randomstring.generate(15),
				role: 'user'
			};

		testUtils.getToken('qmacpit', 'ppp')
		.then(function(auth_token){			
			expect(auth_token).to.be.ok();
			token = auth_token;
			user.password = testUtils.getHashedPassword(user.username, password);					
			return testUtils.putJsonAuth('/user', user, token);
		})
		.then(function(res){	
			var _user = res.body;
			expect(_user.username).to.be(user.username);			
			return testUtils.getJsonAuth("/user/" + _user._id, token);			
		})
		.then(function(res){				
			var _user = res.body;
			expect(_user.username).to.be(user.username);
			return testUtils.getToken(user.username, password);
		})
		.then(function(auth_token){			
			expect(auth_token).to.be.ok();			
			return testUtils.logout(auth_token);
		})
		.then(function(){
			return done();
		})
		.fail(function(err){
			console.log(err);
		});

	});

});