from flask_sqlalchemy import SQLAlchemy, inspect

def initialize_db(app):
	app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/postgres'
	app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

	return SQLAlchemy(app)