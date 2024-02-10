from flask_sqlalchemy import SQLAlchemy
from itsdangerous import Serializer
from sqlalchemy import MetaData, JSON
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.util import b
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
import requests

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    # relationships
    characters = db.relationship("Character", back_populates="user")
    party = association_proxy("characters", "party")

    # auth setup
    @hybrid_property
    def password_hash(self):
        return self._password_hash

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = password_hash.decode("utf-8")

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode("utf-8"))

    def __repr__(self):
        return f"User: {self.name}"


class Character(db.Model, SerializerMixin):
    __tablename__ = "characters"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    name = db.Column(db.String, nullable=False)
    dnd_class = db.Column(JSON, nullable=False)
    subclasses = db.Column(JSON, nullable=True)
    dnd_class_level = db.Column(JSON, nullable=False)
    level = db.Column(db.Integer, nullable=False)
    prof_mod = db.Column(db.Integer, nullable=True)
    hp = db.Column(db.Integer, nullable=False)
    hit_die = db.Column(db.String)
    proficiency_choices = db.Column(JSON, nullable=True)
    proficiencies = db.Column(JSON, nullable=True)
    saving_throws = db.Column(JSON, nullable=True)
    abilityscores_id = db.Column(db.Integer, db.ForeignKey("abilityscores.id"))
    skills_id = db.Column(db.Integer, db.ForeignKey("skills.id"))
    feats = db.Column(db.String)
    description = db.Column(db.String)
    background = db.Column(db.String, nullable=False)
    languages = db.Column(db.String, nullable=False)
    gold = db.Column(db.Integer, nullable=False)
    backstory = db.Column(db.Integer, nullable=True)
    party_id = db.Column(db.Integer, db.ForeignKey("parties.id"))
    race_id = db.Column(db.Integer, db.ForeignKey("races.id"))
    dnd_class_api_url = db.Column(db.String, nullable=False)
    dnd_class_levels_api_url = db.Column(db.String, nullable=False)

    def get_dnd_class_api_url(self):
        class_api_urls = {
            "wizard": "https://www.dnd5eapi.co/api/classes/wizard",
            "fighter": "https://www.dnd5eapi.co/api/classes/fighter",
            "barbarian": "https://www.dnd5eapi.co/api/classes/barbarian",
            "bard": "https://www.dnd5eapi.co/api/classes/bard",
            "cleric": "https://www.dnd5eapi.co/api/classes/cleric",
            "druid": "https://www.dnd5eapi.co/api/classes/druid",
            "monk": "https://www.dnd5eapi.co/api/classes/monk",
            "paladin": "https://www.dnd5eapi.co/api/classes/paladin",
            "rogue": "https://www.dnd5eapi.co/api/classes/rogue",
            "sorcerer": "https://www.dnd5eapi.co/api/classes/sorcerer",
            "warlock": "https://www.dnd5eapi.co/api/classes/warlock",
        }
        if self.dnd_class:
            return class_api_urls.get(self.dnd_class.lower())
        return None

    def fetch_dnd_class_info(self):
        if self.dnd_class_api_url:
            response = requests.get(self.dnd_class_api_url)
            data = response.json()
            self.hit_die = data.get("hit_die")
            self.proficiency_choices = data.get("proficiency_choices")
            self.proficiencies = data.get("proficiencies")
            self.saving_throws = data.get("saving_throws")
            self.subclasses = data.get("subclasses")

    def get_dnd_class_levels_api_url(self):
        class_api_urls = {
            "wizard": "https://www.dnd5eapi.co/api/classes/wizard/levels",
            "fighter": "https://www.dnd5eapi.co/api/classes/fighter/levels",
            "barbarian": "https://www.dnd5eapi.co/api/classes/barbarian/levels",
            "bard": "https://www.dnd5eapi.co/api/classes/bard/levels",
            "cleric": "https://www.dnd5eapi.co/api/classes/cleric/levels",
            "druid": "https://www.dnd5eapi.co/api/classes/druid/levels",
            "monk": "https://www.dnd5eapi.co/api/classes/monk/levels",
            "paladin": "https://www.dnd5eapi.co/api/classes/paladin/levels",
            "rogue": "https://www.dnd5eapi.co/api/classes/rogue/levels",
            "sorcerer": "https://www.dnd5eapi.co/api/classes/sorcerer/levels",
            "warlock": "https://www.dnd5eapi.co/api/classes/warlock/levels",
        }
        return class_api_urls.get(self.dnd_class.lower())

    def get_class_level(self):
        if self.dnd_class_levels_api_url:
            response = requests.get(f"{self.dnd_class_levels_api_url}/{self.level}")
            data = response.json()
            self.dnd_class_level = data.get("level")
   
    def get_prof_mod(self):
        if not self.dnd_class_levels_api_url:
            return None
        if not self.dnd_class_level:
            return None
        response = requests.get(f"{self.dnd_class_levels_api_url}/{self.dnd_class_level.level}")
        data = response.json()
        prof_mod = data.get("prof_mod")
        return prof_mod

    # relationships
    abilityscores = db.relationship("AbilityScore", back_populates="character")
    skills = db.relationship("Skill", back_populates="character")
    user = db.relationship("User", back_populates="characters")
    party = db.relationship("Party", back_populates="character")
    race = db.relationship("Race", back_populates="character")

    # serialization rules
    serialize_rules = ("-abilityscores", "-skills", "-user", "-race", "-party")


class Race(db.Model, SerializerMixin):
    __tablename__ = "races"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    languages = db.Column(JSON, nullable=True)
    ability_bonuses = db.Column(JSON, nullable=True)
    creature_type = db.Column(db.String, nullable=False)
    size = db.Column(db.String, nullable=False)
    speed = db.Column(db.Integer, nullable=False)
    traits = db.Column(JSON, nullable=True)
    starting_proficiencies = db.Column(JSON, nullable=True)
    dnd_race_api_url = db.Column(db.String)

    def get_dnd_class_api_url(self):
        race_api_urls = {
            "dragonborn": "https://www.dnd5eapi.co/api/races/dragonborn",
            "dwarf": "https://www.dnd5eapi.co/api/races/dwarf",
            "elf": "https://www.dnd5eapi.co/api/races/elf",
            "gnome": "https://www.dnd5eapi.co/api/races/gnome",
            "half-elf": "https://www.dnd5eapi.co/api/races/half-elf",
            "half-orc": "https://www.dnd5eapi.co/api/races/half-orc",
            "halfling": "https://www.dnd5eapi.co/api/races/halfling",
            "human": "https://www.dnd5eapi.co/api/races/human",
            "tiefling": "https://www.dnd5eapi.co/api/races/tiefling",
        }
        return race_api_urls.get(self.name.lower())

    def fetch_dnd_race_info(self):
        if self.dnd_race_api_url:
            response = requests.get(self.dnd_race_api_url)
            data = response.json()
            self.speed = data.get("speed")
            self.ability_bonuses = data.get("ability_bonuses")
            self.size = data.get("size")
            self.starting_proficiencies = data.get("starting_proficiencies")
            self.languages = data.get("languages")
            self.traits = data.get("traits")

    # relationships
    character = db.relationship("Character", back_populates="race")

    # serialization rules
    serialize_rules = ("-character",)


class AbilityScore(db.Model, SerializerMixin):
    __tablename__ = "abilityscores"

    id = db.Column(db.Integer, primary_key=True)
    str_score = db.Column(db.Integer, nullable=False)
    str_mod = db.Column(db.Integer)
    dex_score = db.Column(db.Integer, nullable=False)
    dex_mod = db.Column(db.Integer)
    con_score = db.Column(db.Integer, nullable=False)
    con_mod = db.Column(db.Integer)
    int_score = db.Column(db.Integer, nullable=False)
    int_mod = db.Column(db.Integer)
    wis_score = db.Column(db.Integer, nullable=False)
    wis_mod = db.Column(db.Integer)
    cha_score = db.Column(db.Integer, nullable=False)
    cha_mod = db.Column(db.Integer)

    # relationships
    character = db.relationship("Character", back_populates="abilityscores")
    # skills = db.relationship("Skill", back_populates="abilityscores")
    # serialization rules
    serialize_rules = ("-character",)


class Skill(db.Model, SerializerMixin):
    __tablename__ = "skills"

    id = db.Column(db.Integer, primary_key=True)
    acrobatics = db.Column(db.Integer, default=0)
    animal_handling = db.Column(db.Integer, default=0)
    arcana = db.Column(db.Integer, default=0)
    athletics = db.Column(db.Integer, default=0)
    deception = db.Column(db.Integer, default=0)
    history = db.Column(db.Integer, default=0)
    insight = db.Column(db.Integer, default=0)
    intimidation = db.Column(db.Integer, default=0)
    investigation = db.Column(db.Integer, default=0)
    medicine = db.Column(db.Integer, default=0)
    nature = db.Column(db.Integer, default=0)
    perception = db.Column(db.Integer, default=0)
    performance = db.Column(db.Integer, default=0)
    persuasion = db.Column(db.Integer, default=0)
    religion = db.Column(db.Integer, default=0)
    sleight_of_hand = db.Column(db.Integer, default=0)
    stealth = db.Column(db.Integer, default=0)
    survival = db.Column(db.Integer, default=0)

    # relationships
    character = db.relationship("Character", back_populates="skills")
    # abilityscores = db.relationship("AbilityScore", back_populates = "skills")

    # serialization rules
    serialize_rules = ("-character",)


class Party(db.Model, SerializerMixin):
    __tablename__ = "parties"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)

    # relationships
    user = association_proxy("characters", "user")
    character = db.relationship("Character", back_populates="party")

    # serialization rules
    serialize_rules = ("-character",)
