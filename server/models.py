from flask_sqlalchemy import SQLAlchemy
from itsdangerous import Serializer
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.util import b
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt


class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    _password_hash = db.Column(db.String)

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
    race = db.Column(db.String, nullable=False)
    dnd_class = db.Column(db.String, nullable=False)
    dnd_subclass = db.Column(db.String)
    level = db.Column(db.Integer, nullable=False)
    proficiency = db.Column(db.Integer, nullable=False)
    hp = db.Column(db.Integer, nullable=False)
    abilityscores_id = db.Column(db.Integer, db.ForeignKey("abilityscores.id"))
    skills_id = db.Column(db.Integer, db.ForeignKey("skills.id"))
    feats = db.Column(db.String)
    description = db.Column(db.String)
    background = db.Column(db.String, nullable=False)
    languages = db.Column(db.String, nullable=False)
    gold = db.Column(db.Integer, nullable=False)
    party_id = db.Column(db.Integer, db.ForeignKey("parties.id"))

    # relationships
    abilityscores = db.relationship("AbilityScore", back_populates="character")
    skills = db.relationship("Skill", back_populates="character")
    user = db.relationship("User", back_populates="characters")
    party = db.relationship("Party", back_populates="character")

    # serialization rules
    serialize_rules = ("-abilityscores", "-skills", "-user")


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

    # serialization rules
    serialize_rules = ("-character",)


class Skill(db.Model, SerializerMixin):
    __tablename__ = "skills"

    id = db.Column(db.Integer, primary_key=True)
    athletics = db.Column(db.Integer, nullable=False)
    acrobatics = db.Column(db.Integer, nullable=False)
    sleight_of_hand = db.Column(db.Integer, nullable=False)
    stealth = db.Column(db.Integer, nullable=False)
    arcana = db.Column(db.Integer, nullable=False)
    investigation = db.Column(db.Integer, nullable=False)
    nature = db.Column(db.Integer, nullable=False)
    religion = db.Column(db.Integer, nullable=False)
    animal_handling = db.Column(db.Integer, nullable=False)
    insight = db.Column(db.Integer, nullable=False)
    medicine = db.Column(db.Integer, nullable=False)
    perception = db.Column(db.Integer, nullable=False)
    survival = db.Column(db.Integer, nullable=False)
    deception = db.Column(db.Integer, nullable=False)
    intimidation = db.Column(db.Integer, nullable=False)
    performance = db.Column(db.Integer, nullable=False)
    persuasion = db.Column(db.Integer, nullable=False)

    # relationships
    character = db.relationship("Character", back_populates="skills")

    # serialization rules
    serialize_rules = ("-character",)


class Party(db.Model, SerializerMixin):
    __tablename__ = "parties"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    description = db.Column(db.String)

    # relationships
    user = association_proxy("characters", "user")
