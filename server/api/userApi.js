var userDao = require('../datastore/dao/userDao');
var securityManager = require('../core/securityManager');
var apiUtils = require('./apiUtils');

module.exports = function(app) {
    var api = {
        getUsers: function() {
            return userDao.getUsers();
        }
    };

    app.get(
        apiUtils.REST_PREFIX + "users", 
        apiUtils.showClientRequest, 
        securityManager.authenticate(securityManager.STRATEGY.LOCAL_AUTHORIZATION),
        apiUtils.prepareHandleRequest(api.getUsers) 
    );
};