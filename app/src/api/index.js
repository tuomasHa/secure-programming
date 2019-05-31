const passport = require('passport');
const getStaticFile = require('../util/getStaticFile');
const indexPath = '/';

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
  }
}
