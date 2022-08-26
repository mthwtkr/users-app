from flask import Flask

from config.database import initialize_db
from config.routes import routes

app = Flask(__name__)

initialize_db(app)
routes(app)

if __name__ == '__main__':
	app.run(debug=True)
