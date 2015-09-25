var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var uuid = require('node-uuid');
var moment = require('moment');
var User = require("../datastore/models/user");

module.exports = {
    STRATEGY: {
        LOCAL_LOGIN: "local-login",
        LOCAL_AUTHORIZATION: "local-authorization"
    },
    initialize: function() {

        // used to serialize the user for the session
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });

        // used to deserialize the user
        passport.deserializeUser(function(id, done) {
            User.findById(id, function(err, user) {
                done(err, user);
            });
        });

        passport.use(this.STRATEGY.LOCAL_LOGIN,new LocalStrategy(
            function(username, password, done) {

                User.findOne({ 
                    username: username,
                    password: password
                }, function (err, user) {

                    if (err){
                        return done(err);
                    }

                    if (!user){
                        return done(null, false);
                    }

                    user.token.auth_token = uuid.v1();
                    user.token.createDate = moment();

                    user.save(function(err,user){
                        if (err){
                            return done(err);
                        }
                        return done(null, user);
                    });

                });
            }
        ));

        passport.use(this.STRATEGY.LOCAL_AUTHORIZATION, new BearerStrategy(
            function(token, done) {

                console.log(token);

                User.findOne({ 'token.auth_token' : token }, function (err, user) {
                    console.log("USER")
                    console.log(user)
                    if (err) { return done(err); }
                    if (!user) {
                        console.log(user);
                        return done(null, false);
                    }
                    if (user.hasExpired()) {
                        return done(null, false);
                    }
                    return done(null, user, { scope: 'all' });
                });
            }
        ));

        return passport.initialize();
    },
    authenticate: function(strategy) {
        return passport.authenticate(strategy, {
            session: false
        });        
    }
};
