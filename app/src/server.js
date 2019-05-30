const express = require('express');
const app = express();
const getStaticFile = require('./util/getStaticFile');
const database = require('./database');
const User = require('./model/user');

app.get('/', (req, res) => {

  // Create a new user
  /*User.create({ username: 'jdoe', firstName: 'Jane', lastName: 'Doe' }).then(jane => {
    console.log("Jane's auto-generated ID:", jane.id);
  });*/
  res.sendFile(getStaticFile('index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(getStaticFile('register.html'));
});

const connection = database.getConnection();

app.listen(8080);
