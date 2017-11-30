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

	var keys = require('./keys.js');

	var Twitter = require('twitter');

	var client = new Twitter(keys.twitterKeys);
	 
	var params = {screen_name: 'ac_cbc'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	console.log("\n-----------------------" + "\nTWITTER CALL" + "\n-----------------------");
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
        var albumTrack = data.tracks.items;
		console.log("\n-----------------------" + "\nSPOTIFY CALL" + "\n-----------------------");
				// console.log(albumTrack.length);

        for (i=0; i < albumTrack.length; i++){

        	console.log("\n-----------------------");
	        console.log(i+1);
	        console.log("Artist: " + albumTrack[i].artists[0].name);
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
	 	 	console.log("\n-----------------------" + "\nMOVIE CALL" + "\n-----------------------");
			// * Title of the movie.
		   console.log("Title: " + JSON.parse(body).Title);

		   // * Year the movie came out.
		   console.log("Released: " + JSON.parse(body).Year);
		   // * IMDB Rating of the movie.
		   console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
		   // * Rotten Tomatoes Rating of the movie.
		   console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		   // * Country where the movie was produced.
		   console.log("Produced in: " + JSON.parse(body).Country);
		   // * Language of the movie.
		   console.log("Language: " + JSON.parse(body).Language);
		   // * Plot of the movie.
		   console.log("Plot: " + JSON.parse(body).Plot);
		   // * Actors in the movie.
		   console.log("Actors: " + JSON.parse(body).Actors);
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