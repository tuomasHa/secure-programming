$( document ).ready(function() {
  getUserInfo(function(user) {
    updateName(user);
  });
});

var getUserInfo = function(callback) {
  $.ajax({
    url: '/user',
    type: 'GET',
    success: function (result) {
      callback(result);
    },
    error: function (xhr, ajaxOptions, thrownError) {
      alert(`Error getting user information. \
Server responded with ${thrownError} (${xhr.status}) - ${xhr.responseText}`);
    }
  });
}

var updateName = function(user) {
  var str = '';
  if (user.firstName) {
    str += user.firstName + ' ';
  }
  str += user.lastName || '';
  if (str) {
    $("#userInfo .name").text(str);
    if (user.username) {
      $("#userInfo .username").text(user.username);
    }
  }
  else {
    if (user.username) {
      $("#userInfo .name").text(user.username);
    }
  }
}
