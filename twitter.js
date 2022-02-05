'use strict'

const twit = require('twit');

class Twitter{
    constructor(config){
        this.config=config;
    }
    setConfig(config){
        this.config=config;
        console.log("config2"+JSON.stringify(this.config));
    }
    getConfig(){
        return this.config;
    }
}

class BlockUser extends Twitter{
    constructor(config,account){
        super(config);
        this.account=account;
    }
    getUser(account){
        const client = new twit(this.getConfig());
        const params = {screen_name: account};
        //put if statements
        client.post('blocks/create', params, function(err, data, response) {
            console.log(data)
        });
    }
}

class BlockMass extends Twitter{
    constructor(config,hashtag){
        super(config);
        this.hashtag=hashtag;
    }
    //For blocking all users under hashtag
    getHashtag(hashtag){
        const client = new twit(this.getConfig());
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

    blockMany(userList){
        const client = new twit(this.getConfig());
        userList.forEach(function(x){
            const params={screen_name: x};
            //block time
            client.post('blocks/create', params, function(err, data, response) {
                console.log(data)
            });
        });  
    }
}

module.exports={Twitter,BlockUser,BlockMass};

//temporary pa ni dile ko sure if ma improve pa ni nako

