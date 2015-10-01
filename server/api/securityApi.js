var securityManager = require('../core/securityManager');
var apiUtils = require('./apiUtils');

module.exports = function(app) {

    var api = {
        login:function(req,res) {
            res.json({ 
                auth_token: req.user.token.auth_token,
                role: req.user.role,
                username: req.user.username
            });
        },
        logout: function(req,res) {
            if (!req.user || !req.user.token)
                return res.sendStatus(200);
                            
            req.user.save(function(err,user){
                if (err){
                    res.send(500, {'message': err});
                }
                res.json({ message: 'See you!'});
            });
        }
    };

    app.post(
        apiUtils.REST_PREFIX + 'login', 
        apiUtils.showClientRequest, 
        securityManager.authenticate(securityManager.STRATEGY.LOCAL_LOGIN),
        api.login
    );

    app.get(
        apiUtils.REST_PREFIX + 'logout', 
        apiUtils.showClientRequest,         
        api.logout
    );  
};