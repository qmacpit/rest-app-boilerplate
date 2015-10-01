module.exports = function(app) { 

    app.get("/", function(req, res){        
        res.render('index');
    });

    app.get("/dashboard", function(req, res){        
        res.render('index');
    });

    app.get("/users", function(req, res){        
        res.render('index');
    }); 
    app.get("/users/add", function(req, res){        
        res.render('index');
    });
    app.get("/users/:username/edit", function(req, res){
        console.log("handling edit");
        res.render('index');
    }); 

    require('./securityApi')(app);
    require('./userApi')(app);
};