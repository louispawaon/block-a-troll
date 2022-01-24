const express = require('express'); 
const app = express(express.json());              
const port = 3000;                  
const twit = require('twit');
const passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var session = require('express-session');



const http = require('http');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')

require('dotenv').config();

//var authenticate = require('./public/routes/auth.js');
//var index = require('./public/routes/index.ejs');

app.set('views', './views/routes');
app.set('view-engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

passport.use(new Strategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://localhost:3000/twitter/return'
}, function(token, tokenSecret, profile, callback) {
    return callback(null, profile);
}));

passport.serializeUser(function(user, callback) {
    callback(null, user);
})

passport.deserializeUser(function(obj, callback) {
    callback(null, obj);
})

var T = new twit({
    consumer_key:process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:process.env.TWITTER_CONSUMER_SECRET,
    access_token:process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret:process.env.TWITTER_ACCESS_SECRET,
    client_id:process.env.TWITTER_CLIENT_ID,
    client_secret:process.env.TWITTER_CLIENT_SECRET
});

app.use(session({secret: 'whatever', resave: true, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())


app.get('/', (req, res) => res.render('index.ejs'));

app.get('/twitter/login', passport.authenticate('twitter'))

app.get('/twitter/return', passport.authenticate('twitter', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('/')
})

app.listen(port, () => {            
    console.log("Now listening on port: ${port}"); 
});

