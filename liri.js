require("dotenv").config();

//require all APIs needed
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

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
            //console.log(songInfo);
            var songResult =
                console.log("Artist: " + songInfo.artists[0].name)
            console.log("Song Name: " + songInfo.name)
            console.log("Preview Link: " + songInfo.preview_url)
            console.log("Album: " + songInfo.album.name);
        };
    });
};

var getFlicks = function () {

    // Grab or assemble the movie name and store it in a variable called "movieName"
    var movieName = process.argv.slice(3).join(" ");
    //console.log(movieName);

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // debug against the actual URL.
    //console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMBD Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
};

var getData = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }

        // We will then print the contents of data
        //console.log(data);

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        //console.log(dataArr);

        dataArr.slice(1).forEach(function (things, index, arr) {
            console.log(things);
        })

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
if (userInput === 'movie-this') {
    getFlicks();
};
if (userInput === 'do-what-it-says') {
    getData();
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