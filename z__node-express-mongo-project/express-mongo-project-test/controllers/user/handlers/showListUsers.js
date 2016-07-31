function showListUsers(request, response) {

	var _ = require('underscore');

	db
	.User
	.find()
	//.lean()
	.exec(function (error, users) {

		var extendedUsers = users.map(function(user, index) {
			var age = user.age();
			var extendedUser = user.toJSON(); // after this no more user.age()
			extendedUser.age = age;
			return extendedUser;
		})

		if (error) return res.json(error);
		return response.render('index', {
			users: extendedUsers
		});

	});

}

module.exports = showListUsers;