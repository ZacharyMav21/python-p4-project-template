# routes.py
from flask import Flask, request, jsonify
from models import Anime, Review, db

app = Flask(__name__)

@app.route('/anime', methods=['GET', 'POST'])
def handle_anime():
    if request.method == 'GET':
        animes = Anime.query.all()
        return jsonify([anime.to_dict() for anime in animes])
    
    if request.method == 'POST':
        data = request.json
        new_anime = Anime(title=data['title'], genre=data['genre'], studio_id=data['studio_id'])
        db.session.add(new_anime)
        db.session.commit()
        return jsonify(new_anime.to_dict()), 201

@app.route('/anime/<int:id>', methods=['GET'])
def get_anime(id):
    anime = Anime.query.get(id)
    return jsonify(anime.to_dict())

@app.route('/anime/<int:id>/reviews', methods=['GET', 'POST'])
def handle_reviews(id):
    if request.method == 'GET':
        anime = Anime.query.get(id)
        return jsonify([review.to_dict() for review in anime.reviews])

    if request.method == 'POST':
        data = request.json
        new_review = Review(comment=data['comment'], rating=data['rating'], anime_id=id)
        db.session.add(new_review)
        db.session.commit()
        return jsonify(new_review.to_dict()), 201
