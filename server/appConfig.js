var morgan = require('morgan'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	express = require('express'),
	passport = require('passport'),
	errorhandler = require('errorhandler'),
	path = require('path'),
	securityManager = require('./core/securityManager');

module.exports = function(app) {

    app.use(morgan('dev')); // log every request to the console    
    app.use(bodyParser.json()); // get information from html forms
    app.use(express.static(path.join(__dirname, '../client')));    
    app.use(methodOverride());
    app.use(securityManager.initialize());

    // development only
	if (app.get('env') === 'development') {
	    app.use(errorhandler());
	};

	// production only
	if (app.get('env') === 'production') {
	    // TODO
	};
};