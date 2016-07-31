function editUser(request, response) {

	var userId = request.params.id;
	// http://localhost:3000/user/edit/579de2a9b92eaa1083b511f3

	db.User
		.findById(userId)
		.lean()
		.exec( function (error, user) {

			var dateFormatted =  user.birthdate.getFullYear() + '-'
             + ('0' + (user.birthdate.getMonth()+1)).slice(-2) + '-'
             +  ('0' + user.birthdate.getDate()).slice(-2) ;

			user.birthdate = dateFormatted;

			if (error) return response.json(error);
			response.render('edit', user);
		});

}

module.exports = editUser;