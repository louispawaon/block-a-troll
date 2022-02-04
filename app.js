const express = require('express'); 
const app = express(express.json());              
const port = 3000;                  
const passport = require('passport');
var session = require('express-session');

const axios = require('axios');
const http = require('http');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')

require('dotenv').config();
require('./passport')

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

//POST Routes
app.post('/block', function(req, res){
    const account=req.body.account;
    getUser(account);
    res.redirect('/end');
});

app.post('/blockMass', function(req, res){
    const hashtag=req.body.hashtag;
    getHashtag(hashtag);
    res.redirect('/end');
});

//For blocking specific user


app.listen(port, () => {            
    console.log(`Now listening on port: ${port}`); 
});

//check if ang user na i attempt i block kay blocked na daan
//optimize everything with async-await if applicable sa program
//bootstrap ejs files kay wth ui
//choices para sa block function
//delete useless dependencies