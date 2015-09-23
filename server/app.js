var express  = require('express');

var port = process.env.PORT || 3000,
    ip = process.env.IP || "localhost",    
    app = express();

require('./appConfig')(app);
require('./routes')(app);

var server = app.listen(port, function () {
    console.log('Express server listening on port ' + server.address().port);
});