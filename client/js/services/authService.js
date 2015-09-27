module.exports = {
  loggedIn: function() {
    console.log("loggedIn")
    console.log(this.getToken() !== undefined)
    return this.getToken() !== undefined;
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

    var salt = username;
    var enc_password = CryptoJS.PBKDF2(password, salt, { keySize: 256/32 });

    var user = {"username": username, "password": enc_password.toString()};

    //$.post("/api/v1/login", user)
    
    $.ajax({
      type: "POST",
      url: "/api/v1/login",
      data: JSON.stringify(user),      
      contentType: "application/json"      
    })
    .then(function(data){
        console.log(data)
        localStorage.setItem("auth_token", data.auth_token);
        this.onChange(true);
        if (callback)
         callback(true);
    });
},
check: function() {
    
    $.ajax({
        url: "/api/v1/users",
        cache: false,        
        headers: {
            Authorization: 'Bearer '+ localStorage.getItem("auth_token")
        },
        accepts: "json"
    });
},
logout: function() {
    $.ajax({
        url: "/api/v1/logout",
        cache: false,
        headers: {
            Authorization: 'Bearer '+ localStorage.getItem("auth_token")
        },
        accepts: "json"
    })
    .then(function(){
        localStorage.removeItem("auth_token");
    })
}  
};