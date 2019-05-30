const Sequelize = require('sequelize');
const database = require('../database');

const User = database.getConnection().define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.sync()
    .then(() => {
      console.log('Model "User" created in the database.');
    })
    .catch(err => {
      console.error('Creating model "User" to database failed: ', err);
    });

module.exports = User;
