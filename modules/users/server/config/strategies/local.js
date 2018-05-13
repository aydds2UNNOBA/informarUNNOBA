'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  User = require('mongoose').model('User');

module.exports = function () {
  // Use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password'
    },
    function (username, password, done) {
      User.findOne({
        username: username
      }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user || !user.authenticate(password)) {
          return done(null, false, {
            message: 'Usuario o contraseña incorrecta'
          });
        }
        if (!user.isActive) {
          return done(null, false, {
            message: 'Usuario no activado'
          });
        }
        return done(null, user);
      });
    }
  ));
};
