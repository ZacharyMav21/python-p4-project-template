# models.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from base import Base

class Studio(Base):
    __tablename__ = 'studio'

    id = Column(Integer, primary_key=True)
    name = Column(String)
    animes = relationship("Anime", back_populates="studio")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name
        }

class Anime(Base):
    __tablename__ = 'anime'

    id = Column(Integer, primary_key=True)
    title = Column(String)
    genre = Column(String)
    studio_id = Column(Integer, ForeignKey('studio.id'))
    studio = relationship("Studio", back_populates="animes")
    reviews = relationship("Review", back_populates="anime")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'genre': self.genre,
            'studio_id': self.studio_id,
            'reviews': [review.to_dict() for review in self.reviews]
        }

class Review(Base):
    __tablename__ = 'review'

    id = Column(Integer, primary_key=True)
    comment = Column(String)
    rating = Column(Integer)
    anime_id = Column(Integer, ForeignKey('anime.id'))
    anime = relationship("Anime", back_populates="reviews")

    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'rating': self.rating,
            'anime_id': self.anime_id
        }