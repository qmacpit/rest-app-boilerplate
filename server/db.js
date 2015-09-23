var mongoose = require('mongoose'),
    q = require('q');


module.exports = function(dbURI) {

    var deferred = q.defer();

    mongoose.connect(dbURI);

    // When successfully connected
    mongoose.connection.on('connected', function () {
        console.log('Mongoose connection open to ' + dbURI);
        deferred.resolve();
    });

    // If the connection throws an error
    mongoose.connection.on('error',function (err) {
        console.log('Mongoose default connection error: ' + err);
        deferred.fail();
    });

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });

    return deferred.promise;
}
