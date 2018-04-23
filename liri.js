require("dotenv").config();

//require all APIs needed
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require("fs");

//create functions to call information from each API
var getTweets = function () {
    var client = new Twitter(keys.twitter);

    var handle = {
        screen_name: "Alej_NU"
    };

    client.get('statuses/user_timeline', handle, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                var tweets = 
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);

                log(tweets);
            }
        }
    });
};



var getJam = function (params) {
    var spotify = new Spotify(keys.spotify);

    var params = process.argv.slice(3).join(" ");


    if (!params) {
        params = 'Levels'
        console.log(params);
    }

    spotify.search({ type: 'track', query: params }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;  //from spotify npm docs
        }
        else {
            var songInfo = data.tracks.items[0];
            var songResult =
            console.log("Artist: " + songInfo.artists[0].name)
            console.log("Song Name: " + songInfo.name)
            console.log("Preview Link: " + songInfo.preview_url)
            console.log("Album: " + songInfo.album.name);

            log(songResult);
        }
    });

};

var getFlicks = function () {

    // Grab or assemble the movie name and store it in a variable called "movieName"
    var movieName = process.argv.slice(3).join(" ");

    if (!movieName) {
        movieName = "mr nobody";
        console.log("If you haven't watched Mr. Nobody, then you should. It's on Netflix!");
    }
    //console.log(movieName);

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // debug against the actual URL.
    //console.log(queryUrl);

    request(queryUrl, function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            var movieResults = 
            console.log("Movie Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMBD Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);

            log(movieResults);
        }
    });
};

var getData = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (!error) {
            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");
            getJam(dataArr[0],dataArr[1]);
        } else {
            // If the code experiences any errors it will log the error to the console.
            console.log("Error occurred:" + error);
        }

    });
};

function log(logResults) {
    fs.appendFile("log.txt", logResults, (error) => {
        if (error) {
            throw error;
        }
    });
};

//create events
var userInput = process.argv[2];

if (userInput === 'my-tweets') {
    getTweets();
}
if (userInput === 'spotify-this-song') {
    getJam();
}
if (userInput === 'movie-this') {
    getFlicks();
}
if (userInput === 'do-what-it-says') {
    getData();
}


