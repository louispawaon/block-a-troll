'use strict'

const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;

passport.serializeUser(function(user, callback) {
    callback(null, user);
})

passport.deserializeUser(function(obj, callback) {
    callback(null, obj);
})
