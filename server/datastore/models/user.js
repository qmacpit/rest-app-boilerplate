var mongoose = require('mongoose');
var moment = require('moment');
var expired_time = 60;
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: String,
    password: String,
    role: String,    
    token : {
        auth_token: String,
        createDate: {type: Date, required: true, default: moment()}
    }

});

userSchema.methods.hasExpired = function() {
    return (moment().diff(this.token.createDate, 'minutes')) > expired_time;

};

module.exports = mongoose.model('User', userSchema);





