var userRoute = require('./api/userRoute');

function _handleRequest(req, res, promise) {
    promise.then(function(data){
       return res.json(data);    
    })
    .onReject(function(err){            
        res.send(500, err);
    });
};

module.exports = function(app) { 
	
	app.get("/check", function(req, res) {
		res.send({
			text: "Hello World"
		})
	});

	app.get("/users", function(req, res) {
		_handleRequest(req, res, userRoute.getUsers());	
	});
};