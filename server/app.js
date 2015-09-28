var express  = require('express');

var userDao = require('./datastore/dao/userDao');

var port = process.env.PORT || 3000,
    ip = process.env.IP || "localhost",
    config = require("../config.json")    
    app = express();

require('./appConfig')(app);
require('./api/api')(app);

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
    .then(function(){
        var webpack = require('webpack');
        var WebpackDevServer = require('webpack-dev-server');
        var config = require('../webpack.config.js');

        new WebpackDevServer(webpack(config), {
           hot: true,
           historyApiFallback: true,
           proxy: {
             "*": "http://localhost:3000"
           }
        }).listen(3001, 'localhost', function (err, result) {
           if (err) {
             console.log(err);
           }

           console.log('Listening at localhost:3001');
        });
    })
	.fail(function(err){
		console.log(err);
	})
});