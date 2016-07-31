function updateUser(request, response) {

	var user = request.body,
			userId = request.params.id;

	delete user._id;

	db.User
		.findByIdAndUpdate(userId, user, function (error, users) {
			if (error) return response.json(error);
			response.redirect('/user');
		});

}

module.exports = updateUser;