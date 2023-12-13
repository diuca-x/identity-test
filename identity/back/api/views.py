from flask import Blueprint
from flask_restful import Api

from api.resources.routes import SingleQuestion, Token, Login,Signin,CheckToken,CustomFields

blueprint = Blueprint("api", __name__, url_prefix="/api")
api = Api(blueprint, errors=blueprint.errorhandler)

api.add_resource(SingleQuestion, "/question")
api.add_resource(Token, "/test")
api.add_resource(Login,"/login")
api.add_resource(Signin,"/signin")
api.add_resource(CheckToken, "/token")
api.add_resource(CustomFields,"/customuser")
