
from flask import Flask, jsonify
import os
from api.views import blueprint
#--- env
from dotenv import load_dotenv
#--- database
from extensions import db
from extensions import migrate
from extensions import cors

import firebase_admin
from firebase_admin import credentials,auth
from firebase_admin import exceptions


load_dotenv()

cred = credentials.Certificate(os.environ.get("GOOGLE_APPLICATION_CREDENTIALS"))

options ={
    "serviceAccountId" : "token-899@ordinal-verbena-407812.iam.gserviceaccount.com"
}
default_app = firebase_admin.initialize_app(options=options)

app = Flask(__name__)
app.register_blueprint(blueprint=blueprint)
app.config.from_object("config")


db.init_app(app)
migrate.init_app(app,db)
cors.init_app(app, resources={r"/api/*"}, origins="*",methods=["POST","GET"])
#debug = os.environ.get("FLASK_DEBUG", False)

if __name__ == "__main__":
    app.run(host=os.environ.get("FLASK_RUN_HOST", "0.0.0.0"), 
            port=os.environ.get("FLASK_RUN_PORT", 8000), 
            debug=True)
    
