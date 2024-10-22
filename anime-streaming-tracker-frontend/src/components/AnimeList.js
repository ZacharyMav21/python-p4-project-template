import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AnimeList() {
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/anime')
      .then(response => response.json())
      .then(data => setAnimes(data));
  }, []);

  return (
    <div>
      <h1>Anime List</h1>
      <ul>
        {animes.map(anime => (
          <li key={anime.id}>
            <Link to={`/anime/${anime.id}`}>{anime.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnimeList;
