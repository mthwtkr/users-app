from .base import BaseModel, db

class User(BaseModel, db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(80), nullable=False)
	email = db.Column(db.String(120), unique=True, nullable=False, index=True)

	@staticmethod
	def all(order=''):
		if order != '': return User.query.order_by(order).all()

		return User.query.all()

	@staticmethod
	def currentUser():
		return User.query.order_by('id').first()

	def __repr__(self):
		return f'<User {self.id}: {self.name}>'