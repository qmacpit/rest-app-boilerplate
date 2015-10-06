import toolbox from '../toolbox/toolbox'
import ajax from '../toolbox/ajax'

module.exports = {
  loggedIn: function() {    
    var token = this.getToken();
    return token !== undefined 
            && token !== null;
  },  

  getToken: function() {
    return localStorage.getItem("auth_token");
  },

  getRole: function() {
    return localStorage.getItem("role");
  },

  authenticate: function(username, password, callback) {
    if (!username || !password) {        
      if (callback)
        return callback(false);          
    }

    var user = {
        "username": username, 
        "password": toolbox.hashPassword(username, password)
    };
    
    $.ajax({
      type: "POST",
      url: "/api/v1/login",
      data: JSON.stringify(user),      
      contentType: "application/json"      
    })
    .then(function(data){        
        localStorage.setItem("auth_token", data.auth_token);
        localStorage.setItem("role", data.role);
        if (this.onChange)
            this.onChange(true, data.role);
        if (callback)
         callback(true);
    }.bind(this));
  },

  login: function() {
    var token = this.getToken();
    if (token) {
        return this.onChange(true, this.getRole());        
    }
    this.onChange(false);
  },
  logout: function() {
      return ajax.get("/api/v1/logout")
      .then(function(){
          localStorage.removeItem("auth_token");
          localStorage.removeItem("role");
          this.onChange(false);
      }.bind(this))
  }  
};