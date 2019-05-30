const getStaticFile = require('../util/getStaticFile');
const indexPath = '/';

module.exports = {
  initialize: app => {

    app.get(indexPath, (req, res) => {

      res.sendFile(getStaticFile('html/index.html'));
    });
  }
}
