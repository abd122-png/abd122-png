from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
from flask_cors import CORS
import os

# Configuration de Flask
app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://localhost:27017/ventes_db"

# Sécurisation de la clé secrète avec une variable d'environnement
app.secret_key = os.getenv('FLASK_SECRET_KEY', 'default_secret_key')  # Default if not set

# Initialisation de MongoDB et CORS
mongo = PyMongo(app)
CORS(app, origins="http://localhost:3000")  # Allowing only local frontend

# Initialisation de Flask-Login
login_manager = LoginManager(app)

# Classe utilisateur
class User(UserMixin):
    pass

# Fonction de chargement de l'utilisateur pour Flask-Login
@login_manager.user_loader
def load_user(user_id):
    user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
    if user:
        user_obj = User()
        user_obj.id = str(user["_id"])
        return user_obj
    return None

# Route d'enregistrement
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({"error": "Invalid data"}), 400

    # Vérification si l'utilisateur existe déjà
    if mongo.db.users.find_one({"username": data['username']}):
        return jsonify({"error": "Username already exists"}), 400

    hashed_password = generate_password_hash(data['password'])
    mongo.db.users.insert_one({"username": data['username'], "password": hashed_password})
    return jsonify({"message": "Utilisateur créé avec succès"}), 201

# Route de connexion
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = mongo.db.users.find_one({"username": data['username']})
    if user and check_password_hash(user['password'], data['password']):
        user_obj = User()
        user_obj.id = str(user["_id"])
        login_user(user_obj)
        return jsonify({"message": "Connexion réussie"}), 200
    return jsonify({"message": "Nom d'utilisateur ou mot de passe incorrect"}), 401

# Route de déconnexion
@app.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Déconnexion réussie"}), 200

# Ajouter des ventes
@app.route('/api/sales', methods=['POST'])
@login_required
def add_sale():
    data = request.json
    required_fields = ['product', 'category', 'price', 'quantitySold', 'saleDate', 'seller']
    if not all(field in data for field in required_fields):
        return jsonify({"message": "Données manquantes"}), 400

    # Ajouter la vente à la base de données
    mongo.db.sales.insert_one(data)
    return jsonify({"message": "Vente ajoutée avec succès"}), 201

# Obtenir les ventes
@app.route('/api/sales', methods=['GET'])
@login_required
def get_sales():
    sales = list(mongo.db.sales.find())
    for sale in sales:
        sale['_id'] = str(sale['_id'])
    return jsonify(sales), 200

# Statistiques de ventes par mois
@app.route('/api/sales/stats', methods=['GET'])
@login_required
def sales_stats():
    stats = mongo.db.sales.aggregate([
        {
            "$group": {
                "_id": { "$month": "$saleDate" },
                "totalSales": { "$sum": { "$multiply": ["$price", "$quantitySold"] } }
            }
        }
    ])
    return jsonify(list(stats)), 200

# Page de test pour voir si l'utilisateur est connecté
@app.route('/api/test', methods=['GET'])
@login_required
def test_api():
    return jsonify({"message": f"Bienvenue {current_user.id}!"}), 200

# Exécution de l'application
if __name__ == '__main__':
    app.run(debug=True)
