const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');
const indexApi = require('./api/index');
const registerApi = require('./api/register');


const app = express();
const connection = database.getConnection();

app.use(bodyParser.json());
indexApi.initialize(app);
registerApi.initialize(app);

app.listen(8080);
