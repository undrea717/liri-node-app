
var twitterKey = require('./keys.js');

var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var Spotify = require('node-spotify-api');


var fs = require('fs');

var nodeArgv = process.argv;
var command = process.argv[2];

var title = "";


for (var i=3; i<nodeArgv.length; i++){
  if(i>3 && i<nodeArgv.length){
    title = title + "+" + nodeArgv[i];
 }
 else{
    title = title + nodeArgv[i];
  }
}

switch(command){
  case "my-tweets":
    myTweets();
  break;

  case "spotify-this-song":
    mySpotify();
    break;

  case "movie-this":
    movieThis();
  break;

  case "do-what-it-says":
    doWhatItSays();
  break;

  default:
    console.log("{Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says}");
  break;
}

function myTweets(){

	var client = twitterKey
 
// var client = new Twitter({
// 		consumer_key: twitterKeys.consumer_key,
// 		consumer_secret: twitterKeys.consumer_secret,
// 		access_token_key: twitterKeys.access_token_key,
// 		access_token_secret: twitterKeys.access_token_secret
// 	});

	 
	var params = {screen_name: 'drea_aka_ferbs'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log("this is your" + Twitter);
	  }
	      else{
      console.log('Error occurred.');
    }
	});


}


function mySpotify(song){

		var spotify = new Spotify({
	  	id: "e264086c9c0e4ce0bf7c359cefcb2e79",
	  	secret: "6d8d899f53ac411cba3ac05722d207cc"
		});

  spotify.search({ type: 'track', query: title}, function(error, data){
    if(!error){
    		console.log(data);
   			console.log("Artist: " + data.tracks.items[0].artists[0].name);
	        console.log("Song: " + data.tracks.items[0].name);
	        console.log("Album: " + data.tracks.items[0].album.name);
	        console.log("Preview Here: " + data.tracks.items[0].preview_url);

        }
    else{
      console.log('Error occurred.');
    }
  });
}

function movieThis(movie){
  var omdbURL = 'http://www.omdbapi.com/?t=' + title + '&plot=short&tomatoes=true';

  request(omdbURL, function (error, response, body){
    if(!error){
      var body = JSON.parse(body);

      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
     
    } else{
      console.log('Error occurred.')
    }
    
  });

}

function doWhatItSays(){
  fs.readFile('random.txt', "utf8", function(error, data){
	 if (error) {
    	return console.log(error);
  }

	var dataArr = data.split(',');

    mySpotify(dataArr[1]);
  });

}


