'use strict'
const express = require('express'); 
const app = express(express.json());              
const port = process.env.PORT||3000;                  
const passport = require('passport');
var session = require('express-session');
var flash = require('express-flash');
    
require('dotenv').config();
require('./passport');
const appRouter = require('./routes');

app.use(express.static('public'))

//Templating Engines
app.set('views', './views/routes');
app.set('view engine', 'ejs');

app.use(flash());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

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

app.use('/',appRouter);
app.use('/main',appRouter);
app.use('/error',appRouter);
app.use('/end',appRouter);

app.listen(port, () => {            
    console.log(`Now listening on port: ${port}`); 
});

//check if ang user na i attempt i block kay blocked na daan
//optimize everything with async-await if applicable sa program
//bootstrap ejs files kay wth ui
//choices para sa block function - done
//delete useless dependencies
//improve code kay jisas wala ko kasabot na - somehow done idk?
//security implementation
//logout function