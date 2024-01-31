# Remote library imports
from flask import Flask, request, make_response, jsonify, session
from flask_restful import Api, Resource
from sqlalchemy.exc import IntegrityError

# Local imports
from config import app, db, api
