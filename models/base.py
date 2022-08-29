from flask_sqlalchemy import SQLAlchemy, inspect

db = SQLAlchemy()

class BaseModel():

	def _setAttrs(self, changes):
		for key, value in changes.items():
			setattr(self, key, value)

		return self

	def as_dict(self):
		return {c.key: getattr(self, c.key)
			for c in inspect(self).mapper.column_attrs}

	def create(self, values):
		self._setAttrs(values)

		db.session.add(self)
		
		return db.session.commit()

	def delete(self):

		db.session.delete(self)
		
		return db.session.commit()

	def update(self, changes):
		self._setAttrs(changes)

		return db.session.commit()

	def __repr__(self):
		return f'<{self.__class__.__name__}: {self.id}>'