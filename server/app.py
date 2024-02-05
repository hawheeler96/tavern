# Remote library imports
from flask import Flask, request, make_response, jsonify, session
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api

# Model imports
from models import User, Character, AbilityScore, Skill, Party, Race


@app.route("/")
def index():
    return ""


class Characters(Resource):
    def get(self):
        characters = [
            character.to_dict(rules=("abilityscores", "skills", "party", "race"))
            for character in Character.query.all()
        ]
        return make_response(characters, 200)

        

api.add_resource(Characters, "/characters")


class CharacterById(Resource):
    def get(self, id):
        character = Character.query.get(id)
        if not character:
            return make_response({"error": "Character not found"}, 404)
        return make_response(
            character.to_dict(rules=("abilityscores", "skills", "party")), 200
        )

api.add_resource(CharacterById, "/characters/<int:id>")




if __name__ == "__main__":
    app.run(port=5555, debug=True)
