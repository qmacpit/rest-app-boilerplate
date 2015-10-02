import toolbox from '../toolbox/toolbox';
import ajax from '../toolbox/ajax';

module.exports = {
	get: function() {
		return ajax.get("/api/v1/users");
	},
  getUserData(_id) {
    return ajax.get("/api/v1/user/" + _id);    
  },
  saveUser(user) {
    return ajax.post("/api/v1/user", user);    
  },
  createUser(user) {
    user.password = toolbox.hashPassword(user.username, user.password);
    return ajax.put("/api/v1/user", user);    
  }
};