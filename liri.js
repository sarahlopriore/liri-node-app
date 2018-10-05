require("dotenv").config();

var Spotify = require("node-spotify-api");

var request = require("request");

var moment = require("moment");


var spotify = new Spotify(keys.spotify);




var arg1 = process.argv[2];
var arg2 = process.argv[3];

var method = function(arg1) {

}