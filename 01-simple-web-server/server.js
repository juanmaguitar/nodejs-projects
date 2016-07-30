"use strict";

const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');

const mimeTypes = {
	"html" : "text/html",
	"jpeg" : "image/jpeg",
	"jpg" : "image/jpg",
	"png" : "image/png",
	"js" : "text/js",
	"css" : "text/css"
}

http.createServer(function(req, res){

	var uri = url.parse(req.url).pathname;
	var fileName = path.join( process.cwd(), unescape(uri) );
	var stats;

	try {
		stats = fs.lstatSync(fileName);
	}
	catch(e) {
		res.writeHead(404, {'Content-type' : 'text/plain'});
		res.write('404 Not Found\n');
		res.end();
		return;
	}

	if ( stats.isFile() ) {
		let extensionType = path.extname(fileName).split(".").reverse()[0];
		let mimeType = mimeTypes[extensionType];
		res.writeHead(200, {'Content-type' : mimeType});

		let fileStream = fs.createReadStream(fileName);
		fileStream.pipe(res);
	}
	else if ( stats.isDirectory() ) {
		res.writeHead(302, {
			'Location' : 'index.html'
		});
		res.end();
	}
	else {
		res.writeHead(500, {'Content-type' : 'text/plain'});
		res.write('500 Internal Error\n');
		res.end();
	}
}).listen(1337);