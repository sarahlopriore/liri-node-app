require("dotenv").config();

var Spotify = require("node-spotify-api");

var request = require("request");

var moment = require("moment");


// var spotify = new Spotify(keys.spotify);




var type = process.argv[2];
var search = process.argv.slice(3).join(" ");


if (type === "concert-this") {
    var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";

    // request(queryUrl, function(error, response, body) {
    //     if (!error && response.statusCode === 200) {
    //         // for (i = 0; i < response.length; i++) {
    //         //     console.log((response[i]));
    //         // }
    //         console.log(JSON.parse(body).offers);
    //     } else {
    //         console.log(error);
    //     }
    // })
} else if (type === "spotify-this-song") {
    
    // spotify.search({type: track, query: search}, function(err, data) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         console.log(data);
    //     }
    // })
} else if (type === "movie-this") {
    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy"
    
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(JSON.parse(body).Title);
            console.log(JSON.parse(body).Year);
            console.log(JSON.parse(body).imdbRating);
            console.log(JSON.parse(body).Ratings[1].Value);
            console.log(JSON.parse(body).Country);
            console.log(JSON.parse(body).Language);
            console.log(JSON.parse(body).Plot);
            console.log(JSON.parse(body).Actors);
        } else {
            console.log(error);
        }
    })
} else if (type === "do-what-it-says") {
    
} else {
    console.log("some error message");
};




