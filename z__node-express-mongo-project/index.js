var express = require('express');
var http = require('http');
var server, app;
var port = process.env.PORT || 3000;

app = express();
app.set('port', port );

// Jade
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

// bodyParser
app.use(express.bodyParser());

app.get('/', function(request, response) {
		//response.send('¡Hola, Express!');
		response.render('index', {
				title: '¡Hola, Express!',
				username: 'oscar'
		});
});

app.get('/users/:userName', function(request, response) {
		var name = request.params.userName;
		response.send('¡Hola, ' + name + '!');
});

app.post('/users', function(request, response) {
		var username = request.body.username;
		response.send('¡Hola, ' + username + '!');
});

app.get(/\/personal\/(\d*)\/?(edit)?/, function (request, response) {

		// see http://localhost:3000/personal/15
		// see http://localhost:3000/personal/15/edit

		var message = 'el perfil del empleado #' + request.params[0];
		if (request.params[1] === 'edit') {
				message = 'Editando ' + message;
		} else {
				message = 'Viendo ' + message;
		}
		response.send(message);

});

// http.createServer(app).listen(app.get('port'), function(){
//   console.log('Express server listening on port ' + app.get('port'));
// });

server = http.createServer(app);
server.listen(port);

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
	console.log(error);
}

function onListening() {
	var addr = server.address();
	var port = addr.port;
	console.log ('Listening on port ' + port);
}

