from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

# Initialize the database
db = SQLAlchemy()
migrate = Migrate()

# Define your models here
class Anime(db.Model):
    __tablename__ = 'animes'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    genre = db.Column(db.String(50), nullable=False)
    
    # One-to-Many relationship with Reviews
    reviews = db.relationship('Review', backref='anime', lazy=True)

class Review(db.Model):
    __tablename__ = 'reviews'
    
    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(200), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    
    # Foreign Key
    anime_id = db.Column(db.Integer, db.ForeignKey('animes.id'), nullable=False)

class Studio(db.Model):
    __tablename__ = 'studios'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)

# Function to create the Flask application
def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['CORS_HEADERS'] = 'Content-Type'
    
    # Initialize Extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)  # Enable CORS for all routes

    # Create routes
    @app.route('/anime', methods=['GET'])
    def get_anime():
        animes = Anime.query.all()
        return {'animes': [{ 'id': anime.id, 'title': anime.title, 'genre': anime.genre } for anime in animes]}

    @app.route('/anime', methods=['POST'])
    def add_anime():

        return {"message": "Anime added"}, 201

    @app.route('/anime/<int:id>', methods=['GET'])
    def get_anime_by_id(id):
        anime = Anime.query.get_or_404(id)
        return {
            'id': anime.id,
            'title': anime.title,
            'genre': anime.genre,
            'reviews': [{'comment': review.comment, 'rating': review.rating} for review in anime.reviews]
        }

    return app
