function deleteUser(request, response) {

  var userId = request.params.id;

  db.User
  .findByIdAndRemove(userId, function (error, users) {
    if (error) return response.json(error);
    response.redirect('/user');
  });

}

module.exports = deleteUser;