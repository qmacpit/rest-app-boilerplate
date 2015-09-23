var userDao = require('../datastore/dao/userDao');

module.exports = {
	getUsers: function(){
		return userDao.getUsers();
	}
};