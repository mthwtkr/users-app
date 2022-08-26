import controllers.users as users

def routes(app):
	app.add_url_rule('/users', methods=['POST'], view_func=users.create)
	app.add_url_rule('/users', methods=['GET'], view_func=users.index)
	app.add_url_rule('/users/<id>', methods=['PUT'], view_func=users.update)
	app.add_url_rule('/users/<id>', methods=['DELETE'], view_func=users.delete)