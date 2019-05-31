$( document ).ready(function() {
  var modal = $("#newChirpModal");
  var newChirpForm = $("#newChirpForm");
  var input = $("#newChirpInput");
  var sendButton = $("#newChirpModal .sendButton");

  modal.on('shown.bs.modal', function () {
    input.trigger('focus');
  });

  newChirpForm.on("submit", function( event ) {
    event.preventDefault();
    var form = formToObject(newChirpForm.serialize());
    newChirpForm.addClass('was-validated');
    var postCallback = function (result) {
      modal.hide();
      //redirect to front page
      window.location.href = '../';
    }
    postJson('/message', form, postCallback);
  });

  sendButton.click(function() {
    newChirpForm.submit();
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
