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
	}
};