const Sequelize = require('sequelize');
const database = require('../database');

const User = database.getConnection().define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(64),
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true
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
