# import necessary libraries
from models import create_classes
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
# from secret import password, username
import pandas as pd
from sqlalchemy import create_engine
import psycopg2
import json
import collections
import sys
#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
#### test irina
engine = create_engine("postgres://ksbyesziginjim:604e43369bb88e70d12bfdff3c853e100e75e5049e4633240a1a6a3f4c01931a@ec2-54-172-173-58.compute-1.amazonaws.com:5432/d5r20gklffimtp")

from flask_sqlalchemy import SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', "postgresql://localhost:5000/hurricanes_db")

# Remove tracking modifications
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

Classes = create_classes(db)

# create route that renders index.html template
@app.route("/jsondata")
def jsondata():
    rows = engine.execute("select name, hurricane_id, year, latitude_decimal, longitude_decimal, max_wind, air_pressure, time from master")
    objects_list = []
    for row in rows:
        d = collections.OrderedDict()
        d['name'] = row[0]
        d['hurricane_id'] = row[1]
        d['year'] = row[2]
        d['latitude'] = str(row[3])
        d['longitude'] = str(row[4])
        d['max_wind'] = row[5]
        d['air_pressure'] = row[6]
        d['time'] = row[7]
        objects_list.append(d)

    j = json.dumps(objects_list)
    objects_file = 'master_objects.js'
    f = open(objects_file,'w')
    return j

# create route that renders index.html template
@app.route("/maxwinds")
def maxwinds():
    rows = engine.execute("select name, max_wind, name_year from maxwinds")
    objects_list = []
    for row in rows:
        d = collections.OrderedDict()
        d['name'] = row[0]
        d['max_wind'] = row[1]
        d['name_year'] = row[2]
        objects_list.append(d)

    j = json.dumps(objects_list)
    objects_file = 'maxwinds.js'
    f = open(objects_file,'w')
    return j

# create route that renders index.html template
@app.route("/cost_by_state")
def cost_by_state():
    rows = engine.execute("select state, total_damage from cost_state")
    objects_list = []
    for row in rows:
        d = collections.OrderedDict()
        d['name'] = row[0]
        d['total_damage'] = row[1]
        objects_list.append(d)
    j = json.dumps(objects_list)
    # objects_file = 'cost_by_state.js'
    # f = open(objects_file,'w')
    return j

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")
  
# create route that renders index.html template
@app.route("/data")
def data():
    rows = engine.execute("select * from master")
    return render_template("data.html", data=rows)


# *** Not sure why the query below doesn't work


# @app.route("/cost_by_hurricane")
# def cost_by_hurricane():
    # rows = engine.execute("select cost.name, maxwinds.max_wind, cost.damage_usd FROM cost INNER JOIN maxwinds ON cost.name = maxwinds.name AND cost.year = maxwinds.year")
    # objects_list = []
    # for row in rows:
    #     d = collections.OrderedDict()
    #     d['name'] = row[0]
    #     d['wind_speed'] = row[1]
    #     d['hurricane_damage_cost'] = row[2]
    #     objects_list.append(d)
    # j = json.dumps(objects_list)
    # objects_file = 'cost_by_state.js'
    # f = open(objects_file,'w')
    # return j

@app.route("/cost_by_hurricane")
def cost_by_hurricane():
    rows = engine.execute('select cost.name, maxwinds.max_wind, cost.damage_usd FROM cost INNER JOIN maxwinds ON cost.name = maxwinds.name AND cost.year = maxwinds.year')
    objects_list = []
    for row in rows:
        d = collections.OrderedDict()
        d['name'] = row[0]
        d['wind_speed'] = row[1]
    #    d['cost_in_billions'] = row[2]
        objects_list.append(d)
    j = json.dumps(objects_list)
    # objects_file = 'cost_by_state.js'
    # f = open(objects_file,'w')
    return j







if __name__ == "__main__":
    app.run()
