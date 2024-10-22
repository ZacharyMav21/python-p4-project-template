import React, { useEffect, useState } from 'react';
import ReviewForm from '../components/ReviewForm';
import AnimeList from '../components/AnimeList';
const AnimeDetails = () => {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const animeId = /* Get this from URL params or props, e.g., using useParams from react-router-dom */

  useEffect(() => {
    
    fetch(`http://localhost:3000/anime/${animeId}`)
      .then(response => response.json())
      .then(data => {
        setAnime(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching anime:', error);
        setLoading(false);
      });
  }, );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{anime.title}</h1>
      <p>{anime.description}</p>
      <h2>Reviews:</h2>
      <AnimeList animeId={animeId} /> {/* Use AnimeList to display reviews */}
      <ReviewForm animeId={animeId} /> {/* Pass animeId to ReviewForm */}
    </div>
  );
};

export default AnimeDetails;