from flask import Flask, jsonify, request
from decouple import config

from models import db, connect_db, Cupcake



app = Flask(__name__)

app.config['SECRET_KEY'] = config('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = config('SQLALCHEMY_DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

connect_db(app)
db.create_all()


@app.route('/api/cupcakes')
def get_cupcakes():
    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=cupcakes)


@app.route('/api/cupcakes/<cupcake_id>')
def get_single_cupcake(cupcake_id):
    cupcake = Cupcake.query.get_or_404(cupcake_id).serialize()
    return jsonify(cupcake=cupcake)


@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake():
    info = request.json
    cupcake = Cupcake(flavor=info['flavor'], size=info['size'], rating=info['rating'])
    db.session.add(cupcake)
    db.session.commit()
    return jsonify(cupcake=cupcake.serialize()), 201