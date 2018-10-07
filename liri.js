require("dotenv").config();

var Spotify = require("node-spotify-api");

var request = require("request");

var moment = require("moment");


// var spotify = new Spotify(keys.spotify);




var type = process.argv[2];
var search = process.argv.slice(3).join(" ");


if (type === "concert-this") {
    var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";

    request(queryUrl, function(error, response, body, ) {
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            for (i = 0; i < data.length; i++) {
                console.log("\nVenue: " + data[i].venue.name);
                console.log("Location: " + data[i].venue.city + ", " + data[i].venue.region);
                var date = moment(data[i].datetime).format("MM/DD/YYYY")
                console.log("Date: " + date);
            }
        } else {
            console.log(error);
        }
    })
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
            console.log("\nTitle: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        } else {
            console.log(error);
        }
    })
} else if (type === "do-what-it-says") {
    
} else {
    console.log("some error message");
};




