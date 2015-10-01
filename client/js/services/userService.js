import toolbox from '../toolbox/toolbox'

module.exports = {
	get: function() {
		return $.ajax({
    	url: "/api/v1/users",
    	cache: false,        
    	headers: {
      	Authorization: 'Bearer '+ localStorage.getItem("auth_token")
    	},
    	accepts: "json"
  	});
	},
  getUserData(_id) {
    return $.ajax({
      url: "/api/v1/user/" + _id,
      cache: false,        
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem("auth_token")
      },
      accepts: "json"
    });
  },
  saveUser(user) {
    return $.ajax({
      type: "POST",
      url: "/api/v1/user",
      data: JSON.stringify(user),  
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem("auth_token")
      },    
      contentType: "application/json"      
    });
  },
  createUser(user) {
    user.password = toolbox.hashPassword(user.username, user.password);
    return $.ajax({
      type: "PUT",
      url: "/api/v1/user",
      data: JSON.stringify(user),  
      headers: {
        Authorization: 'Bearer '+ localStorage.getItem("auth_token")
      },    
      contentType: "application/json"      
    });

  }
};