const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const getStaticFile = require('../util/getStaticFile');
const userService = require('../service/userService');
const validator = require('../util/validator');
const loginPath = '/login';
const logoutPath = '/logout';

module.exports = {
  initialize: app => {

    passport.use(new LocalStrategy(
      (username, password, done) => {
        userService.loginUser(username, password)
          .then(user => {
            if (user) {
              console.log('user found')
              done(null, user);
            }
            else {
              console.log('user not found')
              done(null, false, {message: 'Invalid username or password'});
            }
          })
          .catch(error => {
            console.log(error);
            done(null, false, {message: 'Unknown error'});
          });
      }));

      passport.serializeUser((user, done) => {
        done(null, user.id);
      });

      passport.deserializeUser((id, done) => {
        userService.getById(id).then(user => {
          done(null, user);
        })
        .catch(err => {
          done(err, null);
        });
      });

    app.get(loginPath, (req, res) => {
      if (req.user) {
        res.redirect('/');
      }
      else {
        res.sendFile(getStaticFile('html/login.html'));
      }
    });

    app.get(`${loginPath}/script.js`, (req, res) => {
      res.sendFile(getStaticFile('script/login.js'));
    });

    app.post(loginPath,
      passport.authenticate('local'),
      (req, res) => {
        res.send(req.user.username);
    });

    app.get(logoutPath, (req, res) => {
      req.logout();
      res.redirect('/');
    });
  }
}
