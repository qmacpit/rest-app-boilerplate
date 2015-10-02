function _getAuthorizationHeader() {
  return 'Bearer '+ localStorage.getItem("auth_token")  
}

function _ajax(params) {  
  var params = $.extend({}, {    
      cache: false,        
      headers: {
        Authorization: _getAuthorizationHeader()
      },
      accepts: "application/json",
      contentType: "application/json"
    }, params);
  console.log(params)
  return $.ajax(
    params
  );
}

module.exports = {
  get(url) {
    return _ajax({
      url: url
    })     
  },
  post(url, data) {
    return _ajax({
      type: 'POST',
      url: url,
      data: typeof data === "object" ? JSON.stringify(data) : data
    });
  },
  put(url, data) {
    return _ajax({
      type: 'PUT',
      url: url,
      data: typeof data === "object" ? JSON.stringify(data) : data
    });
  }
};