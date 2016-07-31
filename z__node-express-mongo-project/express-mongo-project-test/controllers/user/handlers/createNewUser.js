function createNewUser(request, response) {

  var u = request.body;

  // podemos acceder a DB sin hacer
  // require porque es global
  var newUser = new db.User({
    name: u.name,
    birthdate: u.birthdate,
    isAdmin: u.isAdmin === 'on' ? true : false
  });

  var dateFormat = require('dateformat');

  console.log ( 'newUser...' )
  console.log ( newUser.name );
  console.log ( dateFormat(newUser.birthdate, "dddd, mmmm dS, yyyy, h:MM:ss TT")  );
  console.log ( 'AGE =' + newUser.age() );

  // también podía hacer `new db.User(u)`
  // porque los campos del formulario
  // tienen el mismo nombre del las
  // propiedades del modelo. Para
  // efectos demostrativos aquí cree
  // un objeto con las mismas propiedades
  // y les asigné los valores que vienen
  // del formulario.

  newUser.save(function(error, user) {
  	console.log("user created correctly...");
    if (error) response.json(error);
    response.redirect('/user');
  });

}

module.exports = createNewUser