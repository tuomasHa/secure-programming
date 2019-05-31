const Message = require('../model/message');

module.exports = {
  
  createMessage: (text, user) => {
    return Message.create({ text, userId: user.id });
  },

  countMessagesForUser:  user => {
    return Message.count({
      where: {
        userId: user.id
      }
    });
  },

  getMessagesForUser: user => {
    return Message.findAll({
      where: {
        userId: user.id
      }
    });
  }
}
