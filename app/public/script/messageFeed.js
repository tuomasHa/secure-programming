$( document ).ready(function() {
  var messageContainer = $("#messageFeed .messageContainer");
  getAllMessages(function(messages) {
    for (var i = 0; i < messages.length; i++) {
      var name = messages[i].name;
      var text = messages[i].text;
      messageContainer.append(generateMessage(name, text));
    }
  });
});

var getAllMessages = function(callback) {
  $.ajax({
    url: '/message/all',
    type: 'GET',
    success: function (result) {
      callback(result);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(`Error getting messages. \
Server responded with ${thrownError} (${xhr.status}) - ${xhr.responseText}`);
    }
  });
}

var generateMessage = function(name, text) {
  var message = $("<div class='feedMessage'></div>");
  message.append(
    $("<span class='messageName'>" + name + ":&nbsp</span>"),
    $("<span class='messageText'>" + decodeURIComponent(text) + "</span>")
  );
  return message;
}
