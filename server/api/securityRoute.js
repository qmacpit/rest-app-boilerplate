module.exports = {
	login:function(req,res) {
        res.json({ 
            auth_token: req.user.token.auth_token,
            role: req.user.role,
            username: req.user.username
        });
    },
    logout: function(req,res) {
        req.user.auth_token = null;
        req.user.save(function(err,user){
            if (err){
                res.send(500, {'message': err});
            }
            res.json({ message: 'See you!'});
        });
    }
};