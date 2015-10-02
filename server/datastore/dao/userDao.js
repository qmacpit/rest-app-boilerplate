var User = require("../models/user");
var CryptoJS = require("crypto-js/pbkdf2");

module.exports = {
	createUser: function(user) {
    return User.findOne({ 
    	username: user.username
    })
    .exec()
    .then(function(existingUser){
			if (existingUser) {
        throw new Error('User already exists');
      } else {        
        var newUser = new User({ 
            username: user.username,
            role: user.role, 
            password: user.password,
            privileges: user.privileges
        });
        return newUser.save();
      }
    });
	},
	createAndHashUser: function(user) {		                               
		user.password = CryptoJS(user.password, user.username, { keySize: 256/32 }).toString();
		return this.createUser(user);
	},
    getUserById: function(id) {        
        return User.findOne({ 
            _id: id
        })
        .select('username role')
        .exec();
    },
	// removeUsers: function(criteria){
	// 	return User.remove(criteria).exec();
	// },
    getUsers: function() {        
      return User.find()
        .select('username role')
        .exec();
    },
    updateUser: function(user) {
        return User.update({ '_id': user._id}, {            
            role: user.role
        }).exec();
    },
}