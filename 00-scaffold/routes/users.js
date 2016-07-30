var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.render('users', { title: 'Users' });
});

/* POST users listing. */
router.post('/', function(req, res, next) {
	console.log (req.body);
	var mail = req.body.mail;
	res.render('results', { mail: mail });
});

module.exports = router;
