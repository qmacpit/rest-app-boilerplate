function login() {

    var salt = "qmacpit";
    var enc_password = CryptoJS.PBKDF2("ppp", salt, { keySize: 256/32 });

    var user = {"username": salt, "password": enc_password.toString()};

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
    });
}

function check() {
    
    $.ajax({
        url: "/api/v1/users",
        cache: false,        
        headers: {
            Authorization: 'Bearer '+ localStorage.getItem("auth_token")
        },
        accepts: "json"
    });
}

function logout() {
    $.ajax({
        url: "/api/v1/logout",
        cache: false,
        headers: {
            Authorization: 'Bearer '+ localStorage.getItem("auth_token")
        },
        accepts: "json"
    });
}