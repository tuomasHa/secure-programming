const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const database = require('./database');
const properties = require('./util/properties');
const indexApi = require('./api/index');
const registerApi = require('./api/register');
const loginApi = require('./api/login');


const app = express();
const connection = database.getConnection();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
  secret: properties.getSecurityProperty('session.secret'),
}));
app.use(passport.initialize());
app.use(passport.session());

indexApi.initialize(app);
registerApi.initialize(app);
loginApi.initialize(app);

app.listen(8080);
