const PropertiesReader = require('properties-reader');
const dbProperties = PropertiesReader('resources/database.properties');

module.exports = {
  getDbProperty: (prop) => dbProperties.get(prop)
}
