# Remote library imports
from sqlite3 import paramstyle
from tempfile import TemporaryFile
from flask import Flask, request, make_response, jsonify, session
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError
import ipdb

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

    def post(self):
        character = Character()
        data = request.get_json()
        try:
            character.user_id = data.get("user_id")
            character.name = data.get("name")
            character.dnd_class = data.get("dnd_class")
            character.subclasses = data.get("subclasses")
            character.dnd_class_level = data.get("dnd_class_level")
            character.total_level = data.get("total_level")
            character.proficiency_mod = data.get("proficiency_mod")
            character.hp = data.get("hp")
            character.abilityscores_id = data.get("abilityscores_id")
            character.skills_id = data.get("skills_id")
            character.feats = data.get("feats")
            character.description = data.get("description")
            character.background = data.get("background")
            character.languages = data.get("languages")
            character.gold = data.get("gold")
            character.party_id = data.get("party_id")
            character.race_id = data.get("race_id")
            character.dnd_class_api_url = character.get_dnd_class_api_url()
            character.dnd_class_levels_api_url = (
                character.get_dnd_class_levels_api_url()
            )

            # fetch & populate data from the public api
            character.fetch_dnd_class_info()

            db.session.add(character)
            db.session.commit()
            return make_response(character.to_dict(), 201)
        except ValueError:
            return make_response({"errors": "unable to POST"}, 400)


api.add_resource(Characters, "/characters")


class CharacterById(Resource):
    def get(self, id):
        character = Character.query.get(id)
        if not character:
            return make_response({"error": "Character not found"}, 404)
        return make_response(
            character.to_dict(rules=("abilityscores", "skills", "party")), 200
        )

    def patch(self, id):
        character = Character.query.get(id)
        if not character:
            return make_response({"error": "Character not found"}, 404)
        data = request.get_json()
        try:
            for attr in data:
                setattr(character, attr, data[attr])
                db.session.add(character)
                db.session.commit()
                return make_response(character.to_dict(), 200)
        except ValueError:
            return make_response({"error": "unable to PATCH"}, 400)

    def delete(self, id):
        character = Character.query.get(id)
        if not character:
            return make_response({"error": "Character not found"}, 404)

        db.session.delete(character)
        db.session.commit()
        return make_response({}, 204)


api.add_resource(CharacterById, "/characters/<int:id>")


class AbilityScores(Resource):
    def post(self):
        abscores = AbilityScore()
        data = request.get_json()
        try:
            abscores.str_score = data.get("str_score")
            abscores.str_mod = data.get("str_mod")
            abscores.dex_score = data.get("dex_score")
            abscores.dex_mod = data.get("dex_mod")
            abscores.con_score = data.get("con_score")
            abscores.con_mod = data.get("con_mod")
            abscores.int_score = data.get("int_score")
            abscores.int_mod = data.get("int_mod")
            abscores.wis_score = data.get("wis_score")
            abscores.wis_mod = data.get("wis_mod")
            abscores.cha_score = data.get("cha_score")
            abscores.cha_mod = data.get("cha_mod")

            db.session.add(abscores)
            db.session.commit()
            return make_response(abscores.to_dict(), 201)

        except ValueError:
            return make_response({"errors": "unable to POST"}, 400)


api.add_resource(AbilityScores, "/ability-scores")


class AbilityScoresById(Resource):
    def get(self, id):
        abscores = AbilityScore.query.get(id)
        if not abscores:
            return make_response({"error": "Ability Score set not found"}, 404)

        return make_response(abscores.to_dict(), 200)

    def patch(self, id):
        abscores = AbilityScore.query.get(id)
        if not abscores:
            return make_response({"error": "Ability Score set not found"}, 404)
        data = request.get_json()
        try:
            for attr in data:
                setattr(abscores, attr, data[attr])
                db.session.add(abscores)
                db.session.commit()
                return make_response(abscores.to_dict(), 202)
        except ValueError:
            return make_response({"error": "unable to PATCH"}, 400)


api.add_resource(AbilityScoresById, "/ability-scores/<int:id>")


class Skills(Resource):
    def post(self):
        skills = Skill()
        data = request.get_json()
        try:
            skills.acrobatics = data.get("acrobatics")
            skills.animal_handling = data.get("animal_handling")
            skills.arcana = data.get("arcana")
            skills.athletics = data.get("athletics")
            skills.deception = data.get("deception")
            skills.history = data.get("history")
            skills.insight = data.get("insight")
            skills.intimidation = data.get("intimidation")
            skills.investigation = data.get("investigation")
            skills.medicine = data.get("medicine")
            skills.nature = data.get("nature")
            skills.perception = data.get("perception")
            skills.performance = data.get("performance")
            skills.persuasion = data.get("persuasion")
            skills.religion = data.get("religion")
            skills.sleight_of_hand = data.get("sleight_of_hand")
            skills.stealth = data.get("stealth")
            skills.survival = data.get("survival")

            db.session.add(skills)
            db.session.commit()
            return make_response(skills.to_dict(), 201)

        except ValueError:
            return make_response({"errors": "unable to POST"}, 400)


api.add_resource(Skills, "/skills")


class SkillsById(Resource):
    def get(self, id):
        skills = Skill.query.get(id)
        if not skills:
            return make_response({"error": "Skills set not found"}, 404)

        return make_response(skills.to_dict(), 200)

    def patch(self, id):
        skills = Skill.query.get(id)
        if not skills:
            return make_response({"error": "Skills set not found"}, 404)
        data = request.get_json()
        try:
            for attr in data:
                setattr(skills, attr, data[attr])
                db.session.add(skills)
                db.session.commit()
                return make_response(skills.to_dict(), 202)
        except ValueError:
            return make_response({"error": "unable to PATCH"}, 400)


api.add_resource(SkillsById, "/skills/<int:id>")


class Races(Resource):
    def get(self):
        races = [race.to_dict() for race in Race.query.all()]
        return make_response(races, 200)

    def post(self):
        race = Race()
        data = request.get_json()
        try:
            race.name = data.get("name")
            race.creature_type = data.get("creature_type")
            race.dnd_race_api_url = race.get_dnd_class_api_url()

            # fetch & populate data from the public api
            race.fetch_dnd_race_info()

            db.session.add(race)
            db.session.commit()

            return make_response(race.to_dict(), 201)

        except ValueError:
            return make_response({"error": "unable to POST"}, 400)


api.add_resource(Races, "/races")


class RacesById(Resource):
    def get(self, id):
        race = Race.query.get(id)
        if not race:
            return make_response({"error": "Race not found"}, 404)

        return make_response(race.to_dict(), 200)


api.add_resource(RacesById, "/races/<int:id>")


class Parties(Resource):
    def get(self):
        party = [party.to_dict() for party in Party.query.all()]
        return make_response(party, 200)


api.add_resource(Parties, "/parties")


class PartyById(Resource):
    def get(self, id):
        party = Party.query.get(id)
        if not party:
            return make_response({"error": "Party not found"}, 404)

        return make_response(party.to_dict(rules=("character",)), 200)

    def patch(self, id):
        party = Party.query.get(id)
        if not party:
            return make_response({"error": "Party not found"}, 404)
        data = request.get_json()
        try:
            for attr in data:
                setattr(party, attr, data[attr])
                db.session.add(party)
                db.session.commit()
            return make_response(party, 202)
        except ValueError:
            return make_response({"error": "unable to PATCH"}, 400)

    def delete(self, id):
        party = Party.query.get(id)
        if not party:
            return make_response({"error": "Party not found"}, 404)

        db.session.delete(party)
        db.session.commit()
        
        return make_response({}, 204)

api.add_resource(PartyById, "/parties/<int:id>")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
