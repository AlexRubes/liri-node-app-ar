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
                var tweetsData =
                console.log(tweets[i].text)
                console.log(tweets[i].created_at);

                log(tweetsData);
            }
        }
    });
};



function getJam(params) {

    var spotify = new Spotify(keys.spotify);

    if (!params) {
        params = 'Levels'

    }

    spotify.search({ type: 'track', query: params }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;  //from spotify npm docs
        }
        else {
            var songInfo = data.tracks.items[0];
            var songResult =
            "-------------------------------------------------------------------" + "\r\n" +
            "Artist: " + songInfo.artists[0].name + "\r\n" +
            "Song Name: " + songInfo.name + "\r\n" +
            "Preview Link: " + songInfo.preview_url + "\r\n" +
            "Album: " + songInfo.album.name + "\r\n" +
            "-------------------------------------------------------------------" + "\r\n";
            console.log(songResult);
            log(songResult);
        }
    });

};

function getFlicks(movieName) {

    // Grab or assemble the movie name and store it in a variable called "movieName"
    

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
            "-------------------------------------------------------------------" + "\r\n" +
            "Movie Title: " + JSON.parse(body).Title + "\r\n" +
            "Release Year: " + JSON.parse(body).Year + "\r\n" +
            "IMBD Rating: " + JSON.parse(body).imdbRating + "\r\n" +
            "Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value + "\r\n" +
            "Country: " + JSON.parse(body).Country + "\r\n" +
            "Language: " + JSON.parse(body).Language + "\r\n" +
            "Plot: " + JSON.parse(body).Plot + "\r\n" +
            "Actors: " + JSON.parse(body).Actors + "\r\n" +
            "-------------------------------------------------------------------" + "\r\n";
            console.log(movieResults);
            log(movieResults);
        }
    });
};

function getData() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        if (!error) {
            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");
            console.log(dataArr[0]);
            getJam(dataArr[1]);
            //getJam(dataArr[0], dataArr[1]);
        } else {
            // If the code experiences any errors it will log the error to the console.
            console.log("Error occurred:" + error);
        }

    });
};

function log(logResults) {
    fs.appendFile("log.txt", logResults, function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
  };

//create events
var userInput = process.argv[2];

if (userInput === 'my-tweets') {
    getTweets();
}
if (userInput === 'spotify-this-song') {
    let songInputOne = process.argv.slice(3).join(" ");
    getJam(songInputOne);
}
if (userInput === 'movie-this') {
    let movieTitle = process.argv.slice(3).join(" ");
    getFlicks(movieTitle);
}
if (userInput === 'do-what-it-says') {
    getData();
}


