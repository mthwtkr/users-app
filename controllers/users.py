from flask import render_template, request

from models.user import User

def index():
	users = User.all('id')
	current_user = User.currentUser()

	return render_template('users.html',
		users=users, 
		current_user=current_user
	)

def create():
	user = User()

	user.create(request.json)

	print(user)

	return user.as_dict(), 200

def update(id):
	if (not _authorized(int(id))):
		return {'error': 'User failed authentication check'}, 401

	user = User.query.get(int(id))

	user.update(request.json)

	print(user)
	
	return user.as_dict(), 200

def delete(id):
	if (not _authorized(int(id))):
		return {'error': 'User failed authentication check'}, 401

	user = User.query.get(int(id))

	user.delete()

	return {'msg': 'User Delete'}, 200

def _authorized(userId):
	current_user = User.currentUser()

	return userId == current_user.id