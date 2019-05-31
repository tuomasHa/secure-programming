const PropertiesReader = require('properties-reader');
const dbProperties = PropertiesReader('resources/database.properties');
const secProperties = PropertiesReader('resources/security.properties');

module.exports = {
  getDbProperty: (prop) => dbProperties.get(prop),

  getSecurityProperty: (prop) => secProperties.get(prop)
}
