const http = require('http');
const express = require('express'); 
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser')
const app = express(express.json());              
const port = 3000;                  
const twit = require('twit');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({extended: false}));


var T = new twit({
    consumer_key:process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:process.env.TWITTER_CONSUMER_SECRET,
    access_token:process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret:process.env.TWITTER_ACCESS_SECRET
});

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname,'./public/index.html'));
});

app.post('/',function(req,res){
    console.log(req.body.name);
    res.send('added');
});

app.listen(port, () => {            
    console.log("Now listening on port: ${port}"); 
});

