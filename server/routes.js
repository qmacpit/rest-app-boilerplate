var userRoute = require('./api/userRoute'),
	securityRoute = require('./api/securityRoute'),
	securityManager = require('./core/securityManager');

var REST_PREFIX = "/api/v1/";

function _handleRequest(req, res, promise) {
    promise.then(function(data){
       return res.json(data);    
    })
    .onReject(function(err){            
        res.send(500, err);
    });
}

function _prepareHandleRequest(func) {
	return function(req, res) {
		func()
		.then(function(data){
	       return res.json(data);    
	    })
	    .onReject(function(err){            
	        res.send(500, err);
	    });
	}
}

function showClientRequest(req, res, next) {
    var request = {
        REQUEST : {
            HEADERS: req.headers,
            BODY : req.body
        }
    }
    console.log(request)
    return next();
}

module.exports = function(app) { 
	
	app.post(
		REST_PREFIX + 'login', 
		showClientRequest, 
		securityManager.authenticate(securityManager.STRATEGY.LOCAL_LOGIN),
		securityRoute.login
	);

    app.get(
    	REST_PREFIX + 'logout', 
    	showClientRequest, 
    	securityManager.authenticate(securityManager.STRATEGY.LOCAL_AUTHORIZATION),
    	securityRoute.logout
	);	

	app.get(
		REST_PREFIX + "/users", 
		showClientRequest, 
    	securityManager.authenticate(securityManager.STRATEGY.LOCAL_AUTHORIZATION),
    	_prepareHandleRequest(userRoute.getUsers)	
	);

};