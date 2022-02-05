'use strict'
const express = require('express'); 
const app = express(express.json());              
const port = 3000;                  
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
var session = require('express-session');

const axios = require('axios');
const http = require('http');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./passport');
const {Twitter,BlockUser,BlockMass} = require('./twitter');

app.set('views', './views/routes');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Session Creator
app.use(session({secret: 'whatever', resave: true, saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())

//Twitter Authentication
app.get('/twitter/login', passport.authenticate('twitter'));
app.get('/twitter/return', passport.authenticate('twitter', {
    failureRedirect: '/error'
}), function(req, res) {
    res.redirect('/main');
});

//GET Routes
app.get('/', (req, res) => res.render('index'));

app.get('/main', function(req, res){
    if(!req.user){
        res.redirect('/error');
        return;
    }
    else{
        res.render(('main'),{username: req.user.username});
    }
});

app.get('/error', (req, res) => res.render('error'));
app.get('/end', (req, res) => res.render('end'));

//POST ROUTES - temporary idk im still learning
passport.use(new Strategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://127.0.0.1:3000/twitter/return'
}, function(token, tokenSecret, profile, callback) {
     const config={
        consumer_key:process.env.TWITTER_CONSUMER_KEY,
        consumer_secret:process.env.TWITTER_CONSUMER_SECRET,
        access_token:token,
        access_token_secret:tokenSecret,
        client_id:process.env.TWITTER_CLIENT_ID,
        client_secret:process.env.TWITTER_CLIENT_SECRET
    };

    const twit = new Twitter(config);
    twit.setConfig(config);

    app.post('/block', function(req, res){
        const account=req.body.account;
        const blockUser = new BlockUser(config,account);
        blockUser.getUser(account);
        res.redirect('/end');
    });

    app.post('/blockMass', function(req, res){
        const hashtag=req.body.hashtag;
        const blockMass = new BlockMass(config,hashtag);
        blockMass.getHashtag(hashtag);
        res.redirect('/end');
    });
    return callback(null, profile);

}));

app.listen(port, () => {            
    console.log(`Now listening on port: ${port}`); 
});

//check if ang user na i attempt i block kay blocked na daan
//optimize everything with async-await if applicable sa program
//bootstrap ejs files kay wth ui
//choices para sa block function
//delete useless dependencies
//improve code kay jisas wala ko kasabot na 