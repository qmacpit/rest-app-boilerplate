var express  = require('express');

var userDao = require('./datastore/dao/userDao');

var port = process.env.PORT || 3000,
    ip = process.env.IP || "localhost",
    config = require("../config.json")    
    app = express();

require('./appConfig')(app);
require('./routes')(app);

var server = app.listen(port, function () {
    console.log('Express server listening on port ' + server.address().port);
    require('./db')(
    	app.get('env') === 'development'
    	? config.connection
    	: connectionhq
	)
	.then(function(){
		var roles = config.security.roles,
			i = 0, l = roles.length,
			adminRole;
			
		for (; i < l; i++) {						
			if (roles[i].role === "admin") {
				adminRole = roles[i];
				break;
			}
		}
	
		config.admins.forEach(function(admin){
			console.log("db init");
			admin.role = "admin";
			admin.privileges = adminRole.privileges;
			console.log(admin);
			userDao.createAndHashUser(admin);
		});
	})
	.fail(function(err){
		console.log(err);
	})
});