from flask import jsonify, request, make_response
from flask_restful import Resource, abort
import requests

#---import models
from models.tables import Question

#--- import db
from extensions import db

import uuid
from firebase_admin import auth



class SingleQuestion(Resource): #to get all questions, or create a new one
    def get(self):
        all = Question.query.all()
        
        alldic = []
        for i in all:
            question_dic = i.serialize()
            alldic.append(question_dic)
        return make_response(jsonify({"msg" : "need to have at least 3 options"}),400)
        return jsonify(alldic)
    

    
class Token(Resource):
    def post(self):
        data = request.json
        
        user = auth.get_user_by_email(data.get("email"))
        

        custom_token = auth.create_custom_token(user.uid)
        print(custom_token)
        return make_response(jsonify({"token" : custom_token.decode('utf-8')}),200)

        