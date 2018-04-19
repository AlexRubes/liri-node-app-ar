require("dotenv").config();

//require all APIs needed
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");

//global variables 
var params = process.argv.slice(2);

//create functions to call information from each API
var getTweets = function () {
    var client = new Twitter(keys.twitter);

    var handle = {
        screen_name: "Alej_NU"
    };

    client.get('statuses/user_timeline', handle, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
            }
        }
    });
};

var getJam = function () {
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: params[1] }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;  //from spotify npm docs
        }
        else {
            var songInfo = data.tracks.items[0];
            var songResult = 
            console.log(songInfo.artists[0].name)
            console.log(songInfo.name)
            console.log(songInfo.album.name)
            console.log(songInfo.preview_url)
            console.log(songResult);
        };
    });
};

//create events
var userInput = process.argv[2];

if (userInput === 'my-tweets') {
    getTweets();
};
if (userInput === 'spotify-this-song') {
    getJam();
};


// switch(params[0]) {
//     case "my-tweets":
//       myTweets();
//       break;
//     case "spotify-this-song":
//       if(params[1]){  //if a song is put named in 4th paramater go to function
//       getJam();
//     } else {  //if blank call it blink 182's "whats my age again"
//       getJam("What\'s my age again");
//     }
//       break;