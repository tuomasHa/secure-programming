const Sequelize = require('sequelize');
const database = require('../database');
const User = require('./user');

const Message = database.getConnection().define('message', {
  text: {
    type: Sequelize.STRING(2500),
    allowNull: false
  }
});

Message.belongsTo(User);

Message.sync()
    .then(() => {
      console.log('Model "Message" created in the database.');
    })
    .catch(err => {
      console.error('Creating model "Message" to database failed: ', err);
    });

module.exports = Message;
