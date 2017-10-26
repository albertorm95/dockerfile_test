const fs = require('fs');
const https = require('https');



var array = []
var endpoint = "https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=" + 40715006 + "&apikey=4a2179b73ebaba89b4447ed9f31235ca"

fs.readFile('songpag1.json', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }

  data = JSON.parse(data)
  for (var i = data.message.body.track_list.length - 1; i >= 0; i--) {
  	array.push(data.message.body.track_list[i].track.track_id)
  	https.get("https://api.musixmatch.com/ws/1.1/track.lyrics.get?format=jsonp&callback=callback&track_id=" + data.message.body.track_list[i].track.track_id + "&apikey=4a2179b73ebaba89b4447ed9f31235ca", (res) => {
	  //console.log('statusCode:', res.statusCode);
	  //console.log('headers:', res.headers);

	  res.on('data', (d) => {
	    process.stdout.write(d);
	    //d = JSON.stringify(d)
	    //console.log(d)
	  });

	}).on('error', (e) => {
	  //console.error(e);
	});
  }
});



