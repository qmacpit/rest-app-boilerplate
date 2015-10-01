var userDao = require('../datastore/dao/userDao');
var securityManager = require('../core/securityManager');
var apiUtils = require('./apiUtils');

module.exports = function(app) {
    var api = {
        getUsers: function() {
            return userDao.getUsers();
        },
        getUserById: function(req) {
          return userDao.getUserById(req.params.id);  
        },
        updateUser: function(req) {
            return userDao.updateUser(req.body);
        },
        createUser: function(req) {
            return userDao.createUser(req.body);
        }
    };

    app.get(
        apiUtils.REST_PREFIX + "users", 
        apiUtils.showClientRequest, 
        securityManager.authenticate(securityManager.STRATEGY.LOCAL_AUTHORIZATION),
        apiUtils.prepareHandleRequest(api.getUsers) 
    );

    app.get(
        apiUtils.REST_PREFIX + "user/:id", 
        apiUtils.showClientRequest, 
        securityManager.authenticate(securityManager.STRATEGY.LOCAL_AUTHORIZATION),
        apiUtils.prepareHandleRequest(api.getUserById) 
    );

    app.post(
        apiUtils.REST_PREFIX + "user", 
        apiUtils.showClientRequest, 
        securityManager.authenticate(securityManager.STRATEGY.LOCAL_AUTHORIZATION),
        apiUtils.prepareHandleRequest(api.updateUser) 
    );

    app.put(
        apiUtils.REST_PREFIX + "user", 
        apiUtils.showClientRequest, 
        securityManager.authenticate(securityManager.STRATEGY.LOCAL_AUTHORIZATION),
        apiUtils.prepareHandleRequest(api.createUser) 
    );
};