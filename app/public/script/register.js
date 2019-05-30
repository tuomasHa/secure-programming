$( document ).ready(function() {
  var registerForm = $("#registerForm");
  registerForm.on("submit", function( event ) {
    event.preventDefault();
    var form = formToObject(registerForm.serialize());
    if(form.password !== form.repeatPassword) {
      console.log('Passwords don\'t match');
      var repeat = $("#registerRepeatPassword");
      repeat.addClass('is-invalid');
      repeat.popover('show');
    }
    else {
      var repeat = $("#registerRepeatPassword");
      repeat.removeClass('is-invalid');
      repeat.popover('hide');
      registerForm.addClass('was-validated');
      console.log('Submitting')

      var postCallback = function (result) {

        //redirect to front page
        window.location.href = '../';
      }
      postJson('/register', form, postCallback);
    }
  });

  $("#registerRepeatPassword").change( function(event) {
    $("#registerRepeatPassword").removeClass('is-invalid');
    $("#registerRepeatPassword").popover('dispose');
  })
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
