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
    return User.create({username, firstName, lastName, password: hash });
  },

  loginUser: async (username, password) => {
    let user = await User.findOne({
      where: {
        username
      }
    });
    return user && await passwordService.matchPassword(password, user.password) ?
      user : undefined;
  },

  getById: async id => {
    return await User.findOne({
      where: {
        id
      }
    });
  }
}
