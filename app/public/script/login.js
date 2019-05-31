$( document ).ready(function() {
  var loginForm = $("#loginForm");
  loginForm.on("submit", function( event ) {
    event.preventDefault();
    var form = formToObject(loginForm.serialize());
    loginForm.addClass('was-validated');
    var postCallback = function (result) {
      console.log(result);
      //redirect to front page
      window.location.href = '../';
    }
    postJson('/login', form, postCallback);
  });
});

var formToObject = function(string) {
  var object = {};
  var fields = string.split('&');
  for(i = 0; i < fields.length; i++) {
    var vals = fields[i].split('=');
    object[vals[0]] = vals[1] || '';
  }
  return object;
}

var postJson = function(url, object, callback) {
  $.ajax({
    url: url,
    type: 'POST',
    data: JSON.stringify(object),
    contentType: 'application/json',
    success: function (result) {
      callback(result);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(`Server responded with ${thrownError} (${xhr.status}) - ${xhr.responseText}`)
    }
  });
}
