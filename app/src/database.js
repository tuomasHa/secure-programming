const Sequelize = require('sequelize');

let connection;

// initializes the connection
const initialize = () => {
  connection = new Sequelize('placeholder', 'placeholder', 'placeholder', {
    host: 'database',
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
