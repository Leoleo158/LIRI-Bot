require("dotenv").config();
//Add the code required to import the keys.js file and store it in a variable.
var keys = require("./keys");
var axios = require("axios");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret,
});
// var defaultSong = require("The Sign");
var defaultMovie = "Mr. Nobody";
// var spotify = new Spotify(keys.spotify);

/**
 * Name of the venue
Venue location
Date of the Event (use moment to format this as "MM/DD/YYYY")
 */
var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  case "concert-this":
    getBands(value)
    break;
  case "spotify-this-song":
    //If user has not specified a song , use default
    // if (value === "") {
    //   value = defaultSong;

    getSongs(value)
    break;
  case "movie-this":
    //If user has not specified a movie , use default
    if (value == "") {
      value = defaultMovie;
    }
    getMovies(value)
    break;
  case "do-what-it-says":
    doWhatItSays()
    break;
  default:
    break;
}

function getBands(artist) {
    // var artist = value;
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
      .then(function (response) {
        console.log("Name of the venue:", response.data[0].venue.name);
        console.log("Venue location:", response.data[0].venue.city);
        var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
        console.log("Date of the Event:", eventDate);
      })
      .catch(function (error) {
        console.log(error);
      });
  }