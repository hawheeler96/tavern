# Remote library imports
from sqlite3 import paramstyle
from tempfile import TemporaryFile
from flask import Flask, request, make_response, jsonify, session, render_template
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError
import ipdb

# Local imports
from config import app, db, api

# Model imports
from models import User, Character, AbilityScore, Party, Race


@app.route("/api/signup", methods=("POST",))
def signup():
    data = request.get_json()
    email = data.get("email")
    name = data.get("name")
    password = data.get("password")

    user = User(email=email, name=name)
    user.password_hash = password

    try:
        db.session.add(user)
        db.session.commit()

        session["user_id"] = user.id

        return make_response(user.to_dict(), 201)

    except ValueError as e:
        return make_response({"error": e.__str__()}, 400)
    except IntegrityError:
        return make_response({"error": "Database constraint error"}, 400)


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter(User.email == email).first()

    if user:
        if user.authenticate(password):
            session["user_id"] = user.id
            return make_response(user.to_dict(), 200)
        else:
            return {"error": "Incorrect username or password"}, 401
    else:
        return {"error": "User not found"}, 401


@app.route("/api/check_session")
def check_session():
    user = User.query.get(session.get("user_id"))
    if user:
        return make_response(user.to_dict(), 200)
    else:
        return make_response({}, 401)


@app.route("/api/logout", methods=("DELETE",))
def logout():
    session.clear()
    return make_response({}, 204)


class Characters(Resource):
    def get(self):
        characters = [
            character.to_dict(rules=("abilityscores", "race"))
            for character in Character.query.all()
        ]
        return make_response(characters, 200)

    def post(self):
        character = Character()
        abscores = AbilityScore()
        # skills = Skill()
        race = Race()
        data = request.get_json()
        try:
            character.user_id = data.get("user_id")
            character.name = data.get("character_name")
            character.dnd_class = data.get("dnd_class")
            character.subclasses = data.get("subclasses")
            character.dnd_class_level = data.get("dnd_class_level")
            character.hp = data.get("hp")
            character.level = data.get("level")
            # character.prof_mod = data.get("prof_mod")
            character.proficienciesArr = data.get("proficienciesArr")
            # character.skills_id = data.get("skills_id")
            character.feats = data.get("feats")
            character.description = data.get("description")
            character.background = data.get("background")
            character.languages = data.get("languages")
            character.gold = data.get("gold")
            character.backstory = data.get("backstory")
            character.party_id = data.get("party_id")
            character.dnd_class_api_url = character.get_dnd_class_api_url()
            character.dnd_class_levels_api_url = (
                character.get_dnd_class_levels_api_url()
            )
            abscores.str_score = data.get("str_score")
            # abscores.str_mod = data.get("str_mod")
            abscores.dex_score = data.get("dex_score")
            # abscores.dex_mod = data.get("dex_mod")
            abscores.con_score = data.get("con_score")
            # abscores.con_mod = data.get("con_mod")
            abscores.int_score = data.get("int_score")
            # abscores.int_mod = data.get("int_mod")
            abscores.wis_score = data.get("wis_score")
            # abscores.wis_mod = data.get("wis_mod")
            abscores.cha_score = data.get("cha_score")
            # abscores.cha_mod = data.get("cha_mod")
            # skills.acrobatics = data.get("acrobatics")
            # skills.animal_handling = data.get("animal_handling")
            # skills.arcana = data.get("arcana")
            # skills.athletics = data.get("athletics")
            # skills.deception = data.get("deception")
            # skills.history = data.get("history")
            # skills.insight = data.get("insight")
            # skills.intimidation = data.get("intimidation")
            # skills.investigation = data.get("investigation")
            # skills.medicine = data.get("medicine")
            # skills.nature = data.get("nature")
            # skills.perception = data.get("perception")
            # skills.performance = data.get("performance")
            # skills.persuasion = data.get("persuasion")
            # skills.religion = data.get("religion")
            # skills.sleight_of_hand = data.get("sleight_of_hand")
            # skills.stealth = data.get("stealth")
            # skills.survival = data.get("survival")
            race.name = data.get("race_name")
            race.creature_type = data.get("creature_type")
            race.dnd_race_api_url = race.get_dnd_class_api_url()

            # fetch & populate data from the public api
            character.fetch_dnd_class_info()
            character.get_class_level()
            race.fetch_dnd_race_info()

            db.session.add(abscores)
            db.session.commit()
            latest_abscores_id = (
                AbilityScore.query.order_by(AbilityScore.id.desc()).first().id
            )
            character.abilityscores_id = latest_abscores_id

            # db.session.add(skills)
            # db.session.commit()
            # latest_skills_id = Skill.query.order_by(Skill.id.desc()).first().id
            # character.skills_id = latest_skills_id

            db.session.add(race)
            db.session.commit()
            latest_race_id = Race.query.order_by(Race.id.desc()).first().id
            character.race_id = latest_race_id

            db.session.add(character)
            db.session.commit()

            response_data = {
                "character": character.to_dict(),
                "abscores": abscores.to_dict(),
                # "skills": skills.to_dict(),
                "race": race.to_dict(),
            }

            return make_response(response_data, 201)
        except ValueError:
            return make_response({"errors": "unable to POST"}, 400)


api.add_resource(Characters, "/api/characters")


class CharacterById(Resource):
    def get(self, id):
        character = Character.query.get(id)
        if not character:
            return make_response({"error": "Character not found"}, 404)
        return make_response(
            character.to_dict(rules=("abilityscores", "race")), 200
        )

    def patch(self, id):
        character = Character.query.get(id)
        # abscore_id = character.abilityscores_id
        # abscores = AbilityScore.query.get(abscore_id)
        # skills_id = character.skills_id
        # skills = Skill.query.get(skills_id)

        if not character:
            return make_response({"error": "Character not found"}, 404)
        # elif not abscores:
        #     return make_response({"error": "Ability scores not found"}, 404)
        # elif not skills:
        #     return make_response({"error": "Skills not found"}, 404)
        data = request.get_json()
        try:
            for attr in data:
                setattr(character, attr, data[attr])
                db.session.add(character)
                db.session.commit()

                # setattr(abscores, attr, data[attr])
                # db.session.add(abscores)
                # db.session.commit()

                # setattr(skills, attr, data[attr])
                # db.session.add(skills)
                # db.session.commit()

                # Fetch D&D class info and update character
                character.fetch_dnd_class_info()

                # Update class level
                character.get_class_level()

            response_data = {
                "character": character.to_dict(),
                # "abscores": abscores.to_dict(),
                # "skills": skills.to_dict(),
            }
            return make_response(response_data, 200)
        except ValueError:
            return make_response({"error": "unable to PATCH"}, 400)

    def delete(self, id):
        character = Character.query.get(id)
        if not character:
            return make_response({"error": "Character not found"}, 404)

        db.session.delete(character)
        db.session.commit()
        return make_response({}, 204)


api.add_resource(CharacterById, "/api/characters/<int:id>")


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


api.add_resource(AbilityScores, "/api/ability-scores")


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


api.add_resource(AbilityScoresById, "/api/ability-scores/<int:id>")


# class Skills(Resource):
#     def post(self):
#         skills = Skill()
#         data = request.get_json()
#         try:
#             skills.acrobatics = data.get("acrobatics")
#             skills.animal_handling = data.get("animal_handling")
#             skills.arcana = data.get("arcana")
#             skills.athletics = data.get("athletics")
#             skills.deception = data.get("deception")
#             skills.history = data.get("history")
#             skills.insight = data.get("insight")
#             skills.intimidation = data.get("intimidation")
#             skills.investigation = data.get("investigation")
#             skills.medicine = data.get("medicine")
#             skills.nature = data.get("nature")
#             skills.perception = data.get("perception")
#             skills.performance = data.get("performance")
#             skills.persuasion = data.get("persuasion")
#             skills.religion = data.get("religion")
#             skills.sleight_of_hand = data.get("sleight_of_hand")
#             skills.stealth = data.get("stealth")
#             skills.survival = data.get("survival")

#             db.session.add(skills)
#             db.session.commit()
#             return make_response(skills.to_dict(), 201)

#         except ValueError:
#             return make_response({"errors": "unable to POST"}, 400)


# api.add_resource(Skills, "/api/skills")


# class SkillsById(Resource):
#     def get(self, id):
#         skills = Skill.query.get(id)
#         if not skills:
#             return make_response({"error": "Skills set not found"}, 404)

#         return make_response(skills.to_dict(), 200)

#     def patch(self, id):
#         skills = Skill.query.get(id)
#         if not skills:
#             return make_response({"error": "Skills set not found"}, 404)
#         data = request.get_json()
#         try:
#             for attr in data:
#                 setattr(skills, attr, data[attr])
#                 db.session.add(skills)
#                 db.session.commit()
#                 return make_response(skills.to_dict(), 202)
#         except ValueError:
#             return make_response({"error": "unable to PATCH"}, 400)


# api.add_resource(SkillsById, "/api/skills/<int:id>")


class Races(Resource):
    def get(self):
        races = [race.to_dict() for race in Race.query.all()]
        return make_response(races, 200)

    def post(self):
        race = Race()
        data = request.get_json()
        try:
            race.name = data.get("race_name")
            race.creature_type = data.get("creature_type")
            race.dnd_race_api_url = race.get_dnd_class_api_url()

            # fetch & populate data from the public api
            race.fetch_dnd_race_info()

            db.session.add(race)
            db.session.commit()

            return make_response(race.to_dict(), 201)

        except ValueError:
            return make_response({"error": "unable to POST"}, 400)


api.add_resource(Races, "/api/races")


class RacesById(Resource):
    def get(self, id):
        race = Race.query.get(id)
        if not race:
            return make_response({"error": "Race not found"}, 404)

        return make_response(race.to_dict(), 200)


api.add_resource(RacesById, "/api/races/<int:id>")


class Parties(Resource):
    def get(self):
        party = [party.to_dict() for party in Party.query.all()]
        return make_response(party, 200)

    def post(self):
        party = Party()
        data = request.get_json()

        try:
            party.name = data.get("name")
            party.description = data.get("description")

            db.session.add(party)
            db.session.commit()

            return make_response(party.to_dict(), 201)

        except ValueError:
            return make_response({"error": "unable to POST"}, 400)


api.add_resource(Parties, "/api/parties")


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
            return make_response(party.to_dict(), 202)
        except ValueError:
            return make_response({"error": "unable to PATCH"}, 400)

    def delete(self, id):
        party = Party.query.get(id)
        if not party:
            return make_response({"error": "Party not found"}, 404)

        db.session.delete(party)
        db.session.commit()

        return make_response({}, 204)


api.add_resource(PartyById, "/api/parties/<int:id>")

class UserById(Resource):
    def patch(self, id):
        user = User.query.get(id)
        if not user:
            return make_response({"error": "User not found"}, 404)
        data = request.get_json()
        try: 
            for attr in data:
                setattr(user, attr, data[attr])
            db.session.add(user)
            return make_response(user.to_dict(), 202)
        except ValueError:
            return make_response({"error:" "Unable to PATCH"}, 400)
        
api.add_resource(UserById, "/api/users/<int:id>")
                


@app.route("/")
def index():
    return render_template("index.html")


@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")


if __name__ == "__main__":
    app.run(port=5555, debug=True)
