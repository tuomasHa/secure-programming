const User = require('../model/user');
const passwordService = require('./passwordService');

module.exports = {
  isUsernameFree: async username => {
    let count = await User.count({
      where: {
        username
      }
    });
    return count == 0;
  },

  createUser: async form => {
    let { username, firstName, lastName, password } = form;
    let hash = await passwordService.hashPassword(password);
    console.log(typeof hash, hash.length);
    return User.create({username, firstName, lastName, password: hash });
  }
}
