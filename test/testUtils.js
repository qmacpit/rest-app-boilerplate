var CryptoJS = require("crypto-js/pbkdf2");
var request = require('supertest');
var q = require('q');

module.exports = {
	request: function() {
		return request("http://localhost:3000/api/v1");
	},
	getHashedPassword: function(username, password) {
		return CryptoJS(password, username, { keySize: 256/32 }).toString();
	},
	getToken: function(username, password) {
		var deferred = q.defer();
		password = CryptoJS(password, username, { keySize: 256/32 }).toString();
		
		this.request()
	      .post('/login')
	      .set('Content-Type', 'application/json')
	      .set('Accept', 'application/json')
	      .send(JSON.stringify({
	      	username: username,
	      	password: password
	      }))  
	      .expect(200)
	      .end(function(err, res){	      		      	
	        if (err) return deferred.reject(err);
	        deferred.resolve(res.body.auth_token);
	      });

	      return deferred.promise;
	},
	logout: function(auth_token) {
		var deferred = q.defer();
		this.request()
	      .get('/logout')
	      .set('Accept', 'application/json')	      	      
	      .set('Authorization', 'Bearer '+ auth_token)      
	      .end(function(err, res){	      		    
	        if (err) return deferred.reject(err);
	        deferred.resolve(res);
	      });
	    return deferred.promise;
	},
	getJson: function(url) {
		var deferred = q.defer();
		this.request()
	      .get(url)
	      .set('Accept', 'application/json')	      	      
	      .end(function(err, res){	      		    
	        if (err) return deferred.reject(err);
	        deferred.resolve(res);
	      });
	    return deferred.promise;
	},
	getJsonAuth: function(url, auth_token) {
		var deferred = q.defer();
		this.request()
	      .get(url)
	      .set('Accept', 'application/json')	      	      
	      .set('Authorization', 'Bearer '+ auth_token)      
	      .end(function(err, res){	      		    
	        if (err) return deferred.reject(err);
	        deferred.resolve(res);
	      });
	    return deferred.promise;
	},
	putJsonAuth: function(url, data, auth_token) {
		var deferred = q.defer();
		this.request()
    .put(url)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', 'Bearer '+ auth_token)      
    .send(JSON.stringify(data))  
    .expect(200)
    .end(function(err, res){	      		      	
      if (err) return deferred.reject(err);
      deferred.resolve(res);
    });

    return deferred.promise;
	}
};