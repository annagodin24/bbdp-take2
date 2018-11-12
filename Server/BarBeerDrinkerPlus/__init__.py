from flask import Flask
from flask import jsonify
from flask import make_response
from flask import request
import json

from BarBeerDrinkerPlus import database

app = Flask(__name__)

@app.route('/api/bar', methods=["GET"])
def get_bars():
    return jsonify(database.get_bars())

@app.route("/api/bar/<name>", methods=["GET"])
def find_bar(name):
    try:
        if name is None:
            raise ValueError("Bar is not specified.")
        bar = database.find_bar(name)
        if bar is None:
            return make_response("No bar found with the given name.", 404)
        return jsonify(bar)
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/beers_cheaper_than", methods=["POST"])
def find_beers_cheaper_than():
    body = json.loads(request.data)
    max_price = body['maxPrice']
    return jsonify(database.filter_beers(max_price))

@app.route('/api/menu/<name>', methods=['GET'])
def get_menu(name):
    try:
        if name is None:
            raise ValueError('Bar is not specified.')
        bar = database.find_bar(name)
        if bar is None:
            return make_response("No bar found with the given name.", 404)
        return jsonify(database.get_bar_menu(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/bar-cities", methods=["GET"])
def get_bar_cities():
    try:
        return jsonify(database.get_bar_cities())
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/beer", methods=["GET"])
def get_beers():
    try:
        return jsonify(database.get_beers())
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/beer-manufacturer", methods=["GET"])
def get_beer_manufacturers():
    try:
        return jsonify(database.get_beer_manufacturers(None))
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/beer-manufacturer/<beer>", methods=["GET"])
def get_manufacturers_making(beer):
    try:
        return jsonify(database.get_beer_manufacturers(beer))
    except Exception as e:
        return make_response(str(e), 500)

 #WTF IS UP WITH THIS ONE??????

@app.route("/api/likes", methods=["GET"])
def get_likes():
    try:
        drinker = request.args.get("drinker")
        if drinker is None:
            raise ValueError("Drinker is not specified.")
        return jsonify(database.get_likes(drinker))
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/customer", methods=["GET"])
def get_customers():
    try:
        return jsonify(database.get_customers())
    except Exception as e:
        return make_response(str(e), 500)

@app.route("/api/customer/<name>", methods=["GET"])
def get_customer(name):
    try:
        if name is None:
            raise ValueError("Cutsomer is not specified.")
        return jsonify(database.get_customer_info(name))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/bars-selling/<beer>', methods=['GET'])
def find_bars_selling(beer):
    try:
        if beer is None:
            raise ValueError('Beer not specified')
        return jsonify(database.get_bars_selling(beer))
    except ValueError as e:
        return make_response(str(e), 400)
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/frequents-data', methods=['GET'])
def get_bar_frequent_counts():
    try:
        return jsonify(database.get_bar_frequent_counts())
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/customer-transactions/<name>', methods=['GET'])
def get_customer_transactions(name):
    try:
        if name is None:
            raise ValueError("Cutsomer is not specified.")
        return jsonify(database.get_customer_transactions(name))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/top-beers/<customer>', methods=['GET'])
def get_top_beers_bought(customer):
    try:
        if customer is None:   
            raise ValueError("Customer is not specified.")
        return jsonify(database.get_top_beers_bought(customer))
    except Exception as e:
        return make_response(str(e), 500)

# FOR THE GRAPH FOR 
# bar graph of his/her spending on different dates.
@app.route('/api/total-spending-day/<customer>', methods=['GET'])
def get_total_spending_per_day(customer):
    try:
        if customer is None:   
            raise ValueError("Customer is not specified.")
        return jsonify(database.get_total_spending_per_day(customer))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/total-spending-bar/<customer>', methods=['GET'])
def get_total_spending_per_bar(customer):
    try:
        if customer is None:   
            raise ValueError("Customer is not specified.")
        return jsonify(database.get_total_spending_per_bar(customer))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/top-spenders/<bar>', methods=['GET'])
def get_top_spenders_per_bar(bar):
    try:
        if bar is None:
            raise ValueError("Bar is not specified.")
        return jsonify(database.get_top_spenders_per_bar(bar))
    except Exception as e:
        return make_response(str(e), 500)

@app.route('/api/top-beers-bar/<bar>', methods=['GET'])
def get_top_beers_per_bar(bar):
    try:
        if bar is None:
            raise ValueError("Bar is not specified")
        return jsonify(database.get_top_beers_per_bar(bar))
    except Exception as e:
        return make_response(str(e), 500)