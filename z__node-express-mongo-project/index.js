var express = require('express');
var http = require('http');
var path = require('path');
var server, app;
var port = process.env.PORT || 3000;

app = express();
app.set('port', port );

// Jade
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.set('myCustomStatus', true);

console.log( "myCustomStatus: " + app.get('myCustomStatus') )

// app.set('view cache', true);

// bodyParser
app.use(express.bodyParser());

// static

app.use( express.static(path.join(__dirname, 'public')) );
//app.use(express.static('public'));

// to use PUT o DELETE methods
var methodOverride = require('method-override')
app.use( methodOverride('_method') );

app.use( express.cookieParser() );

app.use( express.session({ secret: 'esto es secreto'}) );

var counterIndex = 0;

app.get('/', function (request, response, next) {
    counterIndex++;
    console.log("index has been visited " + counterIndex + " times");
    next();
});


app.get('/', function(request, response) {
		//response.send('¡Hola, Express!');
		// console.log ( request.get('user-agent') );
		// console.log ( request.accepted );
		// console.log ( request.acceptsCharset('utf-8') ? 'yes' : 'no' );
		// console.log ( request.acceptedLanguages );
		response.render('index', {
				title: '¡Hola, Express!',
				username: 'oscar'
		});
});

app.get('/count', function (request, response) {
    response.send("" + counterIndex + " visits");
});

app.get('/users/:userName', function(request, response) {
		var name = request.params.userName;
		response.send('¡Hola, ' + name + '!');
});

app.post('/users', function(request, response) {
		var username = request.body.username;
		response.send('¡Hola, ' + username + '!');
});

app.get("/a", function(request, response) {
  response.send(403, 'prohibido el acceso 😎');
});

app.get("/to-pixelovers", function(request, response) {
  response.redirect('http://pixelovers.com');
});

app.get("/data", function(request, response) {
  // response.json({ message: '¡hola!'});
  response.format({
    html: function() { response.send('<h1> Hola </h1>'); },
    json: function() { response.json({ message: "Hola" }) },
    text: function() { response.send("hola") },
  });
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

var authors = ["Alberto", "Carlos", "Jonathan", "Oscar", "Ramses", "Ricardo"];

app.get('/authors/:from-:to', function (request, response) {
	console.log("authors...")
    var from = parseInt(request.params.from, 10),
         to   = parseInt(request.params.to, 10);
    response.json(authors.slice(from, to + 1));

});

app.param('from', function (request, response, next, from) {
    request.from = parseInt(from, 10);
    next();
});

app.param('to', function (request, response, next, to) {
    request.to = parseInt(to, 10);
    next();
});

app.get('/authors2/:from-:to', function (request, response) {
    response.json(authors.slice(request.from, request.to + 1));
});

function userAtIndex (request, response, next) {
    request.author = authors[parseInt(request.params.authorId, 10)];
    next();
};

app.get("/users2/:authorId", userAtIndex, function (request, response) {
    response.json(request.author);
});

app.get('/name3/:name', function(req, res) {

	res.cookie('location', 'barcelona', {
		expires: new Date(Date.now() + 900000)
	});

  res.cookie('name', req.params.name)
  	.send('<p>Vea el valor del cookie <a href="/name">aquí</a></p>');
  	// to see it in the browser => document.cookie
});

app.get('/name3', function (req, res) {
	if (req.cookies.name)
  	res.send(req.cookies.name);
 	else
 		res.send("no cookie 'name'");
});

app.get('/clearName3', function (req, res) {
  res
  	.clearCookie('name')
  	.send("cookie 'name' cleaned")

});

app.get('/name4/:name', function(req, res) {
  req.session.name = req.params.name;
  res.send('<p>Vea el valor de esta sesión <a href="/name">aquí</a></p>');
});


app.get('/name4', function (req, res) {
  res.send(req.session.name);
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

