# import necessary libraries
from flask_sqlalchemy import SQLAlchemy
from flask import (
    Flask,
    render_template,
    request,
    redirect,
    url_for)
import pandas as pd
from sqlalchemy import create_engine
import psycopg2
import collections
import json

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
engine = create_engine("postgres://ksbyesziginjim:604e43369bb88e70d12bfdff3c853e100e75e5049e4633240a1a6a3f4c01931a@ec2-54-172-173-58.compute-1.amazonaws.com:5432/d5r20gklffimtp")

# create route that renders index.html template
@app.route("/cost_by_state")
def cost_by_state():
    rows = engine.execute("select state, total_damage from cost_state")
    costbystate_list = []
    for row in rows:
        costbystate = collections.OrderedDict()
        costbystate['name'] = row[0]
        costbystate['total_damage'] = row[1]
        costbystate_list.append(costbystate)
    costbystate_js = json.dumps(costbystate_list)
    return costbystate_js

# create route that renders index.html template
@app.route("/")
def main_page():
    cost = cost_by_state()
    # print(cost)
    return render_template("index.html", costbystate=cost)

# create route that renders index.html template
@app.route("/data", methods=["GET", "POST"])
def data():
    rows = engine.execute("select * from master")
    return render_template("data.html", data=rows)

# create route for top 50 costliest hurricanes
@app.route("/top10")
def top10():
    rows = engine.execute("select name, hurricane_id, year, latitude, longitude, max_wind, air_pressure, status, norm_damage_usd, damage_usd, time, lat_lon, name_year, date from top10")
    top10_list = []
    for row in rows:
        top10col = collections.OrderedDict()
        top10col['name'] = row[0]
        top10col['hurricane_id'] = row[1]
        top10col['year'] = row[2]
        top10col['latitude'] = str(row[3])
        top10col['longitude'] = str(row[4])
        top10col['max_wind'] = row[5]
        top10col['air_pressure'] = row[6]
        top10col['status'] = row[7]
        top10col['norm_damage_usd'] = row[8]
        top10col['damage_usd'] = row[9]
        top10col['time'] = row[10]
        top10col['lat_lon'] = row[11]
        top10col['name_year'] = row[12]
        top10col['date'] = row[13]
        top10_list.append(top10col)

    top10_js = json.dumps(top10_list)
    return top10_js

# create route for fatalities data
@app.route("/fatver2")
def fatver2():
    rows = engine.execute("select hurricane_id, name, deaths, year from fatver2")
    fatalities_list = []
    for row in rows:
        fat = collections.OrderedDict()
        fat['hurricane_id'] = row[0]
        fat['name'] = row[1]
        fat['deaths'] = row[2]
        fat['year'] = row[3]
        fatalities_list.append(fat)
    fat_js = json.dumps(fatalities_list)
    return fat_js



if __name__ == "__main__":
    app.run(threaded=True)
