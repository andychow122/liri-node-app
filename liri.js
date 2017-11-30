var keys = require('./keys.js');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var fs = require('fs');
var request = require('request');

//access to spotify api
var spotifyClientID = '0b619ccd30fb433da8ed7e8976d4662d';
var spotifyClientSecret = '4636400cd3eb4f0c8a6c000091a85057';

var command = process.argv[2];
var target = process.argv[3];

//Twitter
var twitterCall = function() {

	var client = new Twitter(keys.twitterKeys);
	 
	var params = {screen_name: 'ac_cbc'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	console.log("TWITTER CALL" + "\n-----------------------")
	  	for (var i = 0; i < tweets.length; i++)
	    {
	    	if (i < 20) {
	    	console.log(tweets[i].created_at);
	    	console.log(tweets[i].text);
	    	console.log(" ");
	    	} else {return}
	    }
	  }
	});

}

var spotifyCall = function() {

	 if (target === undefined || target === " "){
	            target = "Never Gonna Give You Up";
	        } else{
	                target = process.argv[3] 
	            }
 
	var spotify = new Spotify({
	  id: spotifyClientID,
	  secret: spotifyClientSecret
	});
	 
	spotify.search({ type: 'track', query: target }, function(err, data) {
	  if (err) {
	    return
	    	  }
	 
	// console.log(data); 
	//Handle Data
        var albumTrack = data.tracks.items;
		console.log("SPOTIFY CALL" + "\n----------------------")
        for (i=0; i < albumTrack.length; i++){

        console.log("Artist: " + albumTrack[i].artists[i].name);
        console.log("Album Title: " + albumTrack[i].album.name);
        console.log("Spotify Link: " + albumTrack[i].preview_url);
        console.log("Track Title: " + albumTrack[i].name);
        }
	});
}

var movieCall = function() {

	if (process.argv[3] === undefined || process.argv[3] === "") {
		target = "Mr. Nobody"
	}
	else {
	
		target = process.argv[3];

	}

		var queryUrl = "http://www.omdbapi.com/?t=" + target + "&y=&plot=short&apikey=trilogy";
	
		request(queryUrl, function(error, response, body){
	
	 	 if (!error && response.statusCode === 200){
			// * Title of the movie.
		   // * Year the movie came out.
		   // * IMDB Rating of the movie.
		   // * Rotten Tomatoes Rating of the movie.
		   // * Country where the movie was produced.
		   // * Language of the movie.
		   // * Plot of the movie.
		   // * Actors in the movie.
	  	console.log("Released: " + JSON.parse(body).Year);
	 	 }
		})
}

var randomCall = function() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error);
		}

		// console.log(data);

		var dataArr = data.split(",");

		// console.log(dataArr);
		// for (var i = 0; i < dataArr.length; i++) {
		// 	console.log(dataArr[i]);
		// }
		target = dataArr[1]; console.log(target);
		// spotifyCall();

	})
}

switch(command) {
	case "my-tweets":
		twitterCall();
		break;

	case "spotify-this-song":
		spotifyCall();
		break;

	case "movie-this":
		movieCall();
		break;

	case "do-what-it-says":
		randomCall();
		break;

	default:
		console.log("LIRI DOES NOT COMPUTE");
}