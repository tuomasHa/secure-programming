const passport = require('passport');
const getStaticFile = require('../util/getStaticFile');
const indexPath = '/';
const userPath = '/user';

module.exports = {
  initialize: app => {

    app.get(indexPath, (req, res) => {
      if (req.user) {
        res.sendFile(getStaticFile('html/index.html'));
      }
      else {
        res.redirect('/login');
      }
    });

    app.get(`/userInfo.js`, (req, res) => {
      res.sendFile(getStaticFile('script/userInfo.js'));
    });

    app.get(`/newChirp.js`, (req, res) => {
      res.sendFile(getStaticFile('script/newChirp.js'));
    });

    app.get(`/index.css`, (req, res) => {
      res.sendFile(getStaticFile('style/index.css'));
    });

    app.get(`/user`, (req, res) => {
      if (req.user) {
        let { username, firstName, lastName } = req.user;
        res.json({ username, firstName, lastName });
      }
      else {
        res.redirect('/login');
      }
    });
  }
}
