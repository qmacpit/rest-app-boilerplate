module.exports = {
    REST_PREFIX: "/api/v1/",
    handleRequest: function(req, res, promise) {
        promise.then(function(data){
           return res.json(data);    
        })
        .onReject(function(err){            
            res.send(500, err);
        });
    },
    prepareHandleRequest: function(func) {
        return function(req, res) {
            func()
            .then(function(data){
               return res.json(data);    
            })
            .onReject(function(err){            
                res.send(500, err);
            });
        }
    },
    showClientRequest: function(req, res, next) {
        var request = {
            REQUEST : {
                HEADERS: req.headers,
                BODY : req.body
            }
        }
        console.log(request)
        return next();
    }
};