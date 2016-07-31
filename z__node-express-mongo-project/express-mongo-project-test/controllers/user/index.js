var express = require('express');
var app = module.exports = express();
require('../../models')

app.set('views', __dirname + '/views');


app.get('/user/edit/:id', require('./handlers/showFormEditUser.js') );
app.put('/user/:id', require('./handlers/updateUser.js') );

app.get('/user/new', require('./handlers/showFormNewUser.js') );

app.get('/user', require('./handlers/showListUsers.js') );
app.post('/user', require('./handlers/createNewUser.js'));

app.get('/user/delete/:id', require('./handlers/deleteUser.js') );