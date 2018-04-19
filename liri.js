require("dotenv").config();

var keys = require("./keys");
console.log(keys);

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
