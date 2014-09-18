var express = require('express'),
	app = express(),
	path = require('path'),
	https = require('https'),
	xml2js = require('xml2js'),
	parser = new xml2js.Parser(),
	fs = require('fs');

app.configure(function(){
	app.set('views', 'views/');
    app.set('view engine', 'jade');
    app.use(express.static(path.resolve('./public')));
})	

app.get('/readDataFromRSS', function (req, res) {
	var options = {
		host : "developer.cumtd.com",
		port : 443,
		path : "/rss",
		method : "GET",
		accept : "*/*"
	}
	var req2 = https.request(options, function (res2) {
		res2.setEncoding('utf8');
		res2.on('data', function (d) {
			console.log(d);
			parser.parseString(d, function (err, result) {
				// console.log(result.rss.channel[0])
				for (var key in result.rss) {
					console.log(key, result.rss[key])
				}
				res.send(result.rss.channel[0]);
			})
		})
	})
	req2.end();
	req2.on('error', function (e) {
		console.log(e);
	})
})

app.get('/readDataFromFile', function (req, res) {
	fs.readFile('data.txt', 'utf8', function (err, data) {
		console.log(data);
		res.send(data);
	})
})

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});