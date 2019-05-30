const bcrypt = require('bcrypt');

module.exports = {
  hashPassword: async password => {
    let saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  },

  matchPassword: async (password, hash) => {
    return await bcrypt.compare(password, hash);
  }
}
