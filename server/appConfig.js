var morgan = require('morgan'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	express = require('express'),
	// passport = require('passport'),
	errorhandler = require('errorhandler'),
	path = require('path');

module.exports = function(app) {

    app.use(morgan('dev')); // log every request to the console    
    app.use(bodyParser.json()); // get information from html forms
    app.use(express.static(path.join(__dirname, 'public')));    
    app.use(methodOverride());
    // app.use(passport.initialize());

    // development only
	if (app.get('env') === 'development') {
	    app.use(errorhandler());
	};

	// production only
	if (app.get('env') === 'production') {
	    // TODO
	};
};