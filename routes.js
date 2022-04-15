'use strict'
const express = require('express');
const appRouter = express.Router();
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;

const {Twitter,BlockUser,BlockMass} = require('./twitter');

appRouter.use(express.json());
appRouter.use(express.urlencoded({extended: false}));

//GET Routes
appRouter.get('/', (req, res) => res.render('index'));
appRouter.get('/main', function(req, res){
        res.render(('main'),{username: req.user.username});
});

appRouter.get('/error', (req, res) => res.render('error'));
appRouter.get('*', (req, res) => res.render('error'));
appRouter.get('/end', (req, res) => res.render('end'));

//POST ROUTES
passport.use(new Strategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://127.0.0.1:3000/twitter/return'
}, function(token, tokenSecret, profile, callback) {
    const config={
        consumer_key:process.env.TWITTER_CONSUMER_KEY,
        consumer_secret:process.env.TWITTER_CONSUMER_SECRET,
        access_token:process.env.TWITTER_ACCESS_TOKEN,
        access_token_secret:process.env.TWITTER_ACCESS_SECRET,
        client_id:process.env.TWITTER_CLIENT_ID,
        client_secret:process.env.TWITTER_CLIENT_SECRET
    };

    const twit = new Twitter(config);
    twit.setConfig(config);

    appRouter.post('/block', async function(req, res){
        const account= await(req.body.account);
        const blockUser = new BlockUser(config,account);
        blockUser.getUser(account);
        res.redirect('/end');
    });

    appRouter.post('/blockMass', async function(req, res){
        const hashtag=await(req.body.hashtag);
        const blockMass = new BlockMass(config,hashtag);
        blockMass.getHashtag(hashtag);
        res.redirect('/end');
    });
    return callback(null, profile);

}));

module.exports=appRouter;
