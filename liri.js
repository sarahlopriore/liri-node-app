require("dotenv").config();

var fs = require("fs");

var Spotify = require("node-spotify-api");

var request = require("request");

var moment = require("moment");

var keys = require("./keys");

var spotify = new Spotify(keys.spotify);


var type = process.argv[2];
var search = process.argv.slice(3).join("%20");


if (type === "concert-this") {
    var queryUrl = "https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp";

    request(queryUrl, function(error, response, body) {
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
    
    if (!search) {
        search = "the sign ace of base";
    }
    spotify.search({
            type: "track",
            query: search
        },

        function (error, data) {
            if (error) {
                console.log("Error: " + error);
            } else {
                for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
                    if (i === 0) {
                        console.log("\nArtist(s): " + data.tracks.items[0].artists[i].name);
                    } else {
                        console.log(" " + data.tracks.items[0].artists[i].name);
                    }
                }
                console.log("Song: " + data.tracks.items[0].name);
                console.log("Preview Link: " + data.tracks.items[0].preview_url);
                console.log("Album: " + data.tracks.items[0].album.name);
            }

        });

} else if (type === "movie-this") {
    if (!search) {
        search = "Mr.%20Nobody"
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + search + "&y=&plot=short&apikey=trilogy"
    
    request(queryUrl, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("\nTitle: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            for (var i = 0; i < JSON.parse(body).Ratings.length; i++) {
                if (JSON.parse(body).Ratings[i].Source === "Rotten Tomatoes") {
                    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[i].Value);
                }
            };
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        } else {
            console.log(error);
        }
    })
} else if (type === "do-what-it-says") {
    
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            console.log(error);
        } else {
            textArray = data.split(",");

            spotify.search({
                type: "track",
                query: textArray[1]
            },
    
            function (error, data) {
                if (error) {
                    console.log("Error: " + error);
                } else {
                    for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
                        if (i === 0) {
                            console.log("\nArtist(s): " + data.tracks.items[0].artists[i].name);
                        } else {
                            console.log(" " + data.tracks.items[0].artists[i].name);
                        }
                    }
                    console.log("Song: " + data.tracks.items[0].name);
                    console.log("Preview Link: " + data.tracks.items[0].preview_url);
                    console.log("Album: " + data.tracks.items[0].album.name);
                }
            });    
        }
    })
} else {
    console.log("Please use one of the following methods: concert-this, spotify-this-song, movie-this, or do-what-it-says");
};




