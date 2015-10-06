var morgan = require('morgan'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	methodOverride = require('method-override'),
	express = require('express'),
	session = require('express-session'),
	passport = require('passport'),
	errorhandler = require('errorhandler'),
	path = require('path'),
	securityManager = require('./core/securityManager');

module.exports = function(app) {

    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(morgan('dev')); // log every request to the console    
    app.use(bodyParser.json()); // get information from html forms
    app.use(express.static(path.join(__dirname, '../client')));    
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(session({ 
    	secret: 'keyboard cat',
    	resave: true,
    	saveUninitialized: true
	 }));
    
   	app.use(securityManager.initialize());
	app.use(securityManager.session());

    // development only
	if (app.get('env') === 'development') {
	    app.use(errorhandler());
	};

	// production only
	if (app.get('env') === 'production') {
	    // TODO
	};
};