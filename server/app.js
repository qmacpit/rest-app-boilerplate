var express  = require('express');
var q = require('q');

var userDao = require('./datastore/dao/userDao');
var roleDao = require('./datastore/dao/roleDao');

var port = process.env.PORT || 3000,
    ip = process.env.IP || "localhost",
    config = require("../config.json")    
    app = express();

require('./appConfig')(app);
require('./api/api')(app);

app.listen(port, function () {
  console.log('Express server listening on port ' + port);  
  require('./db')(
    	app.get('env') === 'development'
    	? config.connection
    	: connectionhq
	)
  .then(_initDb)
  // .then(_initDevEnv)
  .fail(function(err){
    console.log(err);
  })
});

function _initDb() {
  var roles = config.security.roles,
      i = 0, l = roles.length,
      adminRole, currentRole;
      
  for (; i < l; i++) {    
    currentRole = roles[i];
    roleDao.createRole(currentRole.role, currentRole.privileges);       
  }
  
  return q.all(
    config.admins.map(function(admin) {     
      admin.role = "admin";      
      userDao.createAndHashUser(admin);
    })
  );
}

function _initDevEnv() {
  var webpack = require('webpack');
  var WebpackDevServer = require('webpack-dev-server');
  var config = require('../webpack.config.js');

  new WebpackDevServer(webpack(config), {
     hot: true,
     historyApiFallback: true,
     publicPath: '/',     
     proxy: {
       "*": "http://localhost:3000"
     }
  }).listen(3001, 'localhost', function (err, result) {
     if (err) {
       console.log(err);
     }

     console.log('Listening at localhost:3001');
  });
}