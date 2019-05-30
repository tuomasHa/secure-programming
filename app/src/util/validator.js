const containsLettersAndNumbers = /([a-zA-Z]+[\d]+)|([\d]+[a-zA-Z]+)/;
const containsSpecialChars = /[\W]+/;

module.exports = {
  validateRegisterForm: form => {
    if (!form.username || typeof form.username !== 'string') {
      return 'Missing username';
    }
    else if (form.username.match(containsSpecialChars)){
      return 'Invalid characters in username';
    }
    else if (!form.password || typeof form.password !== 'string') {
      return 'Missing password';
    }
    else if (!form.password.match(containsLettersAndNumbers)
      || form.password.length < 10) {
      return 'invalid password';
    }
    else {
      return false;
    }
  }
}
