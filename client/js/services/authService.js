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

  login: function(username, password, callback) {

    callback = arguments[arguments.length - 1];

    var token = this.getToken()
    if (token) {
        this.onChange(true);
        if (callback)
            callback(true);
        return;
    }

    if (!username || !password) {
        this.onChange(false);
            if (callback)
                callback(false);
        return;   
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
        if (this.onChange)
            this.onChange(true);
        if (callback)
         callback(true);
    }.bind(this));
  },
  logout: function() {
      ajax.get("/api/v1/logout")
      .then(function(){
          localStorage.removeItem("auth_token");
          this.onChange(false);
      }.bind(this))
  }  
};