from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from bson import ObjectId
from flask_cors import CORS


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/sales_db"  # MongoDB connection
mongo = PyMongo(app)
# Enable CORS for your app
CORS(app, origins="http://localhost:3000")  # This allows your React app to connect to Flask

# Route to get sales data
@app.route('/api/sales', methods=['GET'])
def get_sales():
    sales = list(mongo.db.sales.find())
    # Convert ObjectId to string
    for sale in sales:
        sale['_id'] = str(sale['_id'])
    return jsonify(sales)

# Route to add sales data
@app.route('/api/sales', methods=['POST'])

def add_sale():
    data = request.json

    # Check if required fields are in the request
    required_fields = ['product', 'category', 'price', 'quantitySold', 'saleDate', 'seller']
    if not all(field in data for field in required_fields):
        return jsonify({"message": "Données manquantes"}), 400
    
    # Insert the sale data into MongoDB
    mongo.db.sales.insert_one(data)

    # Return success message
    return jsonify({"message": "Vente ajoutée avec succès"}), 201

if __name__ == '__main__':
    app.run(debug=True)
