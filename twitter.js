const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const twit = require('twit');

passport.serializeUser(function(user, callback) {
    callback(null, user);
})

passport.deserializeUser(function(obj, callback) {
    callback(null, obj);
})

passport.use(new Strategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://127.0.0.1:3000/twitter/return'
}, function(token, tokenSecret, profile, callback) {
    
    var client = new twit({
        consumer_key:process.env.TWITTER_CONSUMER_KEY,
        consumer_secret:process.env.TWITTER_CONSUMER_SECRET,
        access_token:token,
        access_token_secret:tokenSecret,
        client_id:process.env.TWITTER_CLIENT_ID,
        client_secret:process.env.TWITTER_CLIENT_SECRET
    });

    //block a single specific user
    getUser=(account)=>{
        console.log(account);
        const params = {screen_name: account};
        //put if statements
        client.post('blocks/create', params, function(err, data, response) {
            console.log(data)
        });
    }
    
    //For blocking all users under hashtag
    getHashtag=(hashtag)=>{
        const userList=[];
        const params = {q: '#'+hashtag, count:50, result_type:'mixed'};
        client.get('search/tweets', params, function(err, data, response) {
                var userResult=JSON.stringify(data.statuses);
                var users=JSON.parse(userResult);
                users.forEach(x=>userList.push(x.user.screen_name));
                console.log(userList);
                blockMany(userList);
        });  
    }
    
    blockMany=(userList)=>{
        userList.forEach(function(x){
            const params={screen_name: x};
            //block time
            client.post('blocks/create', params, function(err, data, response) {
                console.log(data)
            });
        });  
    }

    return callback(null, profile);
}));

