const twit = require('twit');
require('./passport');
const account = require('./app');
console.log(account);

connectClient=(token,tokenSecret)=>{
//Twit API
    var client = new twit({
        consumer_key:process.env.TWITTER_CONSUMER_KEY,
        consumer_secret:process.env.TWITTER_CONSUMER_SECRET,
        access_token:token,
        access_token_secret:tokenSecret,
        client_id:process.env.TWITTER_CLIENT_ID,
        client_secret:process.env.TWITTER_CLIENT_SECRET
    });

    
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
}

