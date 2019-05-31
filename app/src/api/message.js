const escapeHtml = require('escape-html');
const messageService = require('../service/messageService');
const userService = require('../service/userService');
const validator = require('../util/validator');
const messagePath = '/message';

module.exports = {
  initialize: app => {

    app.post(messagePath, async (req, res) => {
      if (req.user) {
        let form = req.body;
        console.log(form);
        let text = escapeHtml(form.text);
        console.log(text)

        // validate form
        let error = validator.validateMessageForm(text);
        if (error) {
          res.status(500).send(error);
          return;
        }

        messageService.createMessage(text, req.user).then(message => {
          console.log(`Message for user with id ${req.user.id} created`);
          res.send('Success');
        })
        .catch(error => {
          console.error(error);
          res.status(500).send('Failed to create message');
        });
      }
      else {
        res.redirect('/');
      }

    });

    app.get(`${messagePath}/count`, (req, res) => {
      if (req.user) {
        messageService.countMessagesForUser(req.user)
          .then(count => {
            res.send(count.toString());
          })
          .catch(err => {
            console.error(error);
            res.status(500).send('Failed to count messages');
          })
      }
      else {
        res.redirect('/');
      }
    });

    app.get(`${messagePath}/all`, async (req, res) => {
      if (req.user) {
        messageService.getMessages()
          .then(async messages => {
            console.log(messages);
            let processed = [];
            for (let i = 0; i < messages.length; i++) {
              let j = i;
              let m = messages[j];
              let user = await userService.getById(m.userId);
              processed[j] = {text: m.text, name: user.username};
            }
            console.log(processed)
            res.json(processed.reverse());
          })
          .catch(err => {
            console.error(err);
            res.status(500).send('Failed to get messages');
          });
      }
      else {
        res.redirect('/');
      }
    });
  }
}
