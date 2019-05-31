const getStaticFile = require('../util/getStaticFile');
const userService = require('../service/userService');
const validator = require('../util/validator');
const registerPath = '/register';

module.exports = {
  initialize: app => {

    app.get(registerPath, (req, res) => {
      res.sendFile(getStaticFile('html/register.html'));
    });

    app.get(`${registerPath}/script.js`, (req, res) => {
      res.sendFile(getStaticFile('script/register.js'));
    });

    app.post(registerPath, async (req, res) => {
      let form = req.body;
      console.log(form);

      // validate form
      let error = validator.validateRegisterForm(form);
      if (error) {
        res.status(500).send(error);
        return;
      }

      // if username hasnt been taken yet
      if (await userService.isUsernameFree(form.username)) {
        userService.createUser(form).then(user => {
          console.log(`User with id ${user.id} created`);
          res.send('Success');
        })
        .catch(error => {
          console.error(error);
          res.status(500).send('Failed to create user');
          return;
        });
      }
      else {
        res.status(500).send('Username is already taken');
        return;
      }
    });
  }
}
