const Sequelize = require('sequelize');
const { getDbProperty } = require('./util/properties');

let connection;

// initializes the connection
const initialize = () => {

  // get db props from property file
  const dbHost = getDbProperty('db.host'),
    dbName = getDbProperty('db.name'),
    dbUserName = getDbProperty('db.user.name'),
    dbUserPass = getDbProperty('db.user.pass');

  connection = new Sequelize(dbName, dbUserName, dbUserPass, {
    host: dbHost,
    dialect: 'mariadb'
  });
  console.log('Connecting to database.');
  connection
    .authenticate()
    .then(() => {
      console.log('Database connection established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
};

module.exports = {
  getConnection: () => {
    if (!connection) {
      initialize();
    }
    return connection;
  }
}
